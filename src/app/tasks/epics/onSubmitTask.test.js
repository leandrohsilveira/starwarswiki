import { BehaviorSubject, combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
import onSubmitTask from './onSubmitTask';
import tasksActionsTypes, { submitTask } from '../actions';
import tasksEpics from '.';

describe('onSubmitTask epic', () => {
  let actions$;

  beforeEach(() => {
    actions$ = new BehaviorSubject();
  });

  afterEach(() => {
    actions$.complete();
  });

  describe(`when a "${tasksActionsTypes.SUBMIT}" action is provided`, () => {
    const task = {
      id: 'fetchUser',
      name: 'Fetching user data',
      effect: { type: 'effect action' },
    };
    const action = submitTask(task);

    it('it effects to the action of the "effect" prop of the task', (done) => {
      actions$.next(action);
      combineLatest(actions$, onSubmitTask(actions$), tasksEpics(actions$))
        .pipe(take(1))
        .subscribe(([latestAction, onSubmitTaskEffect, tasksEpicsEffect]) => {
          try {
            expect(latestAction.type).toBe(action.type);
            expect(onSubmitTaskEffect.type).toBe(task.effect.type);
            expect(tasksEpicsEffect.type).toBe(task.effect.type);
            done();
          } catch (e) {
            done.fail(e);
          }
        });
    });

    it('it effects to a action with a reference to the task ("meta.task" prop)', (done) => {
      actions$.next(action);
      combineLatest(actions$, onSubmitTask(actions$), tasksEpics(actions$))
        .pipe(take(1))
        .subscribe(([latestAction, onSubmitTaskEffect, tasksEpicsEffect]) => {
          try {
            expect(latestAction.meta).toBeFalsy();
            expect(onSubmitTaskEffect.meta.task).toBe(latestAction.task);
            expect(tasksEpicsEffect.meta.task).toBe(latestAction.task);
            done();
          } catch (e) {
            done.fail(e);
          }
        });
    });
  });
});
