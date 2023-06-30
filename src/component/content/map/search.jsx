// import React, { Component } from 'react';
//
// class Search extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             map: null,
//             local: null,
//         };
//     }
//
//
//     componentDidMount() {
//         // let BMap = window.BMap;
//         // this.map = new BMap.Map('map');
//         // this.map.setMinZoom(10);
//         // this.map.setMaxZoom(20);
//         // this.map.enableScrollWheelZoom(true);
//         let map = new window.BMapGL.Map("map");
//         map.enableScrollWheelZoom();
//         map.centerAndZoom('南京市', 12);
//         let local = new window.BMapGL.LocalSearch(map, {
//             renderOptions: {map: map}
//         });
//         this.setState({ map: this.map, local: local});
//     }
//
//     handleChange = (event) => {
//         this.setState({ content: event.target.value });
//     }
//
//     searchPath = () => {
//         this.state.local.search(this.state.content);
//     }
//
//     render() {
//         return (
//             <React.Fragment>
//                 <div id="allmap" style={{ overflow: "hidden", zoom: "1", position: "relative", height: "100%", width: "100%"}}>
//                     <div id="map"
//                          style={{
//                              height: "100%",
//                              width: "100%",
//                          }}
//                     >
//                     </div>
//                     <div style={{position: "absolute", left: '0', top: '0', opacity: 0.7, zIndex: 10}}>
//                         <div className="input-group mb-3">
//                             <input type="text" className="form-control"
//                                    value={this.state.content} onChange={this.handleChange}/>
//                             <button className="btn btn-success" type="button" onClick={() => this.searchPath(this.state.content)}>查找</button>
//                         </div>
//                     </div>
//                 </div>
//             </React.Fragment>
//         );
//     }
// }
//
// export default Search;

import React, { Component } from 'react';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null,
            local: null,
            content: "",
        };
    }

    componentDidMount() {
        let map = new window.BMapGL.Map("map");
        map.enableScrollWheelZoom();
        map.centerAndZoom('南京市', 12);
        let local = new window.BMapGL.LocalSearch(map, {
            renderOptions: { map: map },
        });
        this.setState({ map: map, local: local });
    }

    handleChange = (event) => {
        this.setState({ content: event.target.value });
    };

    searchPath = () => {
        this.state.local.search(this.state.content);
        this.setState({ content: "" });
    };

    render() {
        return (
            <React.Fragment>
                <div
                    id="map"
                    style={{
                        height: "100vh",
                        width: "100%",
                    }}
                ></div>
                <div
                    style={{
                        position: "absolute",
                        left: "0",
                        top: "0",
                        opacity: 0.7,
                        zIndex: 10,
                    }}
                >
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.content}
                            onChange={this.handleChange}
                        />
                        <button
                            className="btn btn-success"
                            type="button"
                            onClick={this.searchPath}
                        >
                            查找
                        </button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Search;
