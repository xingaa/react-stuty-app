import React, { Component } from 'react';
import styles from "./index.module.scss";

class index extends Component {
    state = {
    }
    render() {
        return (
            <div className={styles.box}>
                <canvas id="myConvas" width="800" height="600" className={styles.mycanvas}></canvas>
                <div className={styles.scapebox + " bottom"}>
                    <div className={styles.scape}>一等奖</div>
                    <canvas id="myscapeCanvas" className={styles.scapeCanvas} width="176" height="80"></canvas>

                </div>
            </div>
        );
    }
    handleClock = () => {
        const canv = document.getElementById("myConvas")
        const cxt = canv.getContext("2d")
        console.log(cxt);
        const renderTimer = () => {
            // 重置
            cxt.clearRect(0, 0, 800, 600)
            // 将坐标移动到画布中央
            // 保存尺子
            cxt.save()
            // 改变原点至中心点
            cxt.translate(400, 300)
            // 保存尺子
            cxt.save()
            // 绘制时钟表盘
            cxt.beginPath()
            cxt.arc(0, 0, 200, 0, 2 * Math.PI)
            cxt.strokeStyle = "darkgrey"
            cxt.lineWidth = 10
            cxt.fillStyle = "#fff"
            cxt.fill()
            cxt.stroke()
            cxt.closePath()
            // 绘制时钟刻度
            for (var i = 0; i < 60; i++) {
                cxt.rotate(Math.PI / 30)
                cxt.beginPath()
                cxt.moveTo(180, 0)
                cxt.lineTo(190, 0)
                cxt.lineWidth = 2
                cxt.strokeStyle = "orangered"
                cxt.stroke()
                cxt.closePath()
            }
            // 恢复
            cxt.restore()
            cxt.save()
            for (var i = 0; i < 12; i++) {
                cxt.rotate(Math.PI / 6)
                cxt.beginPath()
                cxt.moveTo(180, 0)
                cxt.lineTo(200, 0)
                cxt.lineWidth = 10
                cxt.strokeStyle = "darkgrey"
                cxt.stroke()
                cxt.closePath()
            }
            // 恢复
            cxt.restore()
            cxt.save()
            // 获取时间
            const time = new Date()
            const hour = time.getHours() > 12 ? (time.getHours() - 12) : time.getHours()
            const min = time.getMinutes()
            const sec = time.getSeconds()
            // console.log(hour, min, sec);
            // 绘制秒针
            cxt.beginPath()
            cxt.rotate(Math.PI / 30 * sec)
            cxt.moveTo(0, 20)
            cxt.lineTo(0, -170)
            cxt.lineWidth = 2
            cxt.strokeStyle = "orangered"
            cxt.stroke()
            cxt.closePath()
            // 恢复
            cxt.restore()
            cxt.save()
            // 绘制分针
            cxt.beginPath()
            cxt.rotate(Math.PI / 30 * (min + sec / 60))
            cxt.moveTo(0, 20)
            cxt.lineTo(0, -160)
            cxt.lineWidth = 4
            cxt.strokeStyle = "green"
            cxt.stroke()
            cxt.closePath()
            // 恢复
            cxt.restore()
            cxt.save()
            // 绘制时针
            cxt.beginPath()
            cxt.rotate(Math.PI / 6 * (hour + (min + sec / 60) / 60))
            cxt.moveTo(0, 20)
            cxt.lineTo(0, -150)
            cxt.lineWidth = 8
            cxt.strokeStyle = "blue"
            cxt.stroke()
            cxt.closePath()
            // 恢复
            cxt.restore()
            cxt.save()
            // 指针盖
            cxt.beginPath()
            cxt.arc(0, 0, 10, 0, 2 * Math.PI)
            cxt.fillStyle = "red"
            cxt.fill()
            cxt.closePath()
            // 恢复
            cxt.restore()
            cxt.restore()
            // cxt.save()
            // cxt.save()
        }
        setInterval(() => {
            renderTimer()
        }, 1000)
    }
    handleScape = () => {
        const canv = document.getElementById("myscapeCanvas")
        const scape = document.querySelector(".bottom")
        const ctx = canv.getContext("2d")
        ctx.fillStyle = "#999"
        ctx.fillRect(0, 0, 176, 80)
        ctx.font = "18px 微软雅黑"
        ctx.fillStyle = "#fff"
        ctx.fillText("刮刮乐", 54, 50)
        console.log(ctx);
        // console.log(scape.offsetLeft);

        // 鼠标移动，清除内容
        let isDraw = false
        canv.onmousedown = function (e) {
            isDraw = true
        }
        canv.onmouseup = function (e) {
            isDraw = false
        }
        canv.onmouseout = function (e) {
            isDraw = false
        }
        canv.onmousemove = function (e) {
            if (isDraw) {
                ctx.beginPath()
                const x = e.offsetX
                const y = e.offsetY
                ctx.fillStyle = "#909"
                ctx.globalCompositeOperation = "destination-out"
                ctx.arc(x, y, 10, 0, 2 * Math.PI)
                ctx.fill()
                ctx.closePath()
                // console.log(e);
            }
        }
    }
    componentDidMount() {
        this.handleClock()
        this.handleScape()
    }
}

export default index;


