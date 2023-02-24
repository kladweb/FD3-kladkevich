var Ishop = React.createClass({
  shopName: 'ishop',
  propTypes: {
    shopName: React.PropTypes.string.isRequired,
    items: React.PropTypes.array.isRequired,
    deletedProductCode: React.PropTypes.array
  },

  getInitialState: function () {
    return {
      selectedProductCode: null,
      deletedProductCode: []
    }
  },

  itemSelected(code) {
    if (this.state.selectedProductCode === code) {
      this.setState({selectedProductCode: null});
    } else {
      this.setState({selectedProductCode: code});
    }
  },

  itemDeleted(code) {
    var newDeleted = this.state.deletedProductCode.slice(0);
    newDeleted[code] = code;
    this.setState({deletedProductCode: newDeleted.slice(0)}, () => {
    });
  },

  render: function () {

    var tableCode = this.props.items.map((v, index) =>
      (this.state.deletedProductCode.indexOf(index + 1) === -1)
        ? React.createElement(ProductItem, {
          key: v.code,
          item: v,
          cbSelected: this.itemSelected,
          cbDeleted: this.itemDeleted,
          selectedProductCode: this.state.selectedProductCode,
        })
        : null
    );

    var tableHead = React.DOM.tr({key: 0, className: 'head'},
      React.DOM.th({className: 'headItem'}, 'Наименование товара'),
      React.DOM.th({className: 'headPrice'}, 'Цена, $'),
      React.DOM.th({className: 'headPicture'}, 'Изображение'),
      React.DOM.th({className: 'headResidue'}, 'Остаток на складе'),
      React.DOM.th({className: 'headControl'}, 'Управление'));

    tableCode.unshift(tableHead);

    return React.DOM.div({className: 'ishop'},
      React.DOM.div({className: 'iShopName'}, this.props.shopName),
      React.DOM.table({className: 'table'},
        React.DOM.tbody({className: 'tableItems'}, tableCode)));
  }
})