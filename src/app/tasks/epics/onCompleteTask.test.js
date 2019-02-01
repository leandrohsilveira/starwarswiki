import { BehaviorSubject, combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
import onCompleteTask from './onCompleteTask';
import tasksActionsTypes, { completeTask } from '../actions';
import tasksEpics from '.';

describe('onCompleteTask epic', () => {
  const task = {
    id: 'fetchUser',
    name: 'Fetching user data',
    effect: { type: 'effect action' },
    running: true,
  };

  const completion = {
    successful: true,
    contextChanged: false,
    effect: {
      type: 'userFetched',
      user: {
        id: 1,
        username: 'admin',
        name: 'Administrator',
      },
    },
  };

  const action = completeTask(task, completion);
  let actions$;

  beforeEach(() => {
    actions$ = new BehaviorSubject();
  });

  afterEach(() => {
    actions$.complete();
  });

  describe(`when a "${tasksActionsTypes.COMPLETE}" action is provided`, () => {
    it('it effects to the action with the type of the "effect" prop of the completion', (done) => {
      actions$.next(action);

      combineLatest(actions$, onCompleteTask(actions$), tasksEpics(actions$))
        .pipe(take(1))
        .subscribe(([latestAction, onCompleteTaskEffect, tasksEpicsEffect]) => {
          try {
            expect(latestAction.type).toEqual(tasksActionsTypes.COMPLETE);
            expect(onCompleteTaskEffect.type).toEqual(completion.effect.type);
            expect(tasksEpicsEffect.type).toEqual(completion.effect.type);
            done();
          } catch (e) {
            done.fail();
          }
        });
    });
  });
});
