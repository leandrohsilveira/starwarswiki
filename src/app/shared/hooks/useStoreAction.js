import { useCallback } from "react";

import useStore from "./useStore";

function useStoreAction(actionCreator) {
  const [, dispatch] = useStore();
  return useCallback(function() {
    dispatch(actionCreator.apply(actionCreator, arguments));
  });
}

export default useStoreAction;
