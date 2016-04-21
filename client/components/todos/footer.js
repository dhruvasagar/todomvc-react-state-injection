import _ from "lodash";
import React from "react";

import If from "../shared/if";
import Todo from "../../models/todo";
import View from "../../models/view";
import component from "../shared/component";

import {setView} from "../../stores/view";
import {clearCompleted} from "../../stores/todo";

class Footer extends React.Component {
  constructor() {
    super();

    this.getTodos = this.getTodos.bind(this);
    this.getViewParams = this.getViewParams.bind(this);
    this.renderFilters = this.renderFilters.bind(this);
    this.renderFilterLink = this.renderFilterLink.bind(this);
  }

  getTodos() {
    return this.props.todos.toList();
  }

  getViewParams() {
    return this.props.viewParams;
  }

  handleFilter(state) {
    let todos = this.props.todos;
    return function(e) {
      e.preventDefault();
      setView({
        todos: Todo.filter(todos, state),
        currentFilter: state
      });
    };
  }

  handleClearCompleted() {
    clearCompleted();
  }

  renderFilterLink(filter) {
    var viewParams = this.getViewParams();
    return (
      <li key={filter}>
        <a
          href="#"
          onClick={this.handleFilter(filter)}
          className={View.isCurrentFilter(viewParams, filter) ? "selected" : ""}>
          {_.capitalize(filter)}
        </a>
      </li>
    );
  }

  renderFilters() {
    let filters = ["all", "active", "completed"];
    return (
      <ul className="filters">
        {_.map(filters, this.renderFilterLink)}
      </ul>
    );
  }

  render() {
    let todos = this.getTodos();
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{Todo.getActiveCount(todos)}</strong> item left
        </span>
        {this.renderFilters()}
        <If condition={Todo.getCompletedCount(todos) > 0}>
          <button
            className="clear-completed"
            onClick={this.handleClearCompleted}>
            Clear Completed
          </button>
        </If>
      </footer>
    );
  }
}

Footer = component(Footer, {
  todos: ["state", "todos"],
  viewParams: ["state", "view"]
});

export default Footer;
