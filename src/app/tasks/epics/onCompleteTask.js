import { ofType, combineEpics } from 'redux-observable';
import { filter, map } from 'rxjs/operators';
import tasksActionsTypes, { clearTask } from '../actions';

function onCompleteActions$(actions$) {
  return actions$.pipe(ofType(tasksActionsTypes.COMPLETE));
}

function handleEffect(actions$) {
  return onCompleteActions$(actions$).pipe(
    filter(({ effect }) => !!effect),
    map(({ effect }) => effect)
  );
}

function handleClear(actions$) {
  return onCompleteActions$(actions$).pipe(
    filter(({ successful, contextChanged }) => successful && !contextChanged),
    map(({ task }) => clearTask(task))
  );
}

const onCompleteTask = combineEpics(handleEffect, handleClear);

export default onCompleteTask;
