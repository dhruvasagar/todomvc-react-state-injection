import _ from "lodash";
import React from "react";

import component from "../shared/component";

import Todo from "../../models/todo";

import {
  toggleTodo, updateTodo, removeTodo
} from "../../stores/todo";
import {updateViewTodos} from "../../stores/view";

class TodoItem extends React.Component {
  constructor() {
    super();

    this.state = {
      editText: ""
    };

    this.getTodo = this.getTodo.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDestroy = this.handleDestroy.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentWillMount() {
    let todo = this.getTodo();
    this.setState({
      editText: Todo.getTitle(todo)
    });
  }

  getTodo() {
    return Todo.getTodo(this.props.todos, this.props.todoId);
  }

  handleToggle(e) {
    e.preventDefault();
    toggleTodo(this.props.todoId);
  }

  handleSubmit(e) {
    updateTodo(this.props.todoId, {title: e.target.value});
    this.setState({editing: false});
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      this.handleSubmit(e);
    } else if (e.keyCode === 27) {
      var todo = this.getTodo();
      this.setState({
        editing: false,
        editText: Todo.getTitle(todo)
      });
    }
  }

  handleChange(e) {
    if (this.state.editing) {
      this.setState({editText: e.target.value});
    }
  }

  handleDestroy() {
    removeTodo(this.props.todoId);
    updateViewTodos();
  }

  handleEdit() {
    let todo = this.getTodo();
    this.setState({
      editing: true,
      editText: Todo.getTitle(todo)
    });
  }

  render() {
    var todo = this.getTodo();
    var className = _([
      this.state.editing ? "editing" : "",
      Todo.isCompleted(todo) ? "completed" : ""
    ]).join(" ").trim();

    return (
      <li className={className}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={Todo.isCompleted(todo)}
            onChange={this.handleToggle}
          />
          <label onDoubleClick={this.handleEdit}>
            {Todo.getTitle(todo)}
          </label>
          <button className="destroy" onClick={this.handleDestroy} />
        </div>
        <input
          type="text"
          className="edit"
          value={this.state.editText}
          onBlur={this.handleSubmit}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          autoFocus={true}
        />
      </li>
    );
  }
}

TodoItem = component(TodoItem, {
  todos: ["state", "todos"]
});

export default TodoItem;
