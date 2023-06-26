import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/blogCard.css'


class BlogCard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <React.Fragment>
                <div className="container text-center" style={{
                    backgroundColor: `${this.props.card.id % 2 === 0 ? "#d1e2f8" : "#fcf8f8"}`,
                    height: "50px",
                }}>
                    <div className="row">
                        <div className="col-6 blog-card-line">
                            {this.props.card.title}
                        </div>
                        <div className="col-2 blog-card-line">
                            {this.props.card.author}
                        </div>
                        <div className="col-2 blog-card-line">
                            {this.props.card.time}
                        </div>
                        <div className="col-2 blog-card-line">
                            {this.props.card.quantity}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default BlogCard;
