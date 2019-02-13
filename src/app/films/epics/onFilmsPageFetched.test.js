import { BehaviorSubject, combineLatest } from 'rxjs';
import mockEpic from '__test-utils__/rxjs.utils';
import { take } from 'rxjs/operators';
import tasksActionsTypes from 'app/tasks/actions';
import { filmsInitialState } from '../reducer';
import onFilmsPageFetched from './onFilmsPageFetched';
import filmsActionsTypes, { filmsPageFetched } from '../actions';
import filmsEpics from '.';

const featureInitialState = {
  films: filmsInitialState,
};

describe('onFilmsPageFetched epic', () => {
  let actions$;
  let store$;

  beforeEach(() => {
    window.localStorage.clear();
    actions$ = new BehaviorSubject();
    store$ = new BehaviorSubject(featureInitialState);
  });

  afterEach(() => {
    actions$.complete();
    store$.complete();
  });

  describe('when a unknown action is emitted', () => {
    const action = { type: '======' };

    it('it does not effect', (done) => {
      actions$.next(action);
      combineLatest(actions$, mockEpic(onFilmsPageFetched(actions$, store$)))
        .pipe(take(1))
        .subscribe(([latestAction, onFilmsPageFetchedEffect]) => {
          try {
            expect(latestAction).toBeTruthy();
            expect(latestAction.type).toBe(action.type);
            expect(onFilmsPageFetchedEffect).toBe('not called');
            done();
          } catch (e) {
            done.fail(e);
          }
        });
    });
  });

  describe(`when an action with type "${filmsActionsTypes.PAGE_FETCHED}" is emitted`, () => {
    describe('without meta task prop', () => {
      const films = [{ name: 'Film 1' }];
      const pageable = { page: 1, limit: 10 };
      const action = filmsPageFetched(films, pageable);

      it(`it effects to an action with type "${filmsActionsTypes.LOADED}"`, (done) => {
        actions$.next(action);
        combineLatest(
          actions$,
          mockEpic(onFilmsPageFetched(actions$, store$)),
          mockEpic(filmsEpics(actions$, store$)),
        )
          .pipe(take(1))
          .subscribe(([latestAction, onFilmsPageFetchedEffect, filmsEpicsEffect]) => {
            try {
              expect(onFilmsPageFetchedEffect).not.toBe('not called');
              expect(filmsEpicsEffect).not.toBe('not called');
              expect(latestAction).toBeTruthy();
              expect(latestAction.type).toBe(action.type);
              expect(onFilmsPageFetchedEffect).toBeTruthy();
              expect(onFilmsPageFetchedEffect.type).toBe(filmsActionsTypes.LOADED);
              expect(filmsEpicsEffect).toBeTruthy();
              expect(filmsEpicsEffect.type).toBe(filmsActionsTypes.LOADED);
              done();
            } catch (e) {
              done.fail(e);
            }
          });
      });

      it('it inserts films array into localStorage with key "films#1#10"', (done) => {
        expect(window.localStorage.getItem('films#1#10')).toBeFalsy();
        actions$.next(action);
        combineLatest(
          mockEpic(onFilmsPageFetched(actions$, store$)),
          mockEpic(filmsEpics(actions$, store$)),
        )
          .pipe(take(1))
          .subscribe(([onFilmsPageFetchedEffect, filmsEpicsEffect]) => {
            try {
              expect(onFilmsPageFetchedEffect).not.toBe('not called');
              expect(filmsEpicsEffect).not.toBe('not called');
              expect(window.localStorage.getItem('films#1#10')).toBeTruthy();
              const storedFilms = JSON.parse(window.localStorage.getItem('films#1#10'));
              expect(storedFilms).toBeTruthy();
              expect(storedFilms.length).toBeTruthy();
              expect(storedFilms[0].name).toBe(films[0].name);
              done();
            } catch (e) {
              done.fail(e);
            }
          });
      });
    });
  });

  describe('with meta task prop', () => {
    const films = [{ name: 'Film 1' }];
    const pageable = { page: 1, limit: 10 };
    const action = {
      ...filmsPageFetched(films, pageable),
      meta: {
        task: {
          id: 'fetchFilms#1#10',
          name: 'Fetching 10 films of page 1',
          running: true,
        },
      },
    };

    it(`it effects to an action with type "${tasksActionsTypes.COMPLETE}"`, (done) => {
      actions$.next(action);
      combineLatest(
        actions$,
        mockEpic(onFilmsPageFetched(actions$, store$)),
        mockEpic(filmsEpics(actions$, store$)),
      )
        .pipe(take(1))
        .subscribe(([latestAction, onFilmsPageFetchedEffect, filmsEpicsEffect]) => {
          try {
            expect(onFilmsPageFetchedEffect).not.toBe('not called');
            expect(filmsEpicsEffect).not.toBe('not called');
            expect(latestAction).toBeTruthy();
            expect(latestAction.type).toBe(action.type);
            expect(onFilmsPageFetchedEffect).toBeTruthy();
            expect(onFilmsPageFetchedEffect.type).toBe(tasksActionsTypes.COMPLETE);
            expect(filmsEpicsEffect).toBeTruthy();
            expect(filmsEpicsEffect.type).toBe(tasksActionsTypes.COMPLETE);
            done();
          } catch (e) {
            done.fail(e);
          }
        });
    });

    it('it effects to an action with "task" prop that is the same instance of source action meta task', (done) => {
      actions$.next(action);
      combineLatest(
        actions$,
        mockEpic(onFilmsPageFetched(actions$, store$)),
        mockEpic(filmsEpics(actions$, store$)),
      )
        .pipe(take(1))
        .subscribe(([latestAction, onFilmsPageFetchedEffect, filmsEpicsEffect]) => {
          try {
            expect(onFilmsPageFetchedEffect).not.toBe('not called');
            expect(filmsEpicsEffect).not.toBe('not called');
            expect(latestAction).toBeTruthy();
            expect(latestAction.type).toBe(action.type);
            expect(onFilmsPageFetchedEffect).toBeTruthy();
            expect(onFilmsPageFetchedEffect.task).toBe(action.meta.task);
            expect(filmsEpicsEffect).toBeTruthy();
            expect(filmsEpicsEffect.task).toBe(action.meta.task);
            done();
          } catch (e) {
            done.fail(e);
          }
        });
    });

    it('it inserts films array into localStorage with key "films#1#10"', (done) => {
      expect(window.localStorage.getItem('films#1#10')).toBeFalsy();
      actions$.next(action);
      combineLatest(
        mockEpic(onFilmsPageFetched(actions$, store$)),
        mockEpic(filmsEpics(actions$, store$)),
      )
        .pipe(take(1))
        .subscribe(([onFilmsPageFetchedEffect, filmsEpicsEffect]) => {
          try {
            expect(onFilmsPageFetchedEffect).not.toBe('not called');
            expect(filmsEpicsEffect).not.toBe('not called');
            expect(window.localStorage.getItem('films#1#10')).toBeTruthy();
            const storedFilms = JSON.parse(window.localStorage.getItem('films#1#10'));
            expect(storedFilms).toBeTruthy();
            expect(storedFilms.length).toBeTruthy();
            expect(storedFilms[0].name).toBe(films[0].name);
            done();
          } catch (e) {
            done.fail(e);
          }
        });
    });
  });
});
