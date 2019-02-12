import { ofType } from 'redux-observable';
import { mapTo } from 'rxjs/operators';
import filmsActionsTypes from '../actions';

function onFetchFilmsPage(state$) {
  return state$.pipe(
    ofType(filmsActionsTypes.FETCH_PAGE),
    mapTo(null),
  );
}

export default onFetchFilmsPage;
