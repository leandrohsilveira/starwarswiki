import { ofType } from 'redux-observable';
import { tap, map, partition } from 'rxjs/operators';
import { merge } from 'rxjs';
import { completeTask } from 'app/tasks/actions';
import filmsActionsTypes, { filmsLoaded } from '../actions';

function onFilmsPageFetched(actions$) {
  const ofType$ = actions$.pipe(
    ofType(filmsActionsTypes.PAGE_FETCHED),
    tap(({ films, count, pageable }) => {
      const stringify = JSON.stringify(films);
      const key = `films#${pageable.page}#${pageable.limit}#${count}`;
      window.localStorage.setItem(key, stringify);
      window.localStorage.setItem('films#count', count);
    }),
    map(({ films, pageable, meta }) => ({
      effect: filmsLoaded(films, pageable),
      meta
    }))
  );

  const [taskEffect$, directEffect$] = ofType$.pipe(
    partition(({ meta }) => meta && meta.task)
  );

  return merge(
    taskEffect$.pipe(
      map(({ effect, meta }) => completeTask(meta.task, { effect }))
    ),
    directEffect$.pipe(map(({ effect }) => effect))
  );
}

export default onFilmsPageFetched;
