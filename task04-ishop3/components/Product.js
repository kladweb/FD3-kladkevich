import React from 'react';
import PropTypes from 'prop-types';

import './product.css';

class ProductItem extends React.Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
    cbSelected: PropTypes.func.isRequired,
    cbDeleted: PropTypes.func.isRequired,
    cbEdit: PropTypes.func.isRequired,
    selectedProductCode: PropTypes.number,
    workMode: PropTypes.number,
  };

  selectItem = (EO) => {
    if (this.props.workMode === 1 || this.props.workMode === 2) {
      this.props.cbSelected(this.props.item.code);
    }
  };

  deleteItem = (EO) => {
    EO.stopPropagation();
    let askDel = confirm(`Вы действительно хотите удалить ${this.props.item.name}`);
    if (askDel) {
      this.props.cbDeleted(this.props.item.code);
    }
  };

  editItem = (EO) => {
    this.props.cbEdit(this.props.item.code);
  };

  render() {
    const img = <img className='images' src={this.props.item.url}/>;

    return (
      <tr
        key={this.props.item.code}
        className={(this.props.selectedProductCode === this.props.item.code) ? ' select' : ''}
        onClick={this.selectItem}
      >
        <td className='nameItem'>{this.props.item.name}</td>
        <td className='price'>{this.props.item.price}</td>
        <td className='picture'>{img}</td>
        <td className='residue'>{this.props.item.residue}</td>
        <td className='control'>
          <input
            type='button'
            className='buttonEdit'
            name={`edit${this.props.item.code}`}
            value='Edit'
            onClick={this.editItem}
            disabled={this.props.workMode === 3 || this.props.workMode === 4}
          />
          <input
            type='button'
            className='buttonDel'
            name={`del${this.props.item.code}`}
            value='Delete'
            onClick={this.deleteItem}
            disabled={this.props.workMode !== 1}
          />
        </td>
      </tr>
    )
  }
}

export default ProductItem;