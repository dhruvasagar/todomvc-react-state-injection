import {Map} from "immutable";
import immstruct from "immstruct";

var appState;
appState = immstruct({state: Map()});

export default appState;

export function resetState() {
  appState.cursor("state").update(() => {
    return new Map();
  });
}

window.appState = appState;
