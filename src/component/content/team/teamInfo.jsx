import React, {useEffect, useRef, useState} from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../../../constants';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Comment from "./comment";

const TeamInfo = (props) => {
    let params = useParams();
    let pageNumber = params.pageNumber;

    const [infos, setInfos] = useState(null);
    const [comments, setComments] = useState([]);
    const [flag, setFlag] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [isJoin, setIsJoin] = useState(false);
    const textareaRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${URL}/team/per?id=${pageNumber}`);
                const responseData = response.data;
                // console.log(responseData.team);
                if (responseData.team.content === "") {
                    setFlag(2);
                }
                else {
                    setFlag(1);
                }
                setInfos(responseData.team);
            } catch (error) {
                setFlag(2);
                console.log('network err，status code is ' + (error.response && error.response.status));
            }
        };
        fetchData();
        axios.get(`${URL}/comment/per?id=${pageNumber}`)
            .then(response => {
                // console.log(response);
                // window.location.href = "/team";
                setComments(response.data.comments);
                // console.log(response.data.program);
            })
            .catch(error => {
                // 处理请求错误
                console.log(error);
            });

    }, [pageNumber]);

    useEffect (() => {
        axios.get(`${URL}/team/check?id=${pageNumber}&user=${props.username}`)
            .then(response => {
                // console.log(response);
                setIsJoin(response.data.check);
            })
            .catch(error => {
                // 处理请求错误
                console.log(error);
            });

    }, [pageNumber, props.username]);

    const getComment = () => {
        axios.get(`${URL}/comment/per?id=${pageNumber}`)
            .then(response => {
                setComments(response.data.comments);
            })
            .catch(error => {
                // 处理请求错误
                console.log(error);
            });
    }


    const insertTeam = () => {
        let data = new FormData();
        data.append('user', props.username);
        data.append('id', pageNumber);
        setIsJoin(true);
        axios.post(`${URL}/team/add`, data)
            .then(response => {
                const updatedInfos = { ...infos };
                updatedInfos.count = updatedInfos.count + 1;
                setInfos(updatedInfos);
                // setInfos({count: infos.count + 1});
            })
            .catch(error => {
                // 处理请求错误
                setIsJoin(false);
                console.log(error);
            });
    }

    const submit = () => {
        let data = new FormData();
        data.append('user', props.username);
        data.append('content', inputValue);
        data.append('id', pageNumber);
        axios.post(`${URL}/comment/create`, data)
            .then(response => {
                getComment();
                // console.log(response);
                setInputValue('');
            })
            .catch(error => {
                // 处理请求错误
                console.log(error);
            });
    }

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

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
                                    <div className={"border border-primary-subtle"}
                                         style={{width: "100%", minHeight: "200px", backgroundColor: "#ffffff", padding: "10px",
                                             whiteSpace: 'pre-wrap', overflow: "overlay"}}>
                                        <h1>{infos.title}</h1>
                                        <ReactMarkdown
                                            // 使用github-markdown-css样式的话className必须是markdown-body
                                            className='markdown-body'
                                            // 插件及选项，singleTilde: false表示单波浪线也可以作为擦除线
                                            remarkPlugins={[remarkGfm, { singleTilde: false }]}
                                            rehypePlugins={[rehypeRaw]}
                                            components={{
                                                // 代码高亮
                                                code ({ node, inline, className, children, ...props }) {
                                                    const match = /language-(\w+)/.exec(className || '')
                                                    return !inline && match ? (
                                                        <SyntaxHighlighter
                                                            children={String(children).replace(/\n$/, '')}
                                                            style={solarizedlight}
                                                            language={match[1]}
                                                            PreTag="div"
                                                            showLineNumbers={true}
                                                            {...props}
                                                        />
                                                    ) : (
                                                        <code className={className} {...props} children={children} />
                                                    )
                                                }
                                            }}
                                        >{infos.introduction}</ReactMarkdown>
                                    </div>
                                    <div style={{width: "100%", textAlign: "center"}}>
                                        <div style={{display: "inline-block"}}>
                                            当前队伍人数: {infos.count}
                                        </div>
                                            {
                                                isJoin ? (
                                                        <div style={{
                                                            display: "inline-block", backgroundColor: "#a6a6a6", color: "white",
                                                            width: "100px", borderRadius: "4px", height: "40px", lineHeight: "40px", marginBottom: "10px",
                                                            textDecoration: "none", marginLeft: "10px", cursor: "pointer"
                                                        }}>
                                                        <div>已加入</div>
                                                        </div>
                                                ) :(
                                                    <div style={{display: "inline-block", backgroundColor: "#ffbaba", color: "white",
                                                        width: "100px", borderRadius: "4px", height: "40px", lineHeight: "40px", marginBottom: "10px",
                                                        textDecoration: "none", marginLeft: "10px", cursor: "pointer"
                                                    }}>
                                                        <div onClick={() => (insertTeam())}>加入组队</div>
                                                    </div>
                                                )
                                            }
                                    </div>
                                    <div style={{
                                        fontSize: "25px"
                                    }}>
                                        评论
                                    </div>
                                    <div style={{
                                        margin: "0 30px 10px 30px",
                                        // padding: "5px",
                                        display: "flex",
                                    }}>
                                        <textarea style={{
                                            width: "90%",
                                            height: "80px",
                                        }} ref={textareaRef} onChange={handleInputChange} value={inputValue}>

                                        </textarea>
                                        <div style={{
                                            display: "flex",
                                            height: "80px",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            marginLeft: "10px",
                                            backgroundColor: "#00AEEC",
                                            color: "white",
                                            borderRadius: "5px",
                                            width: "100px",
                                            userSelect: "none",
                                            cursor: "pointer",
                                        }} onClick={() => submit()}>
                                            发布
                                        </div>
                                    </div>
                                    {
                                        comments.map((comment) => (
                                            <Comment
                                                key={comment.id}
                                                comment={comment}
                                            />
                                        ))
                                    }

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
                    <Link to={`/team`} style={{display: "inline-block", backgroundColor: "#00B5E5", color: "white",
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

export default TeamInfo;