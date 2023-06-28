import React, { Component } from 'react';
import $ from 'jquery';
import {Link} from "react-router-dom";
import { URL } from '../../../constants';
import {connect} from "react-redux";
import axios from "axios";

const cardBoxStyle = {
    display: "flex",
    flexWrap: "wrap",
    padding: "10px 50px",
    borderCollapse: "collapse",
}

class ManageArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [
            ]
        };
    }

    componentDidMount() {
        $.ajax({
            url: `${URL}/guide/personal?author=${this.props.username}`,
            type: 'GET',
            dataType: 'json',
            success: (responseData) => {
                // 请求成功
                // console.log(responseData);
                this.setState({
                    cards: responseData.guide
                });
            },
            error: (xhr, status, error) => {
                // 请求失败
                console.log('network err，status code is ' + xhr.status);
            }
        });
    }

    deleteBlog = (id) => {
        let data = new FormData();
        data.append('id', id);
        axios.post(`${URL}/guide/delete`, data)
            .then(response => {
                // console.log(response);
                let cards = this.state.cards.filter(card => card.id !== id);
                this.setState({
                    cards
                });
                // window.location.href = "/blog";
            })
            .catch(error => {
                // 处理请求错误
                console.log(error);
            });
    }

    render() {

        return (
            <React.Fragment>
                <div style={{width: "100%", position: "relative", height: "70px"}}>
                    <div style={{width: "200px", height: "70px", backgroundColor: "lightblue", right: "70px", position: "absolute", borderRadius: "30px"}}>
                        <Link to={"/blog/upload"} style={{display: "block", height: "100%", lineHeight: "70px", textAlign: "center", textDecoration: "auto"}}>发帖</Link>
                    </div>
                </div>
                <div style={cardBoxStyle}>
                    {
                        this.state.cards.length >= 1 ? (
                            this.state.cards.map(card => (
                                    <div style={{
                                        backgroundColor: "#fef5ff",
                                        width: "100%",
                                        height: "80px",
                                        position: "relative",
                                        border: "1px solid black",
                                    }} key={card.id}>
                                        <div style={{
                                            fontSize: "30px",
                                            position: "absolute",
                                            width: "70%",
                                        }}>
                                            <Link to={`/blog/content/${card.id}`} className={"blog-card-line-link"}>{card.title}</Link>
                                        </div>
                                        <div style={{
                                            position: "absolute",
                                            bottom: "0px",
                                        }}>
                                            阅读量: {card.quantity}
                                        </div>
                                        <div style={{
                                            position: "absolute",
                                            right: "10px",
                                            width: "70px",
                                            height: "40px",
                                            textAlign: "center",
                                            top: "20px",
                                            lineHeight: "40px",
                                            cursor: "pointer",
                                            backgroundColor: "#FC1944",
                                            borderRadius: "3px",
                                            color: "white",
                                        }}>
                                            <div onClick={() => this.deleteBlog(card.id)}>删除</div>
                                        </div>
                                    </div>
                                ))
                        ) : (
                            <div>您还没有发布文章，快去发布吧</div>
                        )
                    }

                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        is_login: state.is_login,
        username: state.username,
    }
}

export default connect(mapStateToProps)(ManageArticle);
