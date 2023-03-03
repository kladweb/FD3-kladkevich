import React from 'react';
import ReactDOM from 'react-dom';

import Ishop from './components/Ishop3.js';

const shopName = 'Магазин подержанных товаров';
const itemsArr = require('./products.json');

ReactDOM.render(
  <Ishop
    shopName={shopName}
    defaultItems={itemsArr}
  />
  , document.getElementById('container')
);