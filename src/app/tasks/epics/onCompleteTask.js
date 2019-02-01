import { ofType } from 'redux-observable';
import { filter, map } from 'rxjs/operators';
import tasksActionsTypes from '../actions';

function onCompleteTask(actions$) {
  return actions$.pipe(
    ofType(tasksActionsTypes.COMPLETE),
    filter(({ effect }) => !!effect),
    map(({ effect }) => effect),
  );
}

export default onCompleteTask;
