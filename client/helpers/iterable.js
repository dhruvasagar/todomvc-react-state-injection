import _ from "lodash";
import Immutable, {List, Map} from "immutable";

var MapExtensions = {
  pick: function(keyList){
    return this.filter((value, key) => List(keyList).includes(key));
  },
  pluck: function(key) {
    return this.toList().pluck(key);
  }
};

var ListExtensions = {
  pluck: function(key) {
    return this.map((o) => o.get(key));
  }
};

_.extend(Map.prototype, MapExtensions);
_.extend(List.prototype, ListExtensions);

module.exports = Immutable;
