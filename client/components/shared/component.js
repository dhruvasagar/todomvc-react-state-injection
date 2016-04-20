import _ from "lodash";
import React from "react";

import appState from "../../stores/app_state";

export default function component(ParentComponent, paths) {
  return React.createClass({
    displayName: "component",

    render: function() {
      var isComputed = (pitem) => /^computed/i.test(pitem);
      var hasComputed = (path) => _.some(path, isComputed);

      var computedPaths = _.pickBy(paths, (path) => hasComputed(path));
      var standardPaths = _.pickBy(paths, (path) => !hasComputed(path));

      var props = _.reduce(standardPaths, ((memo, path, key) => {
        memo[key] = appState.cursor(path);
        return memo;
      }), {});

      props = _.reduce(computedPaths, ((memo, path, key) => {
        path = path.map((pitem) => {
          if (isComputed(pitem)) {
            var keys = pitem.split(".").slice(2);
            var cursorKey = pitem.split(".")[1];
            var ppath = memo[cursorKey].deref();
            return _.isEmpty(keys) ? ppath : ppath.getIn(keys);
          } else {
            return pitem;
          }
        });
        memo[key] = appState.cursor(path);
        return memo;
      }), props);

      return <ParentComponent {...this.props} {...props} />;
    }
  });
}
