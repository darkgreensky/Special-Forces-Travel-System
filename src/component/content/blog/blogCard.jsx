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
                    backgroundColor: `${this.props.index % 2 === 0 ? "#d1e2f8" : "#fcf8f8"}`,
                    height: "50px",
                }}>
                    <div className="row">
                        <div className="col-6 blog-card-line">
                            <Link to={`./content/${this.props.card.id}`} className={"blog-card-line-link"}>{this.props.card.title}</Link>
                        </div>
                        <div className="col-2 blog-card-line">
                            {this.props.card.author}
                        </div>
                        <div className="col-2 blog-card-line">
                            {this.props.card.time.substring(0, 10)}
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
