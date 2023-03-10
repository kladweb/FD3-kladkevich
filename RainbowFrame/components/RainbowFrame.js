import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import './RainbowFrame.css';

class RainbowFrame extends React.Component {

  static  propTypes = {
    colors: PropTypes.array.isRequired
  };

  render() {
    let divs = (
      <span className='text'>
          {this.props.children}
      </span>
    );
    for (let i = 0; i < this.props.colors.length; i++) {
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