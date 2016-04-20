import _ from "lodash";
import React from "react";

import If from "../shared/if";
import Todo from "../../models/todo";
import {clearCompleted} from "../../stores/todo";
import component from "../shared/component";

import {filterBy, isCurrentFilter} from "../../stores/todo";

class Footer extends React.Component {
  constructor() {
    super();

    this.getTodos = this.getTodos.bind(this);
    this.getTodosCache = this.getTodosCache.bind(this);
    this.renderFilters = this.renderFilters.bind(this);
    this.renderFilterLink = this.renderFilterLink.bind(this);
  }

  getTodos() {
    return this.props.todos.toList();
  }

  getTodosCache() {
    return this.props.todosCache.toList();
  }

  handleClearCompleted() {
    clearCompleted();
  }

  handleFilter(state) {
    return function(e) {
      e.preventDefault();
      filterBy(state);
    };
  }

  renderFilterLink(filterBy) {
    return (
      <li key={filterBy}>
        <a
          key={filterBy}
          href="#"
          onClick={this.handleFilter(filterBy)}
          className={isCurrentFilter(filterBy) ? "selected" : ""}>
          {_.capitalize(filterBy)}
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
    let todosCache = this.getTodosCache();
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{Todo.getActiveCount(todosCache)}</strong> item left
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
  state: ["state"],
  todos: ["state", "todos"],
  todosCache: ["state", "todosCache"]
});

export default Footer;
