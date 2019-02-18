import mockFetch, { mockResult } from '__test-utils__/fetch.utils';
import { NOT_CALLED, notCalledIn } from '__test-utils__/rxjs.utils';
import { take } from 'rxjs/operators';
import filmsService from './service';

describe('The films service', () => {
  describe('fetchPage function', () => {
    const filmsMockP1L10 = mockResult([{ name: 'Film 1' }]);
    const filmsMockP2L10 = mockResult([{ name: 'Film 11' }]);
    const filmsMockP2L50 = mockResult([
      { name: 'Film 11' },
      { name: 'Film 12' }
    ]);
    beforeAll(() => {
      jest.spyOn(global, 'fetch').mockImplementation(
        mockFetch({
          '/api/films?page=1&limit=10': filmsMockP1L10,
          '/api/films?page=2&limit=10': filmsMockP2L10,
          '/api/films?page=2&limit=50': filmsMockP2L50
        })
      );
    });

    describe('when called without a pageable', () => {
      let result$;

      beforeAll(() => {
        global.fetch.mockClear();
        result$ = filmsService.fetchPage();
      });

      it('it returns an array of films', done => {
        result$
          .pipe(
            notCalledIn(100),
            take(1)
          )
          .subscribe(({ films, count }) => {
            try {
              expect(films).toBe(filmsMockP1L10.results);
              expect(count).toBe(filmsMockP1L10.count);
              done();
            } catch (e) {
              done.fail(e);
            }
          });
      });

      it('it fetch from "/api/films?page=1&limit=10" URL', done => {
        result$
          .pipe(
            notCalledIn(100),
            take(1)
          )
          .subscribe(films => {
            try {
              expect(films).not.toBe(NOT_CALLED);
              expect(global.fetch).toHaveBeenCalledTimes(1);
              expect(global.fetch).toHaveBeenCalledWith(
                '/api/films?page=1&limit=10'
              );
              done();
            } catch (e) {
              done.fail(e);
            }
          });
      });
    });

    describe('when called with an empty object as pageable', () => {
      let result$;

      beforeAll(() => {
        global.fetch.mockClear();
        result$ = filmsService.fetchPage({});
      });

      it('it returns an array of films', done => {
        result$
          .pipe(
            notCalledIn(100),
            take(1)
          )
          .subscribe(({ films, count }) => {
            try {
              expect(films).toBe(filmsMockP1L10.results);
              expect(count).toBe(filmsMockP1L10.count);
              done();
            } catch (e) {
              done.fail(e);
            }
          });
      });

      it('it fetch from "/api/films?page=1&limit=10" URL', done => {
        result$
          .pipe(
            notCalledIn(100),
            take(1)
          )
          .subscribe(films => {
            try {
              expect(films).not.toBe(NOT_CALLED);
              expect(global.fetch).toHaveBeenCalledTimes(1);
              expect(global.fetch).toHaveBeenCalledWith(
                '/api/films?page=1&limit=10'
              );
              done();
            } catch (e) {
              done.fail(e);
            }
          });
      });
    });

    describe('when called with a pageable with page 1 and limit 10', () => {
      const pageable = { page: 1, limit: 10 };

      let result$;

      beforeAll(() => {
        global.fetch.mockClear();
        result$ = filmsService.fetchPage(pageable);
      });

      it('it returns an array of films', done => {
        result$
          .pipe(
            notCalledIn(100),
            take(1)
          )
          .subscribe(({ films, count }) => {
            try {
              expect(films).toBe(filmsMockP1L10.results);
              expect(count).toBe(filmsMockP1L10.count);
              done();
            } catch (e) {
              done.fail(e);
            }
          });
      });

      it('it fetch from "/api/films?page=1&limit=10" URL', done => {
        result$
          .pipe(
            notCalledIn(100),
            take(1)
          )
          .subscribe(films => {
            try {
              expect(films).not.toBe(NOT_CALLED);
              expect(global.fetch).toHaveBeenCalledTimes(1);
              expect(global.fetch).toHaveBeenCalledWith(
                '/api/films?page=1&limit=10'
              );
              done();
            } catch (e) {
              done.fail(e);
            }
          });
      });
    });

    describe('when called with a pageable with page 2 and limit 10', () => {
      const pageable = { page: 2, limit: 10 };

      let result$;

      beforeAll(() => {
        global.fetch.mockClear();
        result$ = filmsService.fetchPage(pageable);
      });

      it('it returns an array of films', done => {
        result$
          .pipe(
            notCalledIn(100),
            take(1)
          )
          .subscribe(({ films, count }) => {
            try {
              expect(films).toBe(filmsMockP2L10.results);
              expect(count).toBe(filmsMockP2L10.count);
              done();
            } catch (e) {
              done.fail(e);
            }
          });
      });

      it('it fetch from "/api/films?page=2&limit=10" URL', done => {
        result$
          .pipe(
            notCalledIn(100),
            take(1)
          )
          .subscribe(films => {
            try {
              expect(films).not.toBe(NOT_CALLED);
              expect(global.fetch).toHaveBeenCalledTimes(1);
              expect(global.fetch).toHaveBeenCalledWith(
                '/api/films?page=2&limit=10'
              );
              done();
            } catch (e) {
              done.fail(e);
            }
          });
      });
    });

    describe('when called with a pageable with page 2 and limit 50', () => {
      const pageable = { page: 2, limit: 50 };

      let result$;

      beforeAll(() => {
        global.fetch.mockClear();
        result$ = filmsService.fetchPage(pageable);
      });

      it('it returns an array of films', done => {
        result$
          .pipe(
            notCalledIn(100),
            take(1)
          )
          .subscribe(({ films, count }) => {
            try {
              expect(films).toBe(filmsMockP2L50.results);
              expect(count).toBe(filmsMockP2L50.count);
              done();
            } catch (e) {
              done.fail(e);
            }
          });
      });

      it('it fetch from "/api/films?page=2&limit=50" URL', done => {
        result$
          .pipe(
            notCalledIn(100),
            take(1)
          )
          .subscribe(films => {
            try {
              expect(films).not.toBe(NOT_CALLED);
              expect(global.fetch).toHaveBeenCalledTimes(1);
              expect(global.fetch).toHaveBeenCalledWith(
                '/api/films?page=2&limit=50'
              );
              done();
            } catch (e) {
              done.fail(e);
            }
          });
      });
    });
  });
});
