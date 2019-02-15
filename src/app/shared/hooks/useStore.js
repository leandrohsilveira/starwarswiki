import { ReactReduxContext } from 'react-redux';
import { useContext, useState, useEffect } from 'react';
import { Subject } from 'rxjs';

function useStore() {
  const { store, storeState } = useContext(ReactReduxContext);
  return [storeState, store];
}

export function useStore$(...pipes) {
  const [storeState, store] = useStore();
  const [state$] = useState(new Subject(storeState));
  const [state, setState] = useState(storeState);
  useEffect(() => {
    state$.next(storeState);
  }, [storeState]);
  useEffect(() => {
    const subscription = pipes
      .reduce((observable$, pipe) => observable$.pipe(pipe), state$)
      .subscribe(nextState => setState(nextState));
    return () => {
      subscription.unsubscribe();
      state$.complete();
    };
  }, []);

  return [state, store];
}

export default useStore;
