import { useMemo } from 'react';
import useStore from './useStore';

function useStoreStateSelector(selector, ...args) {
  const [state] = useStore();
  return useMemo(() => selector(state, ...args), [state, ...args]);
}

export default useStoreStateSelector;
