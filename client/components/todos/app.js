import React from "react";

import TodoList from "./list";

export default class TodoApp extends React.Component {
  render() {
    return (
      <section className="todoapp">
        <TodoList />
      </section>
    );
  }
}
