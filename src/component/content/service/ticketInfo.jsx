import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../../../constants';

const TicketInfo = () => {
    let params = useParams();
    let pageNumber = params.pageNumber;


    const [infos, setInfos] = useState([]);
    const [map, setMap] = useState(null);
    const [pos, setPos] = useState([116.406315, 39.908775]);

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

        initializeMap();
    }, []);


    useEffect(() => {
        if (map) {
            map.setCenter(pos);
            let marker = new window.AMap.Marker({
                icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
                position: pos,
                offset: new window.AMap.Pixel(-13, -34)
            });
            marker.setMap(map);
        }
    }, [map, pos]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${URL}/ticket/per?id=${pageNumber}`);
                const responseData = response.data;
                console.log(responseData.infor);
                setInfos(responseData.infor);
                setPos([responseData.infor.lng, responseData.infor.lat]);
            } catch (error) {
                console.log('network err，status code is ' + (error.response && error.response.status));
                setPos([118.796877, 32.060255]);
            }
        };
        fetchData();
    }, []);

    return (
        <React.Fragment>
            <div className="container" style={{
                borderStyle: "groove",
                borderRadius: "5px",
            }}>
                <h1>{infos.title}</h1>
                <div className={"map"} style={{width: "500px", height: "500px", backgroundColor: "red"}}>
                    <div id="amap" style={{width: "100%", height: "100%"}}/>
                </div>
                <div style={{height: "500px", width: "500px", boxSizing: "border-box", padding: "10px"}}>
                    <img src={infos.image} alt="" style={{width: "100%", height: "100%"}}/>
                </div>
                <div>
                    {infos.introduction}
                </div>
                <div>
                    {infos.open_time}
                </div>
                <div>
                    {infos.price}
                </div>
            <hr />
                <Link to={`/service`}>
                    <div>返回</div>
                </Link>
            </div>
        </React.Fragment>
    );
}

export default TicketInfo;