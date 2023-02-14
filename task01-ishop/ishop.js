var ishop = React.createClass({
  shopName: 'ishop',
  propTypes: {
    shopName: React.PropTypes.string.isRequired,
    items: React.PropTypes.array.isRequired
  },
  render: function () {
    var img = this.props.items.map(pic =>
      React.DOM.img({className: 'images', src: pic.url})
    );

    var tableCode = this.props.items.map((v, index) =>
      React.DOM.tr({key: v.code, className: 'item'},
        React.DOM.td({className: 'nameItem'}, v.name),
        React.DOM.td({className: 'price'}, v.price),
        React.DOM.td({className: 'picture'}, img[index]),
        React.DOM.td({className: 'residue'}, v.residue)
      )
    );

    tableCode.unshift(
      React.DOM.tr({key: 0, className: 'head'},
        React.DOM.th({className: 'headItem'}, 'Наименование товара'),
        React.DOM.th({className: 'headPrice'}, 'Цена, $'),
        React.DOM.th({className: 'headPicture'}, 'Изображение'),
        React.DOM.th({className: 'headResidue'}, 'Остаток на складе')
      )
    );

    return React.DOM.div({className: 'ishop'},
      React.DOM.div({className: 'iShopName'}, this.props.shopName),
      React.DOM.table({className: 'table'},
        React.DOM.tbody({className: 'tableItems'}, tableCode)
      )
    );
  }
})