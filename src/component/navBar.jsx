import React, { Component } from 'react';
import fold from '../images/function.png';
import ACTIONS from "../redux/actions";
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import $ from 'jquery';

const foldStyle = {
    position: 'relative',
    width: '30px',
    height: '30px',
    backgroundColor: 'white',
    left: '20px',
    top: 'calc(50% - 15px)',
    cursor: 'pointer',
    transition: 'transform 0.3s',
}

class NavBar extends Component {
    state = {
        isHover: false,
    }
    handleMouseEnter = () => {
        this.setState({isHover: true});
        // console.log(this.state.isHover);
    };
    handleMouseLeave = () => {
        this.setState({isHover: false});
    };

    handleOnClick = () => {
        $.ajax({
            url: "https://app165.acapp.acwing.com.cn/calculator/logout/",
            type: "get",
            success: resp => {
                console.log(resp.result);
                if (resp.result === "success") {
                    window.location.href="/login";
                }
            }
        });
    }

    render_user = () => {
        if (this.props.is_login === true) {
            return (
                <React.Fragment>
                    <Link style={{
                        width: "50px",
                        height: "50px",
                        position: "absolute",
                        top: "0px",
                        right: "90px",
                        lineHeight: "50px",
                        textAlign: "center",
                        textDecoration: "none",
                    }} to="/login">{this.props.username}</Link>
                    <Link style={{
                        width: "50px",
                        height: "50px",
                        position: "absolute",
                        top: "0px",
                        right: "30px",
                        lineHeight: "50px",
                        textAlign: "center",
                        textDecoration: "none",
                    }} onClick={this.handleOnClick}>退出</Link>
                </React.Fragment>
            )
        }
        else {
            return (
                <React.Fragment>
                    <Link style={{
                        width: "50px",
                        height: "50px",
                        position: "absolute",
                        top: "0px",
                        right: "30px",
                        lineHeight: "50px",
                        textAlign: "center",
                        textDecoration: "none",
                    }} to="/login">登录</Link>
                </React.Fragment>
            )
        }
    }

    render() {
        return (
            <React.Fragment>
                <div style={{height: '50px', backgroundColor: '#fff', left: '0px'}}>
                    <img src={fold} onClick={() => this.props.switch_sidebar()} alt="" style={{...foldStyle,
                            transform: `${this.state.isHover ? "scale(1.1)" : ""}`}}
                         // style={{transform: `${isHover ? "scale(1.2)" : ""}`}}
                         onMouseEnter={this.handleMouseEnter}
                         onMouseLeave={this.handleMouseLeave}/>
                    {this.render_user()}
                </div>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = {
    switch_sidebar: () => {
        // console.log("click");
        return {
            type: ACTIONS.SWITCH_SIDEBAR
        }
    }
}

export default connect(null, mapDispatchToProps)(NavBar);