import { ofType } from 'redux-observable';
import { filter, map } from 'rxjs/operators';
import tasksActionsTypes from '../actions';

function onSubmitTask(actions$) {
  return actions$.pipe(
    ofType(tasksActionsTypes.SUBMIT),
    filter(({ task }) => !!task.effect),
    map(({ task }) => ({
      ...task.effect,
      meta: {
        task
      }
    }))
  );
}

export default onSubmitTask;
