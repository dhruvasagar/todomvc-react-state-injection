import appState from "./app_state";
import Immutable, {Map} from "immutable";

import Todo from "../models/todo";

function setItem(key, data) {
  if (localStorage) {
    localStorage.setItem(key, data);
  }
}

function getItem(key) {
  if (localStorage) {
    return localStorage.getItem(key);
  }
}

appState.cursor(["state", "todos"]).update(() => {
  let todosCache = JSON.parse(getItem("todosCache") || {});
  return Immutable.fromJS(todosCache);
});

export function getTodos() {
  return appState.cursor(["state", "todos"]).deref();
}

var todoCounter = parseInt(getItem("todoCounter"), 10);
function generateId() {
  todoCounter += 1;
  setItem("todoCounter", todoCounter);
  return String(todoCounter);
}

function updateCache() {
  setItem("todosCache", JSON.stringify(getTodos()));
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
