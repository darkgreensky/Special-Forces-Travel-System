import React, { Component } from 'react';

class Traffic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null,
            traffic: null,
        };
    }

    componentDidMount() {
        let BMap = window.BMap;
        this.map = new BMap.Map('map');
        this.map.setMinZoom(10);
        this.map.setMaxZoom(20);
        this.map.centerAndZoom('南京市', 12);
        this.map.enableScrollWheelZoom(true);
        // console.log(this.map);
        this.traffic = new BMap.TrafficLayer();        // 创建交通流量图层实例
        this.map.addTileLayer(this.traffic);
        this.setState({ map: this.map, traffic: this.traffic});
    }

    render() {
        return (
            <React.Fragment>
                <div id="allmap" style={{overflow: "hidden", zoom: "1", position: "relative", height: "100%"}}>
                    <div id="map" style={{height: "100%", transition: "all 0.5s ease-in-out"}}>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Traffic;