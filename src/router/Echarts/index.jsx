import React, { Component } from 'react';
import { Table, Switch, Space, Icon, Card } from 'antd';
import * as echarts from 'echarts'
import "echarts-gl";
import "echarts/map/js/china"
import {
    CaretRightOutlined,
    CaretDownOutlined
} from '@ant-design/icons';
import styles from "./index.module.scss";
import scatter from "./Options/scatterOption"
import EffectScatter from "./Options/EffectScatter"
import Radar from "./Options/Radar"
import Candlestick from "./Options/Candlestick"
import Bard from "./Options/Bard"
import GeoEffect from "./Options/GeoEffect"
import Bars from "./Options/Bars"
import Pie from "./Options/Pie"
import BarScatter from "./Options/BarScatter"
import Line from "./Options/Line"


const scatterOption = scatter()
const EffectScatterOption = EffectScatter()
const RadarOption = Radar()
const CandlestickOption = Candlestick()
const BardOption = Bard()
const GeoEffectOption = GeoEffect()
const BarsOption = Bars()
const PieOption = Pie()
const BarScatterOption = BarScatter()
const LineOption = Line()

class index extends Component {
    state = {

    }

    render() {

        // const { } = this.state
        return (
            <div className={styles.box + " barStyle"}>
                <div className={styles.echartsItem} id="echarts"></div>
                <div className={styles.echartsItem} id="barScatter"></div>
                <div className={styles.echartsItem} id="line"></div>
                <div className={styles.echartsItem} id="echartsPie"></div>
                <div className={styles.echartsItem} id="scatter"></div>
                <div className={styles.echartsItem} id="radar"></div>
                <div className={styles.echartsItem} id="effectScatter"></div>
                <div className={styles.echartsItem} id="candlestick"></div>
                <div className={styles.echartsItem} id="bard"></div>
                <div className={styles.echartsItem} id="geoEffect"></div>
            </div>
        );
    }
    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echarts'));
        myChart.setOption(BarsOption);
        // 饼图
        var myPie = echarts.init(document.getElementById('echartsPie'));
        myPie.setOption(PieOption)
        // 散点气泡图
        var myScatter = echarts.init(document.getElementById('scatter'));
        myScatter.setOption(scatterOption)
        // 特效气泡图
        var effectScatter = echarts.init(document.getElementById('effectScatter'));
        effectScatter.setOption(EffectScatterOption)
        // 基础雷达图
        var radar = echarts.init(document.getElementById('radar'));
        radar.setOption(RadarOption)
        // K线图
        var candlestick = echarts.init(document.getElementById('candlestick'));
        candlestick.setOption(CandlestickOption)
        // 3D柱状图
        var bard = echarts.init(document.getElementById('bard'));
        bard.setOption(BardOption)
        // 地图散点
        var geoEffect = echarts.init(document.getElementById('geoEffect'));
        geoEffect.setOption(GeoEffectOption)
        // 柱形图搭配散点图
        var barScatter = echarts.init(document.getElementById('barScatter'));
        barScatter.setOption(BarScatterOption)
        // 渐变折线图
        var line = echarts.init(document.getElementById('line'));
        line.setOption(LineOption)
    }
}

export default index;
