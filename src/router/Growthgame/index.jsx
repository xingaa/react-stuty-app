import React, { Component } from 'react';
import styles from "./index.module.scss";
import firstPlace from "./worldInfo/firstPlace"
class index extends Component {
    state = {
        text: [
            '系统-欢迎来到这个打怪刷级的世界，在这里你的目的只有一个，找到宝藏，回到原来的世界！'
        ],
        worldInfo: {},
        selfInfo: {
            name: "你",
            describe: "风流倜傥英俊潇洒",
            attack: 1,
            avoid: 0.01,
            hp: 5,
            exp: 2,
            agile: 1, //敏捷
            level: 1,
            fullExp: 10,
        }
    }

    render() {
        const { text, worldInfo, selfInfo, oldworldInfo } = this.state

        return (
            <div className={styles.box} id="world">
                <div className={styles.infoBox}>
                    {
                        text.map((item, index) => {
                            const arritem = item.split("-")
                            return (
                                <p className={styles.infoBoxItem} key={index}>
                                    <b>{arritem[0] + " "}</b>
                                    <span>{arritem[1]}</span>
                                </p>
                            )
                        })
                    }
                </div>
                <div className={styles.actionBox}>
                    <div className={styles.address}>{worldInfo.name}</div>
                    <div className={styles.whereGo}>
                        <div>去向:</div>
                        {/* {
                            oldworldInfo && (
                                <div className={styles.whereGoItem} onClick={this.goBack}>
                                    返回
                                </div>
                            )
                        } */}

                        {
                            worldInfo.address && worldInfo.address.map((i, index) => {
                                const item = i()
                                return (
                                    <div key={index} className={styles.whereGoItem} onClick={this.onchangePlace.bind(this, item)}>
                                        {item.name}
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={styles.hereWho}>
                        <div>NPC:</div>
                        {
                            worldInfo.NPC && worldInfo.NPC.map((item, index) => {
                                if (item.hp <= 0) return
                                return (
                                    <div className={styles.hereWhoItem} key={index}>
                                        <div className={styles.hereWhoItemName}>{item.name}</div>
                                        <div className={styles.hereWhoItemAttack} onClick={this.attack.bind(this, item)}>[攻击]</div>
                                        <div className={styles.hereWhoItemAttack} onClick={this.Toavoid.bind(this, item)}>[躲避]</div>
                                    </div>
                                )
                            })
                        }

                    </div>
                    {
                        selfInfo.hp <= 0 && (
                            <div className={styles.deadBox}>
                                你已化作一缕青烟
                            </div>
                        )
                    }

                </div>
            </div>
        );
    }
    // 攻击
    attack = (params) => {
        const { selfInfo, worldInfo, text } = this.state
        params.hp = params.hp - selfInfo.attack
        if (params.hp > 0) {
            text.unshift("系统-攻击" + params.name + ",血量扣除" + selfInfo.attack + ",剩余血量" + params.hp)
            // npc反击
            if (!params.beatbackFn) params.beatbackFn = this.beatBack(params)
            params.beatbackFn()
        } else {
            selfInfo.exp += params.exp
            text.unshift("系统-攻击" + params.name + ",消灭,经验+" + params.exp)
            this.checkLevel()
            if (params.beatbackFn) params.beatbackFn(1)
        }
        this.setState({ text, })
    }
    // checkLevel检测是否升级加属性
    checkLevel = () => {
        const { selfInfo, text } = this.state
        if (selfInfo.exp > selfInfo.fullExp) {
            selfInfo.level += 1
            selfInfo.exp -= selfInfo.fullExp
            selfInfo.fullExp = selfInfo.level * 10
            selfInfo.attack = selfInfo.level * 2
            selfInfo.avoid = selfInfo.level * 0.02
            selfInfo.hp = selfInfo.level * 5
            selfInfo.agile = selfInfo.agile * 2
            text.unshift("系统-恭喜你经验值已满足条件完成升级！,等级：" + selfInfo.level)
            this.setState({ selfInfo, text, }, () => {
                this.checkLevel()
            })
        }
        return
    }

    //反击
    beatBack = (params) => {
        let timer = null
        return (cancel) => {
            if (cancel) {
                clearInterval(timer)
                timer = null
                return
            }
            if (timer) return
            timer = setInterval(() => {
                const { selfInfo, text } = this.state
                selfInfo.hp = selfInfo.hp - params.attack
                if (selfInfo.hp > 0) {
                    text.unshift("系统-你被" + params.name + "攻击,血量扣除" + params.attack + ",剩余血量" + selfInfo.hp)
                } else {
                    text.unshift("系统-你被" + params.name + "攻击,死亡！")
                    clearInterval(timer)
                    timer = null
                }
                this.setState({ text, })
            }, params.attackSpeed);
        }
    }

    // 躲避
    Toavoid = (params) => {

    }

    murder = null
    onchangePlace = (params) => {
        let { text, worldInfo } = this.state
        const oldworldInfo = worldInfo
        // 杀意消
        // clearTimeout(this.murder)
        // this.murder = null
        // oldworldInfo.NPC && oldworldInfo.NPC.map(item => {
        //     if (item.beatbackFn) item.beatbackFn(1)
        // })
        worldInfo = params
        // 杀意启
        // worldInfo.NPC && worldInfo.NPC.map(item => {
        //     if (!item.beatbackFn) item.beatbackFn = this.beatBack(item)
        // })
        text.unshift("系统-来到" + params.name + "," + params.describe)
        this.setState({ worldInfo, text, oldworldInfo, })

    }
    // goBack = () => {
    //     let { text, oldworldInfo, worldInfo } = this.state
    //     const newworldInfo = oldworldInfo
    //     oldworldInfo = worldInfo
    //     worldInfo = newworldInfo
    //     text.unshift("系统-来到" + oldworldInfo.name + "," + oldworldInfo.describe)
    //     this.setState({ worldInfo, text, oldworldInfo, })
    // }

    componentDidMount() {
        const worldInfo = firstPlace()
        this.setState({ worldInfo, })

    }
}

export default index;
