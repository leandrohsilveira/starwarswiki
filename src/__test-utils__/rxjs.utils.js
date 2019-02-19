import { pipe, of, BehaviorSubject } from 'rxjs';
import {
  timeout,
  catchError,
  withLatestFrom,
  map,
  filter,
  tap
} from 'rxjs/operators';
import { combineEpics } from 'redux-observable';

export const NOT_CALLED = { type: '@@notCalled' };

export function notCalledIn(timout) {
  return pipe(
    timeout(timout),
    catchError(() => of(NOT_CALLED))
  );
}

export function spyType(type) {
  return pipe(
    filter(event => event),
    filter(action => {
      return (
        action === NOT_CALLED ||
        (action.store && action.store.action.type === type)
      );
    })
  );
}

function mockEpic(epic) {
  return epic.pipe(notCalledIn(300));
}

export function combineMockedEpics(...epics) {
  const actionSubject = new BehaviorSubject(null);

  function spyEpic(actions$, store$) {
    return actions$.pipe(
      filter(({ type }) => type !== '@@epicSpy'),
      withLatestFrom(store$),
      map(([action, state]) => ({ action, state })),
      map(store => ({
        type: '@@epicSpy',
        store
      })),
      tap(action => actionSubject.next(action))
    );
  }

  const combinedEpics = combineEpics(spyEpic, ...epics);
  const mockedEpic = (actions$, store$) =>
    mockEpic(combinedEpics(actions$, store$));

  return [mockedEpic, actionSubject.pipe(notCalledIn(500))];
}

export default mockEpic;
