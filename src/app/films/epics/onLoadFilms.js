import { combineEpics, ofType } from 'redux-observable';
import { withLatestFrom, map, filter } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { submitTask } from 'app/tasks/actions';
import { filmsSelector } from '../reducer';
import filmsActionsTypes, { filmsLoaded, fetchFilmsPage } from '../actions';

function select(selector, ...args) {
  return pipe(map(state => selector(state, args)));
}

function selectLatestFrom(state$, selector, ...args) {
  return pipe(withLatestFrom(state$.pipe(select(selector, args))));
}

function getFilmsId({ page, limit }) {
  return `films#${page}#${limit}`;
}

function onLoadFilmsFromLocalStorage(actions$, state$) {
  return actions$.pipe(
    ofType(filmsActionsTypes.LOAD),
    selectLatestFrom(state$, filmsSelector),
    filter(([{ pageable }, state]) => !state.films[getFilmsId(pageable)]),
    map(([{ pageable }]) => [pageable, window.localStorage.getItem(getFilmsId(pageable))]),
    filter(([, films]) => !!films),
    map(([pageable, films]) => [pageable, JSON.parse(films)]),
    map(([pageable, films]) => filmsLoaded(films, pageable)),
  );
}

function onLoadFilmsFromMap(actions$, state$) {
  return actions$.pipe(
    ofType(filmsActionsTypes.LOAD),
    selectLatestFrom(state$, filmsSelector),
    map(([{ pageable }, state]) => [pageable, state.films[getFilmsId(pageable)]]),
    filter(([, films]) => !!films),
    map(([pageable, films]) => filmsLoaded(films, pageable)),
  );
}

function onLoadFilmsFetchNeeded(actions$, state$) {
  return actions$.pipe(
    ofType(filmsActionsTypes.LOAD),
    selectLatestFrom(state$, filmsSelector),
    filter(([{ pageable }, state]) => !state.films[getFilmsId(pageable)]),
    filter(([{ pageable }]) => !window.localStorage.getItem(getFilmsId(pageable))),
    map(([{ pageable }]) => submitTask({
      id: `fetchFilms#${pageable.page}#${pageable.limit}`,
      name: `Fetching ${pageable.limit} films of page ${pageable.page}`,
      effect: fetchFilmsPage(pageable),
    })),
  );
}

const onLoadFilms = combineEpics(
  onLoadFilmsFromLocalStorage,
  onLoadFilmsFromMap,
  onLoadFilmsFetchNeeded,
);

export default onLoadFilms;
