import { BehaviorSubject, combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
import mockEpic from '__test-utils__/rxjs.utils';
import mockLocalStorage from 'src/__test-utils__/localStorage.utils';
import onLoadFilms from './onLoadFilms';
import filmsActionsTypes, { loadFilms } from '../actions';
import filmsEpics from '.';
import { filmsInitialState } from '../reducer';

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
        it(`it effects to "${filmsActionsTypes.FETCH_PAGE}" action`, (done) => {
          combineLatest(
            actions$,
            mockEpic(onLoadFilms(actions$, store$)),
            mockEpic(filmsEpics(actions$, store$)),
          )
            .pipe(take(1))
            .subscribe(([latestAction, onLoadFilmsEffect, filmsEpicsEffect]) => {
              try {
                expect(latestAction.type).toBe(filmsActionsTypes.LOAD);
                expect(onLoadFilmsEffect.type).toBe(filmsActionsTypes.FETCH_PAGE);
                expect(filmsEpicsEffect.type).toBe(filmsActionsTypes.FETCH_PAGE);
                done();
              } catch (e) {
                done.fail(e);
              }
            });
        });

        it('it effects to a action with same pageable payload of source action', (done) => {
          combineLatest(
            actions$,
            mockEpic(onLoadFilms(actions$, store$)),
            mockEpic(filmsEpics(actions$, store$)),
          )
            .pipe(take(1))
            .subscribe(([latestAction, onLoadFilmsEffect, filmsEpicsEffect]) => {
              try {
                expect(onLoadFilmsEffect.pageable).toBeTruthy();
                expect(onLoadFilmsEffect.pageable.page).toBe(latestAction.pageable.page);
                expect(onLoadFilmsEffect.pageable.limit).toBe(latestAction.pageable.limit);
                expect(filmsEpicsEffect.pageable).toBeTruthy();
                expect(filmsEpicsEffect.pageable.page).toBe(latestAction.pageable.page);
                expect(filmsEpicsEffect.pageable.limit).toBe(latestAction.pageable.limit);
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
