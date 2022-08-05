import React, { Component } from 'react';
import { Table, Switch, Space, Icon, Card } from 'antd';
import {
    CaretRightOutlined,
    CaretDownOutlined
} from '@ant-design/icons';
import styles from "./index.module.scss";
import img1 from '../../assets/images/image2.jpg'
class index extends Component {
    state = {
        loading: false,
        text: "点击"
    }
    
    // 组件拖动处理
    handleMove=(dom)=>{
        var mouseIsDown=false
        var cmX=0
        var cmY=0
        dom.onmousedown=(e)=>{
            cmX=e.offsetX
            cmY=e.offsetY
            mouseIsDown=true
        }
        dom.onmousemove=(e)=>{
            const mX=e.offsetX
            const mY=e.offsetY
            const dY=dom.offsetTop
            const dX=dom.offsetLeft
            if (mouseIsDown) {
                dom.style.left=(dX+(mX-cmX))+'px'
                dom.style.top=(dY+(mY-cmY))+'px'
            }
        }
        document.onmouseup=()=>{
            console.log("鼠标释放");
            mouseIsDown=false
        }
    }

    render() {
        return (
            <div className={styles.box}>
                <div className={styles.mask}></div>
                <div className={styles.maskouter}></div>

                {/* <div className={styles.clickbox}>

                    <div
                        className={styles.click}
                        onClick={this.click}
                        onMouseOver={this.mouseOver}
                    >{this.state.text}</div>
                </div> */}
                <div className={styles.halfImg}></div>
                <div className={styles.moveBox}>
                    <div className={styles.moveItem} id='moveme'>
                        The Volleyball Nations League (VNL) men’s match between China and
                         Germany on 23 June has been cancelled after Germany refused to play against 
                         China even though the Chinese athletes were cleared by local authorities after 
                         testing positive for COVID-19.Confirmation of China vs Germany men’s match cancellation 
                         | volleyballworld.co虽然菲律宾官方已经允许中国队出场，但是德国队怕被中国队传染，于是弃赛。
                         在之前的答案里，我已经说了中国男排多人在菲律宾确诊新冠，无法出战世界联赛被判负，将有哪些影响？
                         目前队员状态如何？天赋毒权，主权在病毒，这是历史课本上写的明明白白的至理名言。
                         病毒，理应拥有人类社会一切事物的主权，理应反反复复地感染所有的人类。
                         上天创造了人类，就是用来当病毒的培养皿的，这是毋庸置疑的真理。 
                         而菲律宾，居然与世界逆行，感染了新冠病毒，居然连比赛都不让打了。
                         而现在，“与世界逆行”的菲律宾，都允许中国队出场了，但德国队却弃赛了。
                         说明什么？说明德国比菲律宾更加逆行，宁愿0-3输球，都不愿意承担感染新冠病毒的风险，不愿意与病毒共存。
                         “逆行之王“非德国莫属。这违反了”与病毒共存“的天条。这么下去，德国队被淘汰没有比赛打，
                         德国电视台没有比赛可以放，德国观众没有比赛看，就会饿死，德国经济就会崩溃。那时候，死的可比病毒多得多了！
                         奉劝德国，早日停止不合理的防疫措施，停止与世界逆行，要允许新冠病毒自由传播，加速传播，为病毒做好培养皿，这样才能赢球，经济才能起飞，德国人才能在天堂里安居乐业！
                    </div>

                </div>
            </div>
        );
    }
    click = () => {
        const { text } = this.state
        this.setState({
            text: text + "了"
        })
    }
    mouseOver = () => {
        const { text } = this.state
        this.setState({
            text: text + "入"
        })
    }
    componentDidMount() {
        const dom=document.getElementById('moveme')
        this.handleMove(dom)
    }
    componentWillUnmount(){
        document.onmouseup=null
    }
}


export default index;
