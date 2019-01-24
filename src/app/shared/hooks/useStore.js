import { ReactReduxContext } from "react-redux";
import { useContext } from "react";

function useStore() {
  const { store, storeState } = useContext(ReactReduxContext);
  return [storeState, store];
}

export default useStore;
