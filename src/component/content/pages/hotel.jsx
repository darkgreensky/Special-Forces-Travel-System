import React, { Component } from 'react';
// import KEY from '../../../constants';
// import {overrides} from "react-syntax-highlighter/.eslintrc";

class Hotel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null,
            mouseTool: null,
            overlays: null,
            lng: 118.796877,
            lat: 32.060255,
            infos: [],
            flag: false,
            marker: [],
        };
    }

    showInfoClick = (e) => {
        this.setState({
            lng: e.lnglat.getLng(),
            lat: e.lnglat.getLat(),
        });
    };

    componentDidMount() {
        let AMap = window.AMap;
        this.map = new AMap.Map('amap', {
            zoom: 11,
            center: [118.796877, 32.060255],
            viewMode: '2D',
            zooms: [4, 18],
        });

        this.map.on('click', this.showInfoClick);
        this.setState({ map: this.map});

    }

    handleChangeLat = (event) => {
        this.setState({ lng: event.target.value });
    }

    handleChangeLng = (event) => {
        this.setState({ lat: event.target.value });
    }

    searchHotel = (lng, lat) => {
        let AMap = window.AMap;
        let map = this.state.map;
        map.clearMap();
        AMap.plugin(["AMap.PlaceSearch"], () => {
            //构造地点查询类
            let placeSearch = new AMap.PlaceSearch({
                // type: '餐饮服务', // 兴趣点类别
                pageSize: 50, // 单页显示结果条数
                pageIndex: 1, // 页码
                city: "025", // 兴趣点城市
                citylimit: true,  //是否强制限制在设置的城市内搜索
                map: map, // 展现结果的地图实例
                // panel: "panel", // 结果列表将在此容器中进行展示。
                autoFitView: true, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
                // renderStyle: "default",
            });
            let cpoint = [lng, lat]; //中心点坐标
            placeSearch.searchNearBy('宾馆', cpoint, 1500, (status, result) => {
                // console.log(result);
                // console.log(result.hasOwnProperty('poiList'));
                if (result.hasOwnProperty('poiList')) {
                    let res = result.poiList.pois;
                    let updatedRes = res.map((item, index) => {
                        // 在这里可以对每个类对象添加新的键值对
                        return {
                            ...item,
                            price: Math.floor(Math.random() * (300 - 30) + 30),
                            key: index + 1,
                        };
                    });
                    let pois = result.poiList.pois;
                    for (let i = 0; i < pois.length; i++) {
                        let poi = pois[i];
                        let marker = this.state.marker;
                        marker = [];
                        marker[i] = new AMap.Marker({
                            // icon: `//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-${i}.png`,
                            position: poi.location,   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                            title: poi.name
                        });
                        // 将创建的点标记添加到已有的地图实例：
                        map.add(marker[i]);
                        map.setFitView();
                        this.setState({infos: updatedRes, flag: true, marker: marker});
                    }
                }
                else {
                    this.setState({infos: [], flag: true});
                }
                // console.log(result);
            });
        })
    }

    defaultSort = () => {
        // console.log("默认排序");
        let infos = this.state.infos;
        infos.sort((a, b) => a.key - b.key);
        this.setState({infos});
    }

    cheapSort = () => {
        // console.log("价格最低");
        let infos = this.state.infos;
        infos.sort((a, b) => a.price - b.price);
        this.setState({infos});
    }

    render() {
        return (
            <React.Fragment>
                <div id = "amap" style={{width: "100%", height: "100%"}}/>
                <div style={{position: "absolute", left: "0", top: "0", overflow: "auto", height: "600px"}}>
                    {/*<div id = "panel" style={{width: "300px"}}/>*/}
                    <div style={{overflow: "auto", backgroundColor: "white", width: "350px"}}>
                        {
                            this.state.flag ? (
                            this.state.infos.length > 0 ? (
                                <div>
                                    <div className="btn-group" role="group" aria-label="Basic example" style={{zIndex: 100}}>
                                        <button type="button" className="btn btn-primary" onClick={() => this.defaultSort()}>默认排序</button>
                                        <button type="button" className="btn btn-primary" onClick={() => this.cheapSort()}>价格最低</button>
                                    </div>
                                    {this.state.infos.map(info => (
                                        <div key={info.key} style={{
                                            borderBottom: "1px solid #eaeaea",
                                            padding: "5px 0 5px 10px",
                                            position: "relative",
                                            minHeight: "35px",
                                            overflow: "hidden",
                                        }}>
                                            <div style={{
                                                position: "absolute"
                                            }}>
                                                {info.key}
                                            </div>
                                            <div style={{
                                                position: "relative",
                                                marginLeft: "30px",
                                                // left: "30px",
                                            }}>
                                                <div className={"poi-img"} style={{
                                                    // backgroundImage: `url(${info.photos.url})`,
                                                    width: "90px",
                                                    height: "56px",
                                                    float: "right",
                                                }}>
                                                    {info.photos && info.photos.length > 0 && (
                                                        <img
                                                            style={{
                                                                width: "100%",
                                                                height: "100%",
                                                            }}
                                                            src={info.photos[0].url}
                                                            alt=""
                                                        />
                                                    )}
                                                </div>
                                                <div className={"poi-title"}>
                                                    {info.name}
                                                </div>
                                                <div className={"poi-info"} style={{
                                                    wordBreak: "break-all",
                                                    color: "#999",
                                                    lineHeight: "20px",
                                                    fontSize: "14px",
                                                }}>
                                                    <p style={{margin: "0"}}>
                                                        地址:
                                                        {info.address}
                                                    </p>
                                                    <p style={{margin: "0"}}>
                                                        电话:
                                                        {info.tel}
                                                    </p>
                                                    <p style={{margin: "0", color: "red"}}>
                                                        价格:
                                                        {info.price}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div>没有找到相关信息</div>
                            )) : (<div />)
                        }
                    </div>
                </div>
                <div style={{position: "absolute", right: '0', top: '0', opacity: 0.7}}>
                    <div className="input-group mb-3">
                        <span className="input-group-text">经度</span>
                        <input type="text" className="form-control" placeholder="" aria-label="start"
                               value={this.state.lng} onChange={this.handleChangeLat}/>
                        <span className="input-group-text">纬度</span>
                        <input type="text" className="form-control" placeholder="" aria-label="end"
                               value={this.state.lat} onChange={this.handleChangeLng}/>
                        <button className="btn btn-success" type="button" onClick={() => this.searchHotel(this.state.lng, this.state.lat)}>查询</button>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

export default Hotel;