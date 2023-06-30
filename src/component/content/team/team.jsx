import React, { Component } from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import {URL} from "../../../constants";

class Team extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [
            ]
        };
    }

    componentDidMount() {
        axios.get(`${URL}/team/all`)
            .then(response => {
                this.setState({
                    cards: response.data.team
                });
            })
            .catch(error => {
                // 处理请求错误
                console.log(error);
            });
    }

    render() {
        // console.log(this.state.cards);
        return (
            <React.Fragment>
                <div className={"container"}>
                    <div style={{width: "100%", position: "relative", height: "70px"}}>
                        <div style={{width: "200px", height: "70px", backgroundColor: "#f692f6", right: "70px", position: "absolute", borderRadius: "30px"}}>
                            <Link to={"/team/create"} style={{display: "block", height: "100%", lineHeight: "70px", textAlign: "center", textDecoration: "auto", color: "white"}}>发起组队</Link>
                        </div>
                    </div>
                    {
                        this.state.cards.length >= 1 ? (
                            this.state.cards.map((card) => (
                                <div className="service-card" key={card.id}>
                                    <div className="service-card-body">
                                        <div className="service-card-title">{card.title}</div>
                                        <p>{card.content}</p>
                                    </div>
                                    <div className="service-card-end">
                                        <div className="service-card-button">
                                            <Link to={`./info/${card.id}`}>去看看</Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>当前没有队伍，快去创建吧</div>
                        )
                    }
                </div>
            </React.Fragment>
        );
    }
}

export default Team;