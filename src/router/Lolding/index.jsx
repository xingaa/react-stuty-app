import React, { Component } from 'react';
import styles from "./index.module.scss";
import WindLolding from "./WindLolding"
import Waves from "./Waves"
import GlobCard from "./GlobCard"
import UserCard from "./UserCard"
class index extends Component {
  state = {
  }

  render() {
    const { style = {} } = this.props
    return (
      <div className={styles.box}>
        <WindLolding></WindLolding>
        <GlobCard>水珠卡片</GlobCard>
        <UserCard></UserCard>
        <Waves></Waves>
      </div>
    )
  }

  componentDidMount() {

  }
}

export default index;
