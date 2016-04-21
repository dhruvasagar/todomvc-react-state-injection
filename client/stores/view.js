import appState from "./app_state";
import Immutable from "immutable";

import Todo from "../models/todo";

import {getTodos, clearCompleted as clearCompletedTodos} from "./todo";

appState.cursor(["state", "view"]).update(() => {
  return Immutable.fromJS({
    todos: getTodos(),
    currentFilter: "all"
  });
});

export function setView(params) {
  appState.cursor(["state", "view"]).merge(params);
}

export function updateViewTodos() {
  setView({todos: getTodos()});
}

export function setFilter(filter) {
  setView({
    todos: Todo.filter(getTodos(), filter),
    currentFilter: filter
  });
}

export function clearCompleted() {
  clearCompletedTodos();
  updateViewTodos();
}
