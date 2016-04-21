var View = {
  isCurrentFilter: function(view, state) {
    return view.get("currentFilter") === state;
  }
};

export default View;
