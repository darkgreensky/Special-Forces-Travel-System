import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../../../constants';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const BlogContent = () => {
    let params = useParams();
    let pageNumber = params.pageNumber;

    const [infos, setInfos] = useState([]);
    const [flag, setFlag] = useState(0);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${URL}/guide/per?id=${pageNumber}`);
                const responseData = response.data;
                // console.log(responseData.guide);
                if (responseData.guide.content === "") {
                    setFlag(2);
                }
                else {
                    setFlag(1);
                }
                setInfos(responseData.guide);
            } catch (error) {
                setFlag(2);
                console.log('network err，status code is ' + (error.response && error.response.status));
            }
        };
        fetchData();
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
                                    <div className={"border border-primary-subtle"}
                                         style={{width: "100%", minHeight: "200px", backgroundColor: "#effaf8", padding: "10px",
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
                                        >{infos.content}</ReactMarkdown>
                                    </div>
                                </div>
                            )
                        }
                        else if (flag === 2) {
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