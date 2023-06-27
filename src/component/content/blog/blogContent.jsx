import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../../../constants';

const BlogContent = () => {
    let params = useParams();
    let pageNumber = params.pageNumber;

    const [infos, setInfos] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${URL}/ticket/per?id=${pageNumber}`);
                const responseData = response.data;
                console.log(responseData.infor);
                setInfos(responseData.infor);
            } catch (error) {
                console.log('network err，status code is ' + (error.response && error.response.status));
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
                <hr />
                <div style={{width: "100%", textAlign: "center"}}>
                    <Link to={`/blog`} style={{display: "inline-block", backgroundColor: "#00B5E5", color: "white",
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

export default BlogContent;