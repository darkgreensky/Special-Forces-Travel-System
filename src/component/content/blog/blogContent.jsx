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
                <Link to={`/blog`}>
                    <div>返回</div>
                </Link>
            </div>
        </React.Fragment>
    );
}

export default BlogContent;