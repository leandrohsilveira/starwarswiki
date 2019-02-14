import { useMemo } from 'react';
import useStore from './useStore';

function useStoreStateSelector(selector, args) {
  const [state] = useStore();

  return useMemo(() => {
    const selectorArgs = args ? [state, ...args] : [state];
    return selector.apply(selector, selectorArgs);
  }, [state, args]);
}

export default useStoreStateSelector;
