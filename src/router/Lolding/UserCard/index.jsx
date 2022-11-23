import React, { Component } from 'react';
import styles from "./index.module.scss";
import img1 from '../../../assets/images/qianqian.jpg'
class index extends Component {
  state = {
  }

  render() {
    return (
      <div className={styles.card}>
            <div className={styles.imgBx}>
                <img src={img1} alt='' layout='fill'/>
            </div>
            <div className={styles.content}>
            <div className={styles.details}>
                <h2>qianqian<br/><span>A lazy and stupid cat</span></h2>
                <div className={styles.data}>
                <h3>342<br/><span>Posts</span></h3>
                <h3>120k<br/><span>Followers</span></h3>
                <h3>285<br/><span>Following</span></h3>
                </div>
                <div className={styles.actionBtn}>
                <button>Follow</button>
                <button>Message</button>
                </div>
            </div>
            </div>
        </div>
    )
  }

  componentDidMount() {

  }
}

export default index;
