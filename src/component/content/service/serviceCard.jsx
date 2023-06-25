import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/serviceCard.css'

class ServiceCard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        // console.log(this.props.card.image);
        return (
                <div className="service-card">
                    <div style={{height: "200px", width: "355px", boxSizing: "border-box", padding: "10px"}}>
                    {this.props.card.image && <img src={this.props.card.image} className="service-card-img-top" alt="Card" style={{width: "100%", height: "100%"}}/>}
                    </div>
                    <div className="service-card-body">
                        <div className="service-card-title">{this.props.card.title}</div>
                        <p>{this.props.card.content}</p>
                    </div>
                    <div className="service-card-end">
                        <div className="service-card-button">
                            <Link to={`./${this.props.card.id}`}>去看看</Link>
                        </div>
                    </div>
                </div>
        );
    }
}

export default ServiceCard;
