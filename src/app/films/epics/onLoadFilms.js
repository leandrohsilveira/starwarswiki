import { ofType } from 'redux-observable';
import { withLatestFrom, map } from 'rxjs/operators';
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

function onLoadFilms(actions$, state$) {
  return actions$.pipe(
    ofType(filmsActionsTypes.LOAD),
    selectLatestFrom(state$, filmsSelector),
    map(([{ pageable }, state]) => {
      let { count } = state;
      if (count === null) {
        const countStr = window.localStorage.getItem('films#count');
        if (countStr !== null) count = +countStr;
      }
      if (count >= 0) {
        const filmsKey = `films#${pageable.page}#${pageable.limit}#${count}`;
        let films = state.films[filmsKey];
        if (!films) {
          const filmsStr = window.localStorage.getItem(filmsKey);
          if (filmsKey) {
            films = JSON.parse(filmsStr);
          }
        }
        if (films) {
          return filmsLoaded({ films, count }, pageable);
        }
      }
      return submitTask({
        id: `fetchFilms#${pageable.page}#${pageable.limit}`,
        name: `Fetching ${pageable.limit} films of page ${pageable.page}`,
        effect: fetchFilmsPage(pageable)
      });
    })
  );
}

export default onLoadFilms;
