import React, { Component } from 'react';
import styles from "./index.module.scss";
import { loadJS } from '../../utils/helper'

class index extends Component {
    state = {
    }

    render() {


        return (
            <div className={styles.box}>
                mathjax
                $${'\\sum'}$$
            </div>
        );
    }

    async componentDidMount() {
        // 重新排版公式
        if (window.MathJax) {
            window.MathJax.typesetPromise && window.MathJax.typesetPromise();
        }
    }


}

export default index;
