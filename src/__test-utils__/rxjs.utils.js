import { pipe, of } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';

export function notCalledIn(timout) {
  return pipe(
    timeout(timout),
    catchError(() => of('not called'))
  );
}

function mockEpic(epic) {
  return epic.pipe(notCalledIn(300));
}

export default mockEpic;
