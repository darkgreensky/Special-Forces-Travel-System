import React, { Component } from 'react';
import ACTIONS from "../redux/actions";
import {connect} from "react-redux";
import { Link } from 'react-router-dom';

class NavBar extends Component {
    // 登出逻辑
    handleLogout = () => {
        localStorage.setItem('isLoggedIn', 'false');
        this.props.logout();
    };

    render_user = () => {
        // console.log("navbar", this.props);
        if (this.props.is_login === true) {
            return (
                <React.Fragment>
                    <li className="nav-item">
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a className="nav-link" style={{cursor: "pointer"}}>{this.props.username}</a>
                    </li>
                    <li className="nav-item">
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a onClick={this.handleLogout} className="nav-link" style={{cursor: "pointer"}}>退出</a>
                    </li>
                </React.Fragment>
            )
        }
        else {
            return (
                <React.Fragment>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">登录</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/register">注册</Link>
                    </li>
                </React.Fragment>
            )
        }
    }

    render() {
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid" style={{marginRight: "20px"}}>
                        <a className="navbar-brand" href="/">特种兵旅游系统-南京</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"/>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item dropdown">
                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                    <a className="nav-link dropdown-toggle" href="#" role="button"
                                       data-bs-toggle="dropdown" aria-expanded="false">
                                        出行规划
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" to="/pathplan/drive">驾车规划</Link></li>
                                        <li><Link className="dropdown-item" to="/pathplan/bus">公交规划</Link></li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown">
                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                    <a className="nav-link dropdown-toggle" href="#" role="button"
                                       data-bs-toggle="dropdown" aria-expanded="false">
                                        地图显示
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" to="/map/sign">地图标记</Link></li>
                                        <li><Link className="dropdown-item" to="/map/measure">地图量算</Link></li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/service">购票服务</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/blog">路线分享</Link>
                                </li>
                            </ul>
                            <ul className="navbar-nav">
                                {this.render_user()}
                            </ul>
                        </div>
                    </div>
                </nav>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        is_login: state.is_login,
        username: state.username,
    }
}

const mapDispatchToProps = {
    // switch_sidebar: () => {
    //     return {
    //         type: ACTIONS.SWITCH_SIDEBAR
    //     }
    // },
    logout: () => {
        return {
            type: ACTIONS.LOGOUT
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);