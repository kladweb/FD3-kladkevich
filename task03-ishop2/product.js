var ProductItem = React.createClass({

  displayName: 'ProductItem',

  propTypes: {
    item: React.PropTypes.object.isRequired,
    cbSelected: React.PropTypes.func.isRequired,
    cbDeleted: React.PropTypes.func.isRequired,
    selectedProductCode: React.PropTypes.number,
  },

  selectItem: function () {
    this.props.cbSelected(this.props.item.code);
  },

  deleteItem: function () {
    this.props.cbDeleted(this.props.item.code);
  },

  render: function () {
    var img = React.DOM.img({className: 'images', src: this.props.item.url});

    return React.DOM.tr({
        key: this.props.item.code,
        className: `item${(this.props.selectedProductCode === this.props.item.code) ? ' select' : ''}`
      },
      React.DOM.td({className: 'nameItem', onClick: this.selectItem}, this.props.item.name),
      React.DOM.td({className: 'price', onClick: this.selectItem}, this.props.item.price),
      React.DOM.td({className: 'picture', onClick: this.selectItem}, img),
      React.DOM.td({className: 'residue', onClick: this.selectItem}, this.props.item.residue),
      React.DOM.td({className: 'control'},
        React.DOM.input({
          type: 'button',
          className: 'buttonDel',
          name: `del${this.props.item.code}`,
          value: 'Delete',
          onClick: this.deleteItem
        })));
  }
})