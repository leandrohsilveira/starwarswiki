import { BehaviorSubject, combineLatest } from 'rxjs';
import mockEpic from '__test-utils__/rxjs.utils';
import mockFetch from '__test-utils__/fetch.utils';
import { take } from 'rxjs/operators';
import onFetchFilmsPage from './onFetchFilmsPage';
import { filmsInitialState } from '../reducer';
import filmsActionsTypes, { fetchFilmsPage } from '../actions';
import filmsEpics from '.';

const featureInitialState = {
  films: filmsInitialState,
};

describe('onFetchFilmsPage epic', () => {
  const filmsMockP1L10 = [{ name: 'Film 1' }];

  let actions$;
  let store$;

  beforeAll(() => {
    jest.spyOn(global, 'fetch').mockImplementation(
      mockFetch({
        '/api/films?page=1&limit=10': filmsMockP1L10,
      }),
    );
  });

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
      combineLatest(actions$, mockEpic(onFetchFilmsPage(actions$, store$)))
        .pipe(take(1))
        .subscribe(([latestAction, onFetchFilmsPageEffect]) => {
          try {
            expect(latestAction).toBeTruthy();
            expect(latestAction.type).toBe(action.type);
            expect(onFetchFilmsPageEffect).toBe('not called');
            done();
          } catch (e) {
            done.fail(e);
          }
        });
    });
  });

  describe(`when an action with type "${filmsActionsTypes.FETCH_PAGE}" is emmited`, () => {
    const pageable = {
      page: 1,
      limit: 10,
    };
    const action = fetchFilmsPage(pageable);

    beforeEach(() => {
      actions$.next(action);
    });

    it(`it effects to an action with type "${filmsActionsTypes.PAGE_FETCHED}"`, (done) => {
      combineLatest(
        actions$,
        mockEpic(onFetchFilmsPage(actions$, store$)),
        mockEpic(filmsEpics(actions$, store$)),
      )
        .pipe(take(1))
        .subscribe(([latestAction, onFetchFilmsPageEffect, filmsEpicsEffect]) => {
          try {
            expect(onFetchFilmsPageEffect).not.toBe('not called');
            expect(filmsEpicsEffect).not.toBe('not called');
            expect(latestAction.type).toBe(filmsActionsTypes.FETCH_PAGE);
            expect(onFetchFilmsPageEffect.type).toBe(filmsActionsTypes.PAGE_FETCHED);
            expect(filmsEpicsEffect.type).toBe(filmsActionsTypes.PAGE_FETCHED);
            done();
          } catch (e) {
            done.fail(e);
          }
        });
    });

    it('it effects to an action with films array prop"', (done) => {
      combineLatest(
        mockEpic(onFetchFilmsPage(actions$, store$)),
        mockEpic(filmsEpics(actions$, store$)),
      )
        .pipe(take(1))
        .subscribe(([onFetchFilmsPageEffect, filmsEpicsEffect]) => {
          try {
            expect(onFetchFilmsPageEffect).not.toBe('not called');
            expect(filmsEpicsEffect).not.toBe('not called');
            expect(onFetchFilmsPageEffect.films).toBeTruthy();
            expect(onFetchFilmsPageEffect.films.length).toBeTruthy();
            expect(onFetchFilmsPageEffect.films[0].name).toBe(filmsMockP1L10[0].name);
            expect(filmsEpicsEffect.films).toBeTruthy();
            expect(filmsEpicsEffect.films.length).toBeTruthy();
            expect(filmsEpicsEffect.films[0].name).toBe(filmsMockP1L10[0].name);
            done();
          } catch (e) {
            done.fail(e);
          }
        });
    });

    it('it effects to an action with same pageable prop of the source action"', (done) => {
      combineLatest(
        mockEpic(onFetchFilmsPage(actions$, store$)),
        mockEpic(filmsEpics(actions$, store$)),
      )
        .pipe(take(1))
        .subscribe(([onFetchFilmsPageEffect, filmsEpicsEffect]) => {
          try {
            expect(onFetchFilmsPageEffect).not.toBe('not called');
            expect(filmsEpicsEffect).not.toBe('not called');
            expect(onFetchFilmsPageEffect.pageable).toBeTruthy();
            expect(onFetchFilmsPageEffect.pageable.page).toBe(pageable.page);
            expect(onFetchFilmsPageEffect.pageable.limit).toBe(pageable.limit);
            expect(filmsEpicsEffect.pageable).toBeTruthy();
            expect(filmsEpicsEffect.pageable.page).toBe(pageable.page);
            expect(filmsEpicsEffect.pageable.limit).toBe(pageable.limit);
            done();
          } catch (e) {
            done.fail(e);
          }
        });
    });
  });
});
