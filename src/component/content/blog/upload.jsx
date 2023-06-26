import React, { useState, useRef } from 'react';
import '../../../styles/upload.css'
import ReactMarkdown from 'react-markdown';

import remarkGfm from 'remark-gfm'
// 解析标签，支持html语法
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';


const Upload = () => {
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [titleValue, setTitleValue] = useState('');
    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);

    const editMode = () => {
        setIsPreviewMode(false);
    };

    const previewMode = () => {
        setIsPreviewMode(true);
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleTitleChange = (event) => {
        setTitleValue(event.target.value);
    };

    const addBold = () => {
        const textarea = textareaRef.current;
        const startPos = textarea.selectionStart;
        const endPos = textarea.selectionEnd;
        const currentValue = textarea.value;

        const newValue = `${currentValue.substring(0, startPos)}**${currentValue.substring(
            startPos,
            endPos
        )}**${currentValue.substring(endPos)}`;

        setInputValue(newValue);
        // 设置光标位置
        textarea.selectionStart = startPos + 2;
        textarea.selectionEnd = endPos + 2;
        textarea.focus();
    };

    const addItalic = () => {
        const textarea = textareaRef.current;
        const startPos = textarea.selectionStart;
        const endPos = textarea.selectionEnd;
        const currentValue = textarea.value;

        const newValue = `${currentValue.substring(0, startPos)}_${currentValue.substring(
            startPos,
            endPos
        )}_${currentValue.substring(endPos)}`;

        setInputValue(newValue);
        // 设置光标位置
        textarea.selectionStart = startPos + 2;
        textarea.selectionEnd = endPos + 2;
        textarea.focus();
    };

    const addImage = () => {
        const textarea = textareaRef.current;
        const startPos = textarea.selectionStart;
        const endPos = textarea.selectionEnd;
        const currentValue = textarea.value;

        const newValue = `${currentValue.substring(0, startPos)}![${currentValue.substring(
            startPos,
            endPos
        )}](https://)${currentValue.substring(endPos)}`;

        setInputValue(newValue);
        // 设置光标位置
        textarea.selectionStart = startPos + 2;
        textarea.selectionEnd = endPos + 2;
        textarea.focus();
    };

    const uploadImage = () => {
        fileInputRef.current.click();
        const textarea = textareaRef.current;
        const startPos = textarea.selectionStart;
        const endPos = textarea.selectionEnd;
        const currentValue = textarea.value;

        const newValue = `${currentValue.substring(0, startPos)}![${currentValue.substring(
            startPos,
            endPos
        )}](https://)${currentValue.substring(endPos)}`;

        setInputValue(newValue);
        // 设置光标位置
        textarea.selectionStart = startPos + 2;
        textarea.selectionEnd = endPos + 2;
        textarea.focus();
    };

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        // 处理选中的文件
        console.log(file);
    };

    const submit = () => {
        console.log(titleValue);
        console.log(inputValue);
    }

    return (
        <div className={"container"} style={{marginTop: "30px"}}>
            <div className={"input-group"} style={{position: "relative", margin: "10px"}}>
                <input type="text" className="form-control"
                       aria-label="Dollar amount (with dot and two decimal places)"
                        value={titleValue}
                       onChange={handleTitleChange}
                />
                <span className="input-group-text">标题</span>
            </div>
            <div style={{position: "relative", marginBottom: "1px"}}>
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-primary" onClick={editMode}>编辑</button>
                    <button type="button" className="btn btn-primary" onClick={previewMode}>预览</button>
                </div>
                <div className="btn-group" role="group" aria-label="Basic example" style={{position: "absolute", right: "0"}}>
                    <button type="button" className="btn btn-light" onClick={addBold} title={"加粗"}>B</button>
                    <button type="button" className="btn btn-light" onClick={addItalic}
                            style={{fontFamily: "monospace", fontStyle: "italic"}} title={"斜体"}>I</button>
                    <button type="button" className="btn btn-light" onClick={addImage} title={"插入图片链接"}><i className="bi bi-image"></i></button>
                    <button type="button" className="btn btn-light" onClick={uploadImage} title={"上传图片"}><i className="bi bi-cloud-arrow-up" />
                    </button>
                    <input type="file" accept="image/*" placeholder="" ref={fileInputRef} style={{display: "none"}} onChange={handleFileInputChange}/>
                </div>
            </div>
            {isPreviewMode ? (
                <div>
                    <div className={"border border-primary-subtle"}
                         style={{width: "100%", minHeight: "200px", backgroundColor: "#f6f0e5", padding: "10px", whiteSpace: 'pre-wrap'}}>
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
                        >{inputValue}</ReactMarkdown>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="textarea-container">
                        <div className="line-number-container">
                            {inputValue.split('\n').map((_, index) => (
                                <div key={index + 1}>{index + 1}</div>
                            ))}
                        </div>
                        <textarea
                            ref={textareaRef}
                            className="editable-textarea"
                            onChange={handleInputChange}
                            value={inputValue}
                        ></textarea>
                    </div>
                </div>
            )}
            <button type="button" className="btn btn-success" onClick={submit}>提交</button>
        </div>
    );
};

export default Upload;