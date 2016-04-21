import _ from "lodash";

var Todo = {
  getId: function(todo) {
    return String(todo.get("id"));
  },

  getTitle: function(todo) {
    return todo.get("title");
  },

  isCompleted: function(todo) {
    return todo.get("completed", false);
  },

  getTodo: function(todos, todoId) {
    return todos.get(todoId) || {};
  },

  filter: function(todos, filter) {
    let fn = "get" + _.capitalize(filter);
    return this[fn](todos);
  },

  getCount: function(todos) {
    return todos && todos.count();
  },

  getAll: function(todos) {
    return todos;
  },

  getActive: function(todos) {
    return todos && todos.filterNot(this.isCompleted);
  },

  getActiveCount: function(todos) {
    var activeTodos = this.getActive(todos);
    return activeTodos && activeTodos.count();
  },

  getCompleted: function(todos) {
    return todos && todos.filter(this.isCompleted);
  },

  getCompletedCount: function(todos) {
    var completedTodos = this.getCompleted(todos);
    return completedTodos && completedTodos.count();
  }
};

export default Todo;
