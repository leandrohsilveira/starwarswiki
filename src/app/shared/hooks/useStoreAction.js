import { useCallback } from 'react';

import useStore from './useStore';

function useStoreAction(actionCreator) {
  const [, { dispatch }] = useStore();
  return useCallback((...args) => {
    dispatch(actionCreator(...args));
  }, []);
}

export default useStoreAction;
