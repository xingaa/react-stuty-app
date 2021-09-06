import React, { Component } from 'react';
import styles from "./index.module.scss";
class index extends Component {
  state = {
  }

  render() {
    const { style = {} } = this.props
    return (
      <div className={styles.sword} style={style}>
        <span />
        <span />
        <span />
      </div>
    )
  }

  componentDidMount() {

  }
}

export default index;
