import { ofType } from 'redux-observable';
import { withLatestFrom, map, partition } from 'rxjs/operators';
import { pipe, merge } from 'rxjs';
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

function onLoadFilms(actions$, state$) {
  // filter action type
  const ofType$ = actions$.pipe(ofType(filmsActionsTypes.LOAD));

  const [memory$, elseLocalStorage$] = ofType$.pipe(
    selectLatestFrom(state$, filmsSelector),
    partition(([{ pageable }, state]) => !!state.films[getFilmsId(pageable)]),
  );

  const [localStorage$, fetch$] = elseLocalStorage$.pipe(
    partition(([{ pageable }]) => !!window.localStorage.getItem(getFilmsId(pageable))),
  );

  return merge(
    memory$.pipe(
      map(([{ pageable }, state]) => [pageable, state.films[getFilmsId(pageable)]]),
      map(([pageable, films]) => filmsLoaded(films, pageable)),
    ),
    localStorage$.pipe(
      map(([{ pageable }]) => [pageable, window.localStorage.getItem(getFilmsId(pageable))]),
      map(([pageable, films]) => [pageable, JSON.parse(films)]),
      map(([pageable, films]) => filmsLoaded(films, pageable)),
    ),
    fetch$.pipe(
      map(([{ pageable }]) => submitTask({
        id: `fetchFilms#${pageable.page}#${pageable.limit}`,
        name: `Fetching ${pageable.limit} films of page ${pageable.page}`,
        effect: fetchFilmsPage(pageable),
      })),
    ),
  );
}

export default onLoadFilms;
