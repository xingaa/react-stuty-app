import React, { Component } from 'react';
import styles from "./index.module.scss";
class index extends Component {
  state = {
  }

  render() {
    const { style = {}, children, width = 100, height = 120 } = this.props
    return (
      <div className={styles.box} style={{ width: width + "px", height: height + "px", ...style }}>
        <div className={styles.contents}>
          {children}
        </div>
      </div>
    )
  }

  componentDidMount() {

  }
}

export default index;
