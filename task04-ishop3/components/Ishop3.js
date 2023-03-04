import React from 'react';
import PropTypes from 'prop-types';

import './ishop3.css';
import ProductItem from './Product.js';

class Ishop extends React.Component {

  static propTypes = {
    shopName: PropTypes.string.isRequired,
    defaultItems: PropTypes.array.isRequired,
  };

  state = {
    selectedProductCode: null,
    items: this.props.defaultItems,
    activeItem: null,
    //workMode: 1 - первоначальное состояние с возможностью выбора товара, редактирования, удаления
    // 2 - режим редактирования товара до начала какого-либо изменения в форме
    // 3 - режим редактирования с изменением какой-либо строки или строк
    // 4 - режим добавления и ввода данных для нового товара
    workMode: 1,
    changeName: null,
    changePrice: null,
    changeUrl: null,
    changeQuantity: null
  };

  itemSelected = (code) => {
    if (code) {
      this.state.items.forEach(item => {
        if (item.code === code) {
          let numberItem = this.state.items.indexOf(item);
          this.setState({
            selectedProductCode: code,
            activeItem: item,
            changeName: this.state.items[numberItem].name,
            changePrice: this.state.items[numberItem].price,
            changeUrl: this.state.items[numberItem].url,
            changeQuantity: this.state.items[numberItem].residue
          });
        }
      });
    } else {
      this.setState({selectedProductCode: code});
    }
  };

  itemDeleted = (code) => {
    this.setState({
      items: this.state.items.filter(prod => prod.code !== code),
      selectedProductCode: null,
      activeItem: null
    })
  };

  itemEdit = (code) => {
    this.setState({workMode: 2});
  }

  changeName = (EO) => {
    if (this.state.workMode === 4) {
      this.setState({changeName: EO.target.value});
    } else {
      this.setState({changeName: EO.target.value, workMode: 3});
    }
  }

  changePrice = (EO) => {
    if (this.state.workMode === 4) {
      this.setState({changePrice: EO.target.value});
    } else {
      this.setState({changePrice: EO.target.value, workMode: 3});
    }
  }

  changeUrl = (EO) => {
    if (this.state.workMode === 4) {
      this.setState({changeUrl: EO.target.value});
    } else {
      this.setState({changeUrl: EO.target.value, workMode: 3});
    }
  }

  changeQuantity = (EO) => {
    if (this.state.workMode === 4) {
      this.setState({changeQuantity: EO.target.value});
    } else {
      this.setState({changeQuantity: EO.target.value, workMode: 3});
    }
  }

  saveData = () => {
    let itemsChange = this.state.items.slice(0);
    itemsChange[this.state.items.indexOf(this.state.activeItem)] = {
      name: this.state.changeName,
      code: this.state.activeItem.code,
      price: this.state.changePrice,
      url: this.state.changeUrl,
      residue: this.state.changeQuantity
    };
    this.setState({
      items: itemsChange,
      workMode: 1,
      selectedProductCode: null,
      activeItem: null
    });
  }

  cancelData = () => {
    this.setState({workMode: 1});
  }

  turnAdd = () => {
    this.setState({
      selectedProductCode: null,
      activeItem: null,
      workMode: 4,
      changeName: '',
      changePrice: '',
      changeUrl: '',
      changeQuantity: ''
    })
  }

  addItem = () => {
    let itemsNew = this.state.items.slice(0);
    let itemNew = {
      name: this.state.changeName,
      code: this.state.items[this.state.items.length - 1].code + 1,
      price: this.state.changePrice,
      url: this.state.changeUrl,
      residue: this.state.changeQuantity
    }
    itemsNew.push(itemNew);
    this.setState({items: itemsNew, workMode: 1});
  }

