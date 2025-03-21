import React, { Component } from 'react';
import BlogCard from './blogCard';
import $ from 'jquery';
import {Link} from "react-router-dom";
import { URL } from '../../../constants';

const cardBoxStyle = {
    display: "flex",
    flexWrap: "wrap",
    padding: "10px 50px",
}

class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [
                // {id: 1, title: "夫子庙秦淮河", author: "darkgreen", time: "2023/6/26", quantity: 12},
                // {id: 2, title: "夫子庙秦淮河", author: "darkgreen", time: "2023/6/26", quantity: 12},
                // {id: 3, title: "夫子庙秦淮河", author: "darkgreen", time: "2023/6/26", quantity: 12},
                // {id: 4, title: "夫子庙秦淮河", author: "darkgreen", time: "2023/6/26", quantity: 12},
                // {id: 5, title: "夫子庙秦淮河", author: "darkgreen", time: "2023/6/26", quantity: 12},
            ]
        };
    }

    componentDidMount() {
        $.ajax({
            url: `${URL}/guide/all`,
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

    render() {

        return (
            <React.Fragment>
                <div style={{width: "100%", position: "relative", height: "60px"}}>
                <div style={{width: "200px", height: "60px", backgroundColor: "lightblue", right: "70px", position: "absolute", borderRadius: "30px"}}>
                    <Link to={"/blog/upload"} style={{display: "block", height: "100%", lineHeight: "60px", textAlign: "center", textDecoration: "auto"}}>发帖</Link>
                </div>
                </div>
                <div className="container text-center">
                    <div className="row">
                        <div className="col-6">
                            标题
                        </div>
                        <div className="col-2">
                            作者
                        </div>
                        <div className="col-2">
                            时间
                        </div>
                        <div className="col-2">
                            阅读
                        </div>
                    </div>
                </div>
                <div style={cardBoxStyle}>
                    {this.state.cards.map((card, index) => (
                        <BlogCard
                            key={card.id}
                            index={index}
                            card={card}
                        />
                    ))}
                </div>
            </React.Fragment>
        );
    }
}

export default Blog;
