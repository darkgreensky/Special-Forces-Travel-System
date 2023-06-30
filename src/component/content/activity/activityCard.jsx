import React, { Component } from 'react';
import {Link} from "react-router-dom";

class ActivityCard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <React.Fragment>
                <div style={{
                    backgroundColor: "#e8e8e8",
                    width: "100%",
                    height: "120px",
                    margin: "10px 20px",
                    display: "flex",
                    position: "relative",
                }}>
                    <div style={{
                        width: "100%",
                        padding: "10px",
                    }}>
                        <div style={{
                            fontSize: "20px",
                        }}><Link to={`./content/${this.props.card.id}`} style={{
                            textDecoration: "none",
                        }}>{this.props.card.title}</Link></div>
                        <div>地点: {this.props.card.locate}</div>
                        <div>时间: {this.props.card.time}</div>
                        <div>阅读量: {this.props.card.count}</div>
                    </div>
                    <div className="service-card-end">
                        <div className="service-card-button">
                            <Link to={`./content/${this.props.card.id}`}>去看看</Link>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ActivityCard;
