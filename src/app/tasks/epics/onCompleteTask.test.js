import { BehaviorSubject, combineLatest } from 'rxjs';
import { take, skip } from 'rxjs/operators';
import mockEpic, { NOT_CALLED } from '__test-utils__/rxjs.utils';
import onCompleteTask from './onCompleteTask';
import tasksActionsTypes, { completeTask } from '../actions';
import tasksEpics from '.';

describe('onCompleteTask epic', () => {
  const task = {
    id: 'fetchUser',
    name: 'Fetching user data',
    effect: { type: 'effect action' },
    running: true
  };

  function mockCompletion(successful, contextChanged) {
    return {
      successful,
      contextChanged,
      effect: {
        type: 'userFetched',
        user: {
          id: 1,
          username: 'admin',
          name: 'Administrator'
        }
      }
    };
  }

  let actions$;

  beforeEach(() => {
    actions$ = new BehaviorSubject();
  });

  afterEach(() => {
    actions$.complete();
  });

  describe(`when a "${tasksActionsTypes.COMPLETE}" action is provided`, () => {
    it('it effects to the action with the type of the "effect" prop of the completion', done => {
      const completion = mockCompletion(true, true);
      const action = completeTask(task, completion);
      actions$.next(action);

      combineLatest(
        actions$,
        mockEpic(onCompleteTask(actions$)),
        mockEpic(tasksEpics(actions$))
      )
        .pipe(take(1))
        .subscribe(([latestAction, onCompleteTaskEffect, tasksEpicsEffect]) => {
          try {
            expect(latestAction.type).toEqual(tasksActionsTypes.COMPLETE);
            expect(onCompleteTaskEffect.type).toEqual(completion.effect.type);
            expect(tasksEpicsEffect.type).toEqual(completion.effect.type);
            done();
          } catch (e) {
            done.fail(e);
          }
        });
    });

    describe('if successful is true and contextChanged is true', () => {
      const completion = mockCompletion(true, false);
      const action = completeTask(task, completion);

      it(`it effects to an action with "${
        tasksActionsTypes.CLEAR
      }" type`, done => {
        actions$.next(action);
        combineLatest(
          actions$,
          mockEpic(onCompleteTask(actions$)).pipe(skip(1)),
          mockEpic(tasksEpics(actions$)).pipe(skip(1))
        )
          .pipe(take(1))
          .subscribe(
            ([latestAction, onCompleteTaskEffect, tasksEpicsEffect]) => {
              try {
                expect(latestAction.type).toEqual(tasksActionsTypes.COMPLETE);
                expect(onCompleteTaskEffect.type).toEqual(
                  tasksActionsTypes.CLEAR
                );
                expect(tasksEpicsEffect.type).toEqual(tasksActionsTypes.CLEAR);
                done();
              } catch (e) {
                done.fail(e);
              }
            }
          );
      });

      it('it effects to an action with a "task" prop that is the completed task', done => {
        actions$.next(action);
        combineLatest(
          actions$,
          mockEpic(onCompleteTask(actions$)).pipe(skip(1)),
          mockEpic(tasksEpics(actions$)).pipe(skip(1))
        )
          .pipe(take(1))
          .subscribe(
            ([latestAction, onCompleteTaskEffect, tasksEpicsEffect]) => {
              try {
                expect(latestAction.type).toEqual(tasksActionsTypes.COMPLETE);
                expect(onCompleteTaskEffect.task).toEqual(action.task);
                expect(tasksEpicsEffect.task).toEqual(action.task);
                done();
              } catch (e) {
                done.fail(e);
              }
            }
          );
      });
    });

    describe('if successful and contextChanged are both true', () => {
      const completion = mockCompletion(true, true);
      const action = completeTask(task, completion);

      it('it does not effect', done => {
        actions$.next(action);
        combineLatest(
          actions$,
          mockEpic(onCompleteTask(actions$)).pipe(skip(1)),
          mockEpic(tasksEpics(actions$)).pipe(skip(1))
        )
          .pipe(take(1))
          .subscribe(
            ([latestAction, onCompleteTaskEffect, tasksEpicsEffect]) => {
              try {
                expect(latestAction.type).toEqual(tasksActionsTypes.COMPLETE);
                expect(onCompleteTaskEffect).toEqual(NOT_CALLED);
                expect(tasksEpicsEffect).toEqual(NOT_CALLED);
                done();
              } catch (e) {
                done.fail(e);
              }
            }
          );
      });
    });

    describe('if successful and contextChanged are both false', () => {
      const completion = mockCompletion(false, false);
      const action = completeTask(task, completion);

      it('it does not effect', done => {
        actions$.next(action);
        combineLatest(
          actions$,
          mockEpic(onCompleteTask(actions$)).pipe(skip(1)),
          mockEpic(tasksEpics(actions$)).pipe(skip(1))
        )
          .pipe(take(1))
          .subscribe(
            ([latestAction, onCompleteTaskEffect, tasksEpicsEffect]) => {
              try {
                expect(latestAction.type).toEqual(tasksActionsTypes.COMPLETE);
                expect(onCompleteTaskEffect).toEqual(NOT_CALLED);
                expect(tasksEpicsEffect).toEqual(NOT_CALLED);
                done();
              } catch (e) {
                done.fail(e);
              }
            }
          );
      });
    });
  });
});
