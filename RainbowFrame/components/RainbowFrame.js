import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import './RainbowFrame.css';

class RainbowFrame extends React.Component {

  static  propTypes = {
    colors: PropTypes.array.isRequired
  };


  render() {
    let divs = (
      <div className='frame' style={{border: "solid 10px " + this.props.colors[0], padding: "10px"}}>
        <span className='text'>
          {this.props.children}
        </span>
      </div>
    );
    for (let i = 1; i < this.props.colors.length; i++) {
      divs = (
        <div className='frame' style={{border: "solid 10px " + this.props.colors[i], padding: "10px"}}>
          {divs}
        </div>
      );
    }

    return (
      <Fragment>
        {divs}
      </Fragment>
    );
  }
}

export default RainbowFrame;