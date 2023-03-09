import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import './Br2jsx.css';

class Br2jsx extends React.Component {

  static  propTypes = {
    text: PropTypes.string.isRequired
  };

  render() {

    let myArray = this.props.text.split(/<br>|<br\/>|<br \/>/);
    let newArray = [myArray[0]];
    for (let i = 1; i < myArray.length; i++) {
      newArray.push(<br key={i}/>);
      newArray.push(myArray[i]);
    }

    return (
      <div className='br2jsx'>
        {newArray}
      </div>
    );
  }
}

export default Br2jsx;