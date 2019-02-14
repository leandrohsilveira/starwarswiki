import { ofType } from 'redux-observable';
import { switchMap, map } from 'rxjs/operators';
import filmsActionsTypes, { filmsPageFetched } from '../actions';
import filmsService from '../service';

function onFetchFilmsPage(actions$) {
  return actions$.pipe(
    ofType(filmsActionsTypes.FETCH_PAGE),
    switchMap(({ pageable }) => {
      const result$ = filmsService.fetchPage(pageable);
      return result$.pipe(map(films => [pageable, films]));
    }),
    map(([pageable, films]) => filmsPageFetched(films, pageable)),
  );
}

export default onFetchFilmsPage;