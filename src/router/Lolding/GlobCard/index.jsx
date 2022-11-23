import React, { Component } from 'react';
import styles from "./index.module.scss";
class index extends Component {
  state = {
  }

  render() {
    const { info={title:'01'} } = this.props
    return (
      <div className={styles.box} style={{'--clr':'#00aeec'}}>
        {/* <div className={styles.contents}> */}
          <div className={styles.title} >{info?.title}</div>
          <div className={styles.content}>{(info?.content)||'使用HTML和CSS创建带有悬停效果的水滴卡片UI'}</div>
          <div className={styles.btn}>{(info?.btn)||'了解更多'}</div>
        {/* </div> */}
      </div>
    )
  }

  componentDidMount() {

  }
}

export default index;
