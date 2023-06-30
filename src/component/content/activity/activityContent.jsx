import React, {useEffect, useState} from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../../../constants';
import ReactMarkdown from 'react-markdown';

const ActivityContent = (props) => {
    let params = useParams();
    let pageNumber = params.pageNumber;

    const [infos, setInfos] = useState(null);
    const [flag, setFlag] = useState(0);

    useEffect(() => {
        axios.get(`${URL}/program/per?id=${pageNumber}`)
            .then(response => {
                // console.log(response);
                if (response.data.program.content === "") {
                    setFlag(2);
                }
                else {
                    setFlag(1);
                }
                setInfos(response.data.program);
            })
            .catch(error => {
                // 处理请求错误
                console.log(error);
            });

        // const fetchData = async () => {
        //     try {
        //         const response = await axios.get(`${URL}/program/per?id=${pageNumber}`);
        //         const responseData = response.data;
        //         if (responseData.team.content === "") {
        //             setFlag(2);
        //         }
        //         else {
        //             setFlag(1);
        //         }
        //         setInfos(responseData.team);
        //     } catch (error) {
        //         setFlag(2);
        //         console.log('network err，status code is ' + (error.response && error.response.status));
        //     }
        // };
        // fetchData();

    }, [pageNumber]);

    return (
        <React.Fragment>
            <div className="container" style={{
                borderStyle: "groove",
                borderRadius: "5px",
            }}>
                {
                    (() => {
                        if (flag === 0) {
                            return (<div />)
                        }
                        else if (flag === 1) {
                            return (
                                <div>
                                    <div style={{
                                        fontSize: "40px",
                                        fontWeight: "bolder",
                                    }}>
                                        {infos.title}
                                    </div>
                                    <ReactMarkdown>
                                        {infos.content}
                                    </ReactMarkdown>
                                </div>
                            )
                        }
                        else if (flag === 2) {
                            // setFlag(1);
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
                    <Link to={`/activity`} style={{display: "inline-block", backgroundColor: "#00B5E5", color: "white",
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

export default ActivityContent;