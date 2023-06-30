import React, { Component } from 'react';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formattedDate: null
        };
    }

    componentDidMount() {
        let dateString = this.props.comment.time;
        let date = new Date(dateString);

        let year = date.getFullYear();
        let month = String(date.getMonth() + 1).padStart(2, "0");
        let day = String(date.getDate()).padStart(2, "0");
        let hours = String(date.getHours()).padStart(2, "0");
        let minutes = String(date.getMinutes()).padStart(2, "0");
        let seconds = String(date.getSeconds()).padStart(2, "0");

        let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        this.setState({
            formattedDate: formattedDate
        });
    }

    render() {
        return (
            <div style={{
                margin: "0 30px",
                border: "1px solid",
                padding: "5px",

            }}>
                <div style={{
                    color: "#FB7299",
                }}>
                    {this.props.comment.user_name}
                </div>
                <div style={{
                    margin: "0 30px"
                }}>
                    {this.props.comment.content}
                </div>
                <div style={{
                    color: "#949494",
                    marginLeft: "20px",
                    fontSize: "12px",
                }}>
                    {this.state.formattedDate}
                </div>
            </div>
        );
    }
}

export default Comment;
