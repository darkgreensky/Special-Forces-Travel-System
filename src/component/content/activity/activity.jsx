import React, { Component } from 'react';
import '../../../styles/activity.css';
import axios from "axios";
import {URL} from "../../../constants";
import ActivityCard from "./activityCard";

class Activity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortPattern: 1,
            cards: []
        };
    }

    componentDidMount() {
        axios.get(`${URL}/program/all/time`)
            .then(response => {
                // console.log(response);
                this.setState({
                    cards: response.data.program
                });
            })
            .catch(error => {
                // 处理请求错误
                console.log(error);
            });
    }

    sortByHot = () => {
        if (this.state.sortPattern === 1) {
            axios.get(`${URL}/program/all/read`)
                .then(response => {
                    // console.log(response);
                    this.setState({
                        sortPattern: 2,
                        cards: response.data.program
                    });
                })
                .catch(error => {
                    // 处理请求错误
                    console.log(error);
                });
        }
    }

    sortByTime = () => {
        if (this.state.sortPattern === 2) {
            axios.get(`${URL}/program/all/time`)
                .then(response => {
                    // console.log(response);
                    this.setState({
                        sortPattern: 1,
                        cards: response.data.program
                    });
                })
                .catch(error => {
                    // 处理请求错误
                    console.log(error);
                });
        }
    }

    render() {
        // console.log(this.state.sortPattern);
        return (
            <React.Fragment>
                <div className={"container"}>
                    <div style={{
                        // backgroundColor: "red",
                        marginTop: "30px",
                        width: "100%",
                        position: "relative",
                        borderBottom: "1px solid #ddd",
                        fontSize: "15px",
                    }}>
                        <div style={{
                            display: "inline-block",
                        }}>
                        </div>
                        <div style={{
                            float: "right",
                            display: "inline-block",
                        }}>
                            <div style={{
                                display: "inline-block",
                                userSelect: "none",
                            }}>排序：</div>
                            <div className={`activity-sort-button ${this.state.sortPattern === 1 ? "activity-sort-active" : ""}`}
                            onClick={() => this.sortByTime()}>时间</div>
                            <div className={`activity-sort-button ${this.state.sortPattern === 2 ? "activity-sort-active" : ""}`}
                            onClick={() => this.sortByHot()}>热度</div>
                        </div>
                        <div className={"clear"} />
                    </div>
                    {
                        this.state.cards.map((card) => (
                            <ActivityCard
                                key={card.id}
                                card={card}
                            />
                        ))
                    }
                </div>
            </React.Fragment>
        );
    }
}

export default Activity;