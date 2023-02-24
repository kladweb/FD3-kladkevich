var filter = React.createClass({
  displayName: 'filter',
  propTypes: {
    items: React.PropTypes.array.isRequired
  },

  getInitialState: function () {
    return {
      doSort: false,
      doFilter: '',
      listChange: this.props.items.slice(0)
    }
  },

  checkSortList: function () {
    this.setState({doSort: !this.state.doSort}, () => {
      this.sortList(this.state.listChange);
    });
  },

  sortList: function (list) {
    if (this.state.doSort === true) {
      this.setState({listChange: list.sort()});
    } else {
      var newList = this.props.items.slice(0);
      var newFilterList = newList.filter(word => word.indexOf(this.state.doFilter) !== -1);
      this.setState({listChange: newFilterList});
    }
  },

  checkFilterList: function (EO) {
    this.setState({doFilter: EO.target.value}, this.filterList);
  },

  filterList: function () {
    var newList = this.props.items.slice(0);
    var newListSort = newList.filter(word => word.indexOf(this.state.doFilter) !== -1);
    this.sortList(newListSort);
  },

  clearAll: function () {
    this.setState({doFilter: ''});
    this.setState({listChange: this.props.items.slice(0)});
  },

  render: function () {

    var listItems = this.state.listChange.map(item =>
      React.DOM.li({key: this.state.listChange.indexOf(item), className: 'item'},
        item));

    return React.DOM.div({className: 'filter'},
      React.DOM.form({className: 'form'},
        React.DOM.input({type: 'checkbox', checked: this.state.doSort, onClick: this.checkSortList}),
        React.DOM.input({type: 'text', defaultValue: this.state.doFilter, onChange: this.checkFilterList}),
        React.DOM.input({type: 'reset', value: 'Сброс', onClick: this.clearAll})),
      React.DOM.div({className: 'listItems'},
        React.DOM.ul({className: 'items'}, listItems)));
  }
})