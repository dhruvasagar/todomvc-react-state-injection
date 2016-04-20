import appState from "./app_state";
import Immutable, {Map} from "immutable";

import Todo from "../models/todo";

appState.cursor(["state", "todos"]).update(() => Map());

export function getTodo(todoId) {
  return appState.cursor(["state", "todos", todoId]);
}

var todoCounter = 0;
function generateId() {
  todoCounter += 1;
  return String(todoCounter);
}

function updateCache() {
  appState.cursor(["state", "todosCache"]).update(() => {
    return appState.cursor(["state", "todos"]).deref();
  });
}

export function createTodo(todo) {
  appState.cursor(["state", "todos"]).update(todos => {
    let todoId = generateId();
    todo.id = todoId;
    return todos.set(todoId, Immutable.fromJS(todo));
  });
  updateCache();
}

export function clearCompleted() {
  appState.cursor(["state", "todos"]).update(todos => {
    return todos.filterNot(todo => todo.get("completed"));
  });
  updateCache();
}

export function toggleAll() {
  appState.cursor(["state", "todos"]).update(todos => {
    return todos.map((todo) => {
      return todo.set("completed", !todo.get("completed"));
    });
  });
  updateCache();
}

export function toggleTodo(todoId) {
  appState.cursor(["state", "todos", todoId]).update(todo => {
    return todo.set("completed", !todo.get("completed"));
  });
  updateCache();
}

export function updateTodo(todoId, todoParams) {
  appState.cursor(["state", "todos", todoId]).update(todo => {
    return todo.merge(todoParams);
  });
  updateCache();
}

export function removeTodo(todoId) {
  appState.cursor(["state", "todos"]).delete(todoId);
  updateCache();
}

export function filterBy(state) {
  let allTodos = appState.cursor(["state", "todosCache"]).deref();
  appState.cursor(["state", "todos"]).update(() => {
    if (state === "all") {
      return allTodos;
    } else if (state === "active") {
      return allTodos.filterNot(Todo.isCompleted);
    } else {
      return allTodos.filter(Todo.isCompleted);
    }
  });
  appState.cursor(["state", "filterBy"]).update(() => state);
}

export function isCurrentFilter(state) {
  return appState.cursor(["state"]).get("filterBy") === state;
}
