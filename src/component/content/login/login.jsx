import React, { Component } from 'react';
import backgroundImage from '../../../images/nanjing_yangtze_river_bridge.jpg';
import '../../../styles/login.css';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { URL } from '../../../constants';
import ACTIONS from '../../../redux/actions';
import { connect } from 'react-redux';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error_message: "",
            username: "",
            password: "",
            is_login: false,
        };
    }

    handleClick = e => {
        e.preventDefault();
        if (this.state.username === "") {
            this.setState({error_message: "用户名不能为空"});
        }
        else if (this.state.password === "") {
            this.handleLogin();
            this.setState({error_message: "密码不能为空"});
        }
        else {
            $.ajax({
                url: `${URL}/user/login`,
                type: "get",
                data: {
                    username: this.state.username,
                    password: this.state.password,
                },
                dataType: "json",
                success: resp => {
                    if (resp.result === "success") {
                        this.handleLogin();
                        window.location.href = "/";
                    }
                    else {
                        console.log(resp);
                        this.setState({error_message: "用户名或密码错误"});
                    }
                }
            })
        }
    }

    // 登录逻辑
    handleLogin = () => {
        this.setState({
            is_login: true
        });
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', this.state.username);
        this.props.login_token(this.state);
    };

    render() {
        return (
            <div style={{width: "100%", height: "100%", backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: "center"}}>
                <form action="" className="login-form">
                    <h5 className="login-title">登录</h5>
                    <input onChange={e => {this.setState({username: e.target.value})}} className="login-input" type="text" placeholder="用户名" />
                    <input onChange={e => {this.setState({password: e.target.value})}} className="login-input" type="password" placeholder="密码" />
                    <div style={{height: "1rem", color: "red", position: "relative", bottom: "10px"}}>
                        {this.state.error_message}
                    </div>
                    <input onClick={this.handleClick} type="submit" className="login-btn login-title" value="登 录" />
                    <p></p>
                    <span style={{
                        fontWeight: "800",
                    }}>没有账号？</span>
                    <Link style={{
                        color: "#7dd0ff",
                        fontWeight: "800",
                        textDecoration: "none",
                    }} to="/register">注册</Link>
                </form>
            </div>
        );
    }
}
const mapDispatchProps = {
    login_token: state => {
        console.log("login");
        return {
            type: ACTIONS.LOGIN_TOKEN,
            is_login: state.is_login,
            username: state.username,
        }
    }
}

export default connect(null, mapDispatchProps)(Login);
