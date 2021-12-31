import React, { Component } from 'react';
import styles from "./index.module.scss";
import WindLolding from "./WindLolding"
import Waves from "./Waves"
class index extends Component {
  state = {
  }

  render() {
    const { style = {} } = this.props
    return (
      <div className={styles.box}>
        <WindLolding></WindLolding>
        <Waves>你好</Waves>
      </div>
    )
  }

  componentDidMount() {

  }
}

export default index;
