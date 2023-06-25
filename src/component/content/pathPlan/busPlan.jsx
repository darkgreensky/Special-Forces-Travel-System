import React, { Component } from 'react';
import earth from '../../../images/earth.png';
import mapimg from '../../../images/map.png';

class BusPlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null,
            defaultLayer: null,
            satelliteLayer: null,
            driving: null,
            start: '',
            end: '',
        };
    }

    handleChangeStart = (event) => {
        this.setState({ start: event.target.value });
    }
    handleChangeEnd = (event) => {
        this.setState({ end: event.target.value });
    }

    componentDidMount() {
        let AMap = window.AMap;
        let defaultLayer = new AMap.TileLayer(); //高德默认标准图层
        this.map = new AMap.Map('amap', {
            zoom:11,//级别
            center: [118.796877, 32.060255],//中心点坐标
            viewMode:'3D',//使用3D视图
            layers: [//使用多个图层
                defaultLayer
            ],
            zooms: [4,18],//设置地图级别范围
        });
        this.setState({ map: this.map, defaultLayer: defaultLayer });

        // 是否固定显示
        // this.map.setLimitBounds(this.map.getBounds());

        this.driving = new AMap.Transfer({
            map: this.map,
            city: '南京市',
            // panel: 'panel',
            policy: AMap.TransferPolicy.LEAST_TIME //乘车策略
        });
    }

    searchPath = (start, end) => {
        // console.log("search" + start + end);
        if (!(/^\s*$/.test(start)) && !(/^\s*$/.test(end)))
        {
            // 根据起终点名称规划驾车导航路线
            this.driving.search([
                {keyword: start,city:'南京'},
                {keyword: end  ,city:'南京'}
            ], function(status, result) {
                // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
                if (status === 'complete') {
                    console.log('绘制公交路线完成')
                } else {
                    console.log('获取公交数据失败：' + result)
                }
            });
        }
    }

    switchTypeStyle = {
        position: "absolute",
        right: "10px",
        bottom: "10px",
        cursor: "pointer",
        width: "50px",
        height: "50px",
        backgroundSize: "contain", // 添加 backgroundSize 属性
        backgroundRepeat: "no-repeat", // 可选：禁止背景图像重复
        color: "white",
        fontSize: "10px",
        border: "1px solid black", // 添加边框样式
    }

    textStyle = {
        position: "absolute",
        backgroundColor: "#3385FF",
        margin: "0",
        bottom: "0",
        right: "0",
    };

    render() {
        let { map, satelliteLayer, defaultLayer } = this.state;
        const switchSatelliteLayer = () => {
            if (map) {
                if (!satelliteLayer)
                {
                    satelliteLayer = new window.AMap.TileLayer.Satellite();
                    this.setState({ satelliteLayer });
                }
                map.setLayers([satelliteLayer]);
            }
        };
        const switchMapLayer = () => {
            if (map) {
                if (!defaultLayer)
                {
                    defaultLayer = new window.AMap.TileLayer()//高德默认标准图层
                    this.setState({ defaultLayer });
                }
                map.setLayers([defaultLayer]);
            }
        };
        return (
            <React.Fragment>
                <div id = "amap" style={{width: "100%", height: "100%"}}></div>
                <div onClick={switchMapLayer} style={{...this.switchTypeStyle, backgroundImage: `url(${mapimg})`, right: "70px"}}>
                    <p style={this.textStyle}>地图</p>
                </div>
                <div onClick={switchSatelliteLayer} style={{...this.switchTypeStyle, backgroundImage: `url(${earth})`}}>
                    <p style={this.textStyle}>地球</p>
                </div>
                <div style={{position: "absolute", right: '0', top: '0', opacity: 0.7}}>
                    <div className="input-group mb-3">
                        <span className="input-group-text">起点</span>
                        <input type="text" className="form-control" placeholder="start" aria-label="start"
                               value={this.state.start} onChange={this.handleChangeStart}/>
                        <span className="input-group-text">终点</span>
                        <input type="text" className="form-control" placeholder="end" aria-label="end"
                                value={this.state.end} onChange={this.handleChangeEnd}/>
                        <button className="btn btn-success" type="button" onClick={() => this.searchPath(this.state.start, this.state.end)}>查询</button>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}
 
export default BusPlan;