  render() {
    const tableCode = this.state.items.map(v =>
      <ProductItem key={v.code}
                   item={v}
                   cbSelected={this.itemSelected}
                   cbDeleted={this.itemDeleted}
                   cbEdit={this.itemEdit}
                   selectedProductCode={this.state.selectedProductCode}
                   workMode={this.state.workMode}
      />
    );

    const tableHead = <tr key={0} className='head'>
      <th className='headItem'>{'Наименование товара'}</th>
      <th className='headPrice'>{'Цена, $'}</th>
      <th className='headPicture'>{'Изображение'}</th>
      <th className='headResidue'>{'Остаток на складе'}</th>
      <th className='headControl'>{'Управление'}</th>
    </tr>

    return (
      <div className='ishop'>
        <div className='iShopName'>{this.props.shopName}</div>
        <table className='table'>
          <tbody className='tableItems'>
            {tableHead}
            {tableCode}
          </tbody>
        </table>
        {
          (this.state.workMode === 1) &&
          <input
            type='button'
            className='buttonNew'
            name={`newItem`}
            value='New product'
            onClick={this.turnAdd}
          />
        }
        {
          (this.state.workMode === 1 && this.state.selectedProductCode !== null) &&
          <div className='card'>
            <h2 className='card-name'>{this.state.activeItem.name}</h2>
            <p className='card-item'>{this.state.activeItem.name}</p>
            <p className='card-price'>{`Price: ${this.state.activeItem.price}`}</p>
          </div>
        }
        {
          ((this.state.workMode === 2 || this.state.workMode === 3) && this.state.selectedProductCode !== null) &&
          <div className='editField'>
            <h2 className='editField-name'>{'Edit existing Product'}</h2>
            <form>
              <label>{`ID: ${this.state.selectedProductCode}`}</label>
              <br/>
              <label htmlFor='prod-name'>{`Name `}</label>
              <input type='text' id='prod-name' value={this.state.changeName} onChange={this.changeName}/>
              {
                (this.state.changeName === '') &&
                <span className='fill-field'>{'Please, fill the field'}</span>
              }
              <br/>
              <label htmlFor='prod-price'>{`Price `}</label>
              <input type='text' id='prod-price' value={this.state.changePrice} onChange={this.changePrice}/>
              {
                (this.state.changePrice === '') &&
                <span className='fill-field'>{'Please, fill the field'}</span>
              }
              <br/>
              <label htmlFor='prod-url'>{`URL `}</label>
              <input type='text' id='prod-url' value={this.state.changeUrl} onChange={this.changeUrl}/>
              {
                (this.state.changeUrl === '') &&
                <span className='fill-field'>{'Please, fill the field'}</span>
              }
              <br/>
              <label htmlFor='prod-quantity'>{`Quantity `}</label>
              <input type='text' id='prod-quantity' value={this.state.changeQuantity} onChange={this.changeQuantity}/>
              {
                (this.state.changeQuantity === '') &&
                <span className='fill-field'>{'Please, fill the field'}</span>
              }
              <br/>
              <input
                type='button'
                className='buttonSave'
                name={`save`}
                value='Save'
                onClick={this.saveData}
                disabled={!(this.state.changeName !== ''
                  && this.state.changePrice !== ''
                  && this.state.changeUrl !== ''
                  && this.state.changeQuantity !== '')}
              />
              <input
                type='button'
                className='buttonCancel'
                name={`cancel`}
                value='Cancel'
                onClick={this.cancelData}
              />
            </form>
          </div>
        }
        {
          (this.state.workMode === 4) &&
          <div className='addField'>
            <h2 className='addField-name'>{'Add new product'}</h2>
            <form>
              <label>{`ID: ${this.state.items[this.state.items.length - 1].code + 1}`}</label>
              <br/>
              <label htmlFor='add-name'>{`Name `}</label>
              <input type='text' id='add-name' value={this.state.changeName} onChange={this.changeName}/>
              {
                (this.state.changeName === '') &&
                <span className='fill-field'>{'Please, fill the field'}</span>
              }
              <br/>
              <label htmlFor='add-price'>{`Price `}</label>
              <input type='text' id='add-price' value={this.state.changePrice} onChange={this.changePrice}/>
              {
                (this.state.changePrice === '') &&
                <span className='fill-field'>{'Please, fill the field'}</span>
              }
              <br/>
              <label htmlFor='add-url'>{`URL `}</label>
              <input type='text' id='add-url' value={this.state.changeUrl} onChange={this.changeUrl}/>
              {
                (this.state.changeUrl === '') &&
                <span className='fill-field'>{'Please, fill the field'}</span>
              }
              <br/>
              <label htmlFor='add-quantity'>{`Quantity `}</label>
              <input type='text' id='add-quantity' value={this.state.changeQuantity} onChange={this.changeQuantity}/>
              {
                (this.state.changeQuantity === '') &&
                <span className='fill-field'>{'Please, fill the field'}</span>
              }
              <br/>
              <input
                type='button'
                className='buttonAdd'
                name={`add`}
                value='Add'
                onClick={this.addItem}
                disabled={!(this.state.changeName !== ''
                  && this.state.changePrice !== ''
                  && this.state.changeUrl !== ''
                  && this.state.changeQuantity !== '')}
              />
              <input
                type='button'
                className='buttonCancel'
                name={`cancel`}
                value='Cancel'
                onClick={this.cancelData}
              />
            </form>
          </div>
        }
      </div>
    );
  }
}

export default Ishop;