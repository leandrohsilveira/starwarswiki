import { useMemo } from "react";
import useStore from "./useStore";

function useStoreStateSelector(selector, args) {
  const [state] = useStore();
  const memoTrigger = args || state;

  return useMemo(
    () => {
      const selectorArgs = args ? [state, ...args] : [state];
      return selector.apply(selector, selectorArgs);
    },
    [memoTrigger]
  );
}

export default useStoreStateSelector;
