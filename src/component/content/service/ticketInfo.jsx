import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../../../constants';

const TicketInfo = (props) => {
    let params = useParams();
    let pageNumber = params.pageNumber;

    const [infos, setInfos] = useState({});
    const [map, setMap] = useState(null);
    const [pos, setPos] = useState([116.406315, 39.908775]);
    const [flag, setFlag] = useState(0);

    useEffect(() => {
        const initializeMap = () => {
            const mapInstance = new window.AMap.Map('amap', {
                zoom: 13,
                center: [118.796877, 32.060255],
                viewMode: '3D',
                zooms: [11, 18],
            });
            setMap(mapInstance);
        };

        if (flag === 1)
            initializeMap();
    }, [flag]);


    useEffect(() => {
        // console.log("map");
        if (map) {
            map.setCenter(pos);
            let marker = new window.AMap.Marker({
                icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
                position: pos,
                offset: new window.AMap.Pixel(-26.5, -68)
            });
            marker.setMap(map);
        }
    }, [map, pos]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${URL}/ticket/per?id=${pageNumber}`);
                const responseData = response.data;
                if (responseData.infor.content === "") {
                    setFlag(2);
                }
                else {
                    setInfos(responseData.infor);
                    setPos([responseData.infor.lng, responseData.infor.lat]);
                    setFlag(1);
                }
                // console.log(responseData.infor);
            } catch (error) {
                setFlag(2);
                console.log('network err，status code is ' + (error.response && error.response.status));
                setPos([118.796877, 32.060255]);
            }
        };
        // console.log("run");
        fetchData();
    }, [pageNumber]);

    const purchase = message => {
        if (props.is_login === false) {
            window.location.href = "/login";
            return;
        }
        let data = new FormData();
        data.append('user', props.username);
        data.append('id', pageNumber);
        axios.post(`${URL}/ticket/buy`, data)
        .then(response => {
            // console.log(response);
            if (response.data.result === 'success') {
                alert(`购票成功\n花费了: ${response.data.cost}\n余额: ${response.data.money}`);
            }
            else {
                alert("购票失败,余额不足!");
            }
        })
        .catch(error => {
            // 处理请求错误
            alert(error);
            console.log(error);
        });
    }

    return (
        <React.Fragment>
            <div className="container" style={{
                borderStyle: "groove",
                borderRadius: "5px",
            }}>
                {
                    (() => {
                        if (flag === 0) {
                            return (<div />);
                        }
                        else if (flag === 1) {
                            return (
                                <React.Fragment>
                                    <div style={{position: "relative", width: "100%", magin: "10px", backgroundColor: "white", height: "400px"}}>
                                        <div style={{display: "inline-block", width: "60%"}}>
                                            <div style={{height: "400px", width: "100%", boxSizing: "border-box", padding: "10px"}}>
                                                <img src={infos.image} alt="" style={{width: "100%", height: "100%"}}/>
                                            </div>
                                        </div>
                                        <div style={{display: "inline-block", height: "100%", width: "40%", position: "absolute", right: "0px", top: "0px"}}>
                                            <div style={{margin: "10px", fontSize: "50px", color: "#1295AD"}}>
                                                {infos.title}
                                            </div>
                                            <div style={{
                                                color: "#84b086",
                                                fontSize: "large",
                                                margin: "10px",
                                            }}>开放日期</div>
                                            <div style={{
                                                margin: "10px",
                                            }}>
                                                <div>
                                                    {infos.open_time.split("；")[0]}
                                                </div>
                                                <div>
                                                    {infos.open_time.split("；")[1]}
                                                </div>
                                                <div>
                                                    {infos.open_time.split("；")[2]}
                                                </div>
                                            </div>
                                            <div style={{margin: "10px", fontSize: "20px", color: "#e8498a"}}>
                                                票价:
                                                {infos.price}
                                            </div>
                                            <button type="button" className="btn btn-danger" onClick={purchase} style={{margin: "10px"}}>购买</button>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="btn-group" role="group" aria-label="Basic example">
                                        <button type="button" className="btn btn-light">
                                            <a href={"#ticketInfo-introduce"}>相关介绍</a>
                                        </button>
                                        <button type="button" className="btn btn-light">
                                            <a href={"#ticketInfo-map"}>地理位置</a>
                                        </button>
                                    </div>
                                    <hr/>
                                    <div id={"ticketInfo-introduce"}>
                                        {infos.introduction}
                                    </div>
                                    <hr/>
                                    <div id={"ticketInfo-map"} style={{width: "100%", textAlign: "center", fontSize: "30px"}}>
                                        地图与交通
                                    </div>
                                    <div className={"map"} style={{width: "100%", height: "500px", backgroundColor: "white", padding: "0 60px", boxSizing: "border-box", position: "relative"}}>
                                        <div id="amap" style={{width: "100%", height: "100%"}}/>
                                    </div>
                                </React.Fragment>
                            );
                        }
                        else if (flag === 2) {
                            // console.log("flag");
                            return (
                                <div style={{width: "100%", textAlign: "center"}}>
                                    <img src={"https://static.hdslb.com/error/very_sorry.png"} alt={""} />
                                </div>
                            );
                        }
                    })()
                }

            <hr />
                <div style={{width: "100%", textAlign: "center"}}>
                    <Link to={`/service`} style={{display: "inline-block", backgroundColor: "#00B5E5", color: "white",
                        width: "100px", borderRadius: "4px", height: "40px", lineHeight: "40px", marginBottom: "10px",
                        textDecoration: "none"
                    }}>
                        <div>返回上一页</div>
                    </Link>
                </div>
            </div>
        </React.Fragment>
    );
}

export default TicketInfo;