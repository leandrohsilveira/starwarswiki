import { pipe, of, BehaviorSubject } from 'rxjs';
import { timeout, catchError, withLatestFrom, map } from 'rxjs/operators';
import { combineEpics } from 'redux-observable';

export function notCalledIn(timout) {
  return pipe(
    timeout(timout),
    catchError(() => of('not called'))
  );
}

export function mapToStore() {
  return map(({ store }) => store);
}

function mockEpic(epic) {
  return epic.pipe(notCalledIn(300));
}

export function combineMockedEpics(...epics) {
  const actionSubject = new BehaviorSubject(null);

  function spyEpic(actions$, store$) {
    return actions$.pipe(
      withLatestFrom(store$),
      map(([action, state]) => ({ action, state })),
      map(store => ({
        type: '@@epicSpy',
        store
      }))
    );
  }

  const combinedEpics = mockEpic(combineEpics(spyEpic, ...epics));

  return [combinedEpics, of(actionSubject)];
}

export default mockEpic;
