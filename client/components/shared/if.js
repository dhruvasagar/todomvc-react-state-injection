import React from "react";

// TODO: This still evaluates the children.
// Note: This EVALUATES the children.
export default class If extends React.Component {
  render() {
    if (this.props.condition) {
      return React.Children.only(this.props.children);
    } else {
      return false;
    }
  }
}
