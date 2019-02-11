import { BehaviorSubject, combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
import mockEpic from '__test-utils__/rxjs.utils';
import mockLocalStorage from 'src/__test-utils__/localStorage.utils';
import onLoadFilms from './onLoadFilms';
import filmsActionsTypes, { loadFilms } from '../actions';
import filmsEpics from '.';
import { filmsInitialState } from '../reducer';
import tasksActionsTypes from 'app/tasks/actions';

const featureInitialState = {
  films: filmsInitialState,
};

describe('onLoadFilms epic', () => {
  let actions$;
  let store$;

  beforeEach(() => {
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
      combineLatest(actions$, mockEpic(onLoadFilms(actions$, store$)))
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

  describe(`when a "${filmsActionsTypes.LOAD}" action is emitted`, () => {
    describe('with a pageable of page 1 and limit 10', () => {
      const action = loadFilms({ page: 1, limit: 10 });
      describe('and pageable is not present in both films map and local storage', () => {
        beforeEach(() => {
          actions$.next(action);
        });
        it(`it effects to "${tasksActionsTypes.SUBMIT}" action`, (done) => {
          combineLatest(
            actions$,
            mockEpic(onLoadFilms(actions$, store$)),
            mockEpic(filmsEpics(actions$, store$)),
          )
            .pipe(take(1))
            .subscribe(([latestAction, onLoadFilmsEffect, filmsEpicsEffect]) => {
              try {
                expect(latestAction.type).toBe(filmsActionsTypes.LOAD);
                expect(onLoadFilmsEffect.type).toBe(tasksActionsTypes.SUBMIT);
                expect(filmsEpicsEffect.type).toBe(tasksActionsTypes.SUBMIT);
                done();
              } catch (e) {
                done.fail(e);
              }
            });
        });

        it('it effects to a action with "id" prop "fetchFilms#1#10"', (done) => {
          combineLatest(
            mockEpic(onLoadFilms(actions$, store$)),
            mockEpic(filmsEpics(actions$, store$)),
          )
            .pipe(take(1))
            .subscribe(([onLoadFilmsEffect, filmsEpicsEffect]) => {
              try {
                expect(onLoadFilmsEffect.id).toBe('fetchFilms#1#10');
                expect(filmsEpicsEffect.id).toBe('fetchFilms#1#10');
                done();
              } catch (e) {
                done.fail(e);
              }
            });
        });

        it('it effects to a action with "name" prop "Fetching 10 films of page 1"', (done) => {
          combineLatest(
            mockEpic(onLoadFilms(actions$, store$)),
            mockEpic(filmsEpics(actions$, store$)),
          )
            .pipe(take(1))
            .subscribe(([onLoadFilmsEffect, filmsEpicsEffect]) => {
              try {
                expect(onLoadFilmsEffect.name).toBe('Fetching 10 films of page 1');
                expect(filmsEpicsEffect.name).toBe('Fetching 10 films of page 1');
                done();
              } catch (e) {
                done.fail(e);
              }
            });
        });

        it(`it effects to a action with "effect" prop that is a "${filmsActionsTypes.FETCH_PAGE}" action`, (done) => {
          combineLatest(
            mockEpic(onLoadFilms(actions$, store$)),
            mockEpic(filmsEpics(actions$, store$)),
          )
            .pipe(take(1))
            .subscribe(([onLoadFilmsEffect, filmsEpicsEffect]) => {
              try {
                expect(onLoadFilmsEffect.effect).toBeTruthy();
                expect(onLoadFilmsEffect.effect.type).toBe(filmsActionsTypes.FETCH_PAGE);
                expect(filmsEpicsEffect.effect).toBeTruthy();
                expect(filmsEpicsEffect.effect.type).toBe(filmsActionsTypes.FETCH_PAGE);
                done();
              } catch (e) {
                done.fail(e);
              }
            });
        });

        it('it effects to a action with "effect" prop with same pageable of source action', (done) => {
          combineLatest(
            mockEpic(onLoadFilms(actions$, store$)),
            mockEpic(filmsEpics(actions$, store$)),
          )
            .pipe(take(1))
            .subscribe(([onLoadFilmsEffect, filmsEpicsEffect]) => {
              try {
                expect(onLoadFilmsEffect.effect).toBeTruthy();
                expect(onLoadFilmsEffect.effect.pageable).toBeTruthy();
                expect(onLoadFilmsEffect.effect.pageable.page).toBe(action.pageable.page);
                expect(onLoadFilmsEffect.effect.pageable.limit).toBe(action.pageable.limit);
                expect(filmsEpicsEffect.effect).toBeTruthy();
                expect(filmsEpicsEffect.effect.pageable).toBeTruthy();
                expect(filmsEpicsEffect.effect.pageable.page).toBe(action.pageable.page);
                expect(filmsEpicsEffect.effect.pageable.limit).toBe(action.pageable.limit);
                done();
              } catch (e) {
                done.fail(e);
              }
            });
        });
      });

      describe('and pageable is present in films map with "films#1#10" key', () => {
        const filmsArray = [{ name: 'Film 1' }];
        beforeEach(() => {
          store$.next({
            films: {
              ...featureInitialState.films,
              films: {
                'films#1#10': filmsArray,
              },
            },
          });
          actions$.next(action);
        });

        it(`it effects to "${filmsActionsTypes.LOADED}" action`, (done) => {
          combineLatest(
            actions$,
            mockEpic(onLoadFilms(actions$, store$)),
            mockEpic(filmsEpics(actions$, store$)),
          )
            .pipe(take(1))
            .subscribe(([latestAction, onLoadFilmsEffect, filmsEpicsEffect]) => {
              try {
                expect(latestAction.type).toBe(filmsActionsTypes.LOAD);
                expect(onLoadFilmsEffect.type).toBe(filmsActionsTypes.LOADED);
                expect(filmsEpicsEffect.type).toBe(filmsActionsTypes.LOADED);
                done();
              } catch (e) {
                done.fail(e);
              }
            });
        });

        it('it effects to a action with a "films" array as payload', (done) => {
          combineLatest(
            mockEpic(onLoadFilms(actions$, store$)),
            mockEpic(filmsEpics(actions$, store$)),
          )
            .pipe(take(1))
            .subscribe(([onLoadFilmsEffect, filmsEpicsEffect]) => {
              try {
                expect(onLoadFilmsEffect.films).toBeTruthy();
                expect(onLoadFilmsEffect.films.length).toBeTruthy();
                expect(onLoadFilmsEffect.films[0].name).toBe(filmsArray[0].name);
                expect(filmsEpicsEffect.films).toBeTruthy();
                expect(filmsEpicsEffect.films.length).toBeTruthy();
                expect(filmsEpicsEffect.films[0].name).toBe(filmsArray[0].name);
                done();
              } catch (e) {
                done.fail(e);
              }
            });
        });
      });

      describe('and pageable is local storage with "films#1#10" key', () => {
        const filmsArray = [{ name: 'Film 1' }];
        beforeEach(() => {
          mockLocalStorage({
            'films#1#10': JSON.stringify(filmsArray),
          });
          actions$.next(action);
        });

        afterEach(() => {
          window.localStorage = null;
        });

        it(`it effects to "${filmsActionsTypes.LOADED}" action`, (done) => {
          combineLatest(
            actions$,
            mockEpic(onLoadFilms(actions$, store$)),
            mockEpic(filmsEpics(actions$, store$)),
          )
            .pipe(take(1))
            .subscribe(([latestAction, onLoadFilmsEffect, filmsEpicsEffect]) => {
              try {
                expect(latestAction.type).toBe(filmsActionsTypes.LOAD);
                expect(onLoadFilmsEffect.type).toBe(filmsActionsTypes.LOADED);
                expect(filmsEpicsEffect.type).toBe(filmsActionsTypes.LOADED);
                done();
              } catch (e) {
                done.fail(e);
              }
            });
        });

        it('it effects to a action with a "films" array as payload', (done) => {
          combineLatest(
            mockEpic(onLoadFilms(actions$, store$)),
            mockEpic(filmsEpics(actions$, store$)),
          )
            .pipe(take(1))
            .subscribe(([onLoadFilmsEffect, filmsEpicsEffect]) => {
              try {
                expect(onLoadFilmsEffect.films).toBeTruthy();
                expect(onLoadFilmsEffect.films.length).toBeTruthy();
                expect(onLoadFilmsEffect.films[0].name).toBe(filmsArray[0].name);
                expect(filmsEpicsEffect.films).toBeTruthy();
                expect(filmsEpicsEffect.films.length).toBeTruthy();
                expect(filmsEpicsEffect.films[0].name).toBe(filmsArray[0].name);
                done();
              } catch (e) {
                done.fail(e);
              }
            });
        });
      });
    });
  });
});
