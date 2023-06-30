import React, { Component } from 'react';

class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <React.Fragment>
                {/*<div id = "amap" style={{width: "100%", height: "100%"}}/>*/}
                <div style={{height: "390%"}}>
                    <iframe title={"weather"} style={{height: "100%" ,width: "100%", top: "-50px", position: "relative"}} src={"https://weathernew.pae.baidu.com/weathernew/pc?query=%E6%B1%9F%E8%8B%8F%E5%8D%97%E4%BA%AC%E5%A4%A9%E6%B0%94&srcid=4982&forecast=long_day_forecast"} />
                </div>
            </React.Fragment>
        );
    }

}

export default Weather;