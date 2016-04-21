import appState from "./app_state";
import Immutable from "immutable";

import {getTodos} from "./todo";

appState.cursor(["state", "view"]).update(() => {
  return Immutable.fromJS({
    todos: getTodos(),
    currentFilter: "all"
  });
});

export function setView(params) {
  appState.cursor(["state", "view"]).merge(params);
}
