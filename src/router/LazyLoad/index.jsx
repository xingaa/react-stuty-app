import React, { Component } from 'react';
import LazyLoad from 'react-lazyload';
import { Table, Switch, Space, Icon, Card } from 'antd';
import {
    CaretRightOutlined,
    CaretDownOutlined
} from '@ant-design/icons';
import styles from "./index.module.scss";

class index extends Component {
    state = {
        imgsrc: "https://ss1.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/e1fe9925bc315c6018d230188cb1cb1348547785.jpg",
        imgLoad: "https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3795757253,2048194183&fm=26&gp=0.jpg",
        imgClass: ''
    }

    render() {
        const { imgsrc, imgLoad, imgClass } = this.state

        return (
            <div className={styles.box + " " + "imgwrap"} id="imgbox">
                {
                    imgClass === ".imgwrap" ? (
                        <>
                            < LazyLoad height={200} >

                                {/* 支持开箱即用的懒加载图像，
                                    没有额外的需要配置，设置`height`以获得更好的
                                    体验 */}

                                < img className={styles.imgItem} src={imgsrc} />
                            </LazyLoad>
                            < LazyLoad height={200} >

                                {/* 支持开箱即用的懒加载图像，
                                    没有额外的需要配置，设置`height`以获得更好的
                                    体验 */}

                                < img className={styles.imgItem} src={imgsrc} />
                            </LazyLoad>
                            < LazyLoad height={200} offset={10} scrollContainer={imgClass} placeholder={<img className={styles.imgItem} src={imgLoad} alt="logo" />}>

                                {/* 支持开箱即用的懒加载图像，
                                    没有额外的需要配置，设置`height`以获得更好的
                                    体验 */}

                                < img className={styles.imgItem} src={imgsrc} />
                            </LazyLoad>
                            < LazyLoad height={200} offset={10} scroll={true} scrollContainer={imgClass} placeholder={<img className={styles.imgItem} src={imgLoad} alt="logo" />}>

                                {/* 支持开箱即用的懒加载图像，
                                    没有额外的需要配置，设置`height`以获得更好的
                                    体验 */}

                                < img className={styles.imgItem} src={imgsrc} />
                            </LazyLoad>
                            < LazyLoad height={200} offset={10} scrollContainer={imgClass} placeholder={<img className={styles.imgItem} src={imgLoad} alt="logo" />}>

                                {/* 支持开箱即用的懒加载图像，
                                    没有额外的需要配置，设置`height`以获得更好的
                                    体验 */}

                                < img className={styles.imgItem} src={imgsrc} />
                            </LazyLoad>
                            < LazyLoad height={200} offset={10} scrollContainer={imgClass} placeholder={<img className={styles.imgItem} src={imgLoad} alt="logo" />}>

                                {/* 支持开箱即用的懒加载图像，
                                    没有额外的需要配置，设置`height`以获得更好的
                                    体验 */}

                                < img className={styles.imgItem} src={imgsrc} />
                            </LazyLoad>
                        </>
                    ) : null
                }
            </div>
        );
    }
    componentDidMount() {
        this.setState({
            imgClass: ".imgwrap"
        })
    }
}

export default index;
