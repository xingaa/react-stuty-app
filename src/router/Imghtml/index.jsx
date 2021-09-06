import { element } from 'prop-types';
import React, { Component } from 'react';
import styles from "./index.module.scss";
import logo from '../../logo.svg';
import { Button } from "antd"
import html2canvas from "html2canvas"

class index extends Component {
    state = {
        text: [
            "html2canvas",
            "npm i html2canvas@0.5.0-beta4",
            "How does it work?###",
            "The function returns a Promise containing the <canvas> element. Simply add a promise",
            "fullfillment handler to the promise using then:",
            "html2canvas(document.body).then(function(canvas) {",
            "    document.body.appendChild(canvas);",
            "});",
        ]
    }

    render() {


        return (
            <div className={styles.box} id="wrap">
                <Button onClick={this.addLine}>新增一行</Button>
                <Button onClick={this.creImage} >生成海报</Button>
                <ol id="waterMarkWrap" className={styles.htmlBox}>
                    {this.state.text.map((item, index) => {
                        return (
                            <li key={index}>
                                <p>
                                    {item}
                                </p>
                            </li>
                        )
                    })}
                </ol>

            </div>
        );
    }
    addLine = (params) => {
        const { text } = this.state
        text.push("$ git clone --recursive git://github.com/niklasvh/html2canvas.git")
        this.setState({
            text,
        })
    }
    closeShaddow = (params) => {

        const box = document.getElementById("wrap")
        const shaddowBox = document.getElementsByClassName(styles.shaddowBox)
        box.removeChild(shaddowBox[0])
        console.log(shaddowBox);
    }

    creImage = (params) => {
        const _imgBox = document.getElementById("waterMarkWrap")
        // 制造一个悬浮遮罩
        const shaddowBox = document.createElement("div")
        shaddowBox.className = styles.shaddowBox
        const closeBtn = document.createElement("div")
        closeBtn.innerHTML = "×"
        closeBtn.className = styles.closeBtn
        closeBtn.onclick = this.closeShaddow
        shaddowBox.appendChild(closeBtn)
        html2canvas(_imgBox).then(canvas => {
            shaddowBox.appendChild(canvas)
        });
        document.getElementById("wrap").appendChild(shaddowBox)
    }

    componentDidMount() {

    }
}

export default index;
