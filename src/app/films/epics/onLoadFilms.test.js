import { BehaviorSubject, combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
import mockEpic from '__test-utils__/rxjs.utils';
import onLoadFilms from './onLoadFilms';

describe('onLoadFilms epic', () => {
  let actions$;

  beforeEach(() => {
    actions$ = new BehaviorSubject();
  });

  afterEach(() => {
    actions$.complete();
  });

  describe('when a unknown action is emitted', () => {
    const action = { type: '======' };

    it('it does not effect', (done) => {
      actions$.next(action);
      combineLatest(actions$, mockEpic(onLoadFilms(actions$)))
        .pipe(take(1))
        .subscribe(([latestAction, onLoadFilmsEffect]) => {
          try {
            expect(latestAction).toBeTruthy();
            expect(latestAction.type).toBe(action.type);
            expect(onLoadFilmsEffect).toBe('not called');
            done();
          } catch (e) {
            done.fail(e);
          }
        });
    });
  });
});
