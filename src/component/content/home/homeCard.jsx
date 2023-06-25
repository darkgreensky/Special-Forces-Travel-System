import React, {Component} from "react";

class HomeCard extends Component {
    state = {
    }
    render() {
        // console.log(this.props.card.url);
        return (
            <React.Fragment>
                <div className={`item ${this.props.card.isActive ? 'active' : ''}`} style={{backgroundImage: `url(${this.props.card.url})`}}
                     onClick={this.props.onClick}>
                    <div className="shadow"></div>
                    <div className="content">
                        <div className="icon">
                            <i className="fa fa-sun-o"></i>
                        </div>
                        <div className="text">
                            <div className="tit">{this.props.card.title}</div>
                            <div className="sub">{this.props.card.isActive ? this.props.card.describe : ''}</div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default HomeCard;