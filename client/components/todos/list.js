import React from "react";

import If from "../shared/if";
import Todo from "../../models/todo";
import Footer from "./footer";
import TodoItem from "./item";
import component from "../shared/component";

import {updateViewTodos} from "../../stores/view";
import {createTodo, toggleAll} from "../../stores/todo";

class TodoList extends React.Component {
  constructor() {
    super();

    this.state = {
      newTodo: ""
    };

    this.getViewTodos = this.getViewTodos.bind(this);
    this.getViewParams = this.getViewParams.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleToggleAll = this.handleToggleAll.bind(this);
    this.handleNewTodoKeyDown = this.handleNewTodoKeyDown.bind(this);
  }

  getViewTodos() {
    return this.props.viewTodos.toList();
  }

  getViewParams() {
    return this.props.viewParams;
  }

  handleNewTodoKeyDown(e) {
    if (e.keyCode !== 13) {
      return;
    }

    e.preventDefault();

    createTodo({
      title: e.target.value,
      completed: false
    });
    updateViewTodos();

    this.setState({newTodo: ""});
  }

  handleChange(e) {
    this.setState({newTodo: e.target.value});
  }

  handleToggleAll(e) {
    e.preventDefault();
    toggleAll();
  }

  renderTodoItem(todo) {
    var todoId = Todo.getId(todo);
    return (
      <TodoItem key={todoId} todoId={todoId} />
    );
  }

  render() {
    var viewTodos = this.getViewTodos();
    return (
      <div>
        <header className="header">
          <h1>todos</h1>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            value={this.state.newTodo}
            onKeyDown={this.handleNewTodoKeyDown}
            onChange={this.handleChange}
            autoFocus={true}
          />
        </header>
        <If condition={Todo.getCount(viewTodos) > 0}>
          <section className="main">
            <input
              className="toggle-all"
              type="checkbox"
              onChange={this.handleToggleAll}
              checked={Todo.getActiveCount(viewTodos) === 0}
            />
            <ul className="todo-list">
              {viewTodos.map(this.renderTodoItem)}
            </ul>
          </section>
        </If>
        <Footer />
      </div>
    );
  }
}

TodoList = component(TodoList, {
  viewParams: ["state", "view"],
  viewTodos: ["state", "view", "todos"]
});

export default TodoList;
