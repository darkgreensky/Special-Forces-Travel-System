import React, { Component } from 'react';
import backgroundImage from '../../../images/nanjing_yangtze_river_bridge_day.png';
import '../../../styles/register.css';
import $ from 'jquery';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error_message: "",
            username: "",
            password: "",
            // password_confirm: "",
        };
    }

    handleClick = e => {
        e.preventDefault();
        if (this.state.username === "") {
            this.setState({error_message: "用户名不能为空"});
        }
        else if (this.state.password === "") {
            this.setState({error_message: "密码不能为空"});
        }
        else if (this.state.password_confirm === "") {
            this.setState({error_message: "确认密码不能为空"});
        }
        else if (this.state.password !== this.state.password_confirm) {
            this.setState({error_message: "两次输入密码不一致"});
        }
        else {
            $.ajax({
                url: "http://192.168.255.236:8080/user/register",
                type: "get",
                data: {
                    username: this.state.username,
                    password: this.state.password,
                },
                dataType: "json",
                success: resp => {
                    if (resp.result === "success")
                        window.location.href="/calculator";
                    else
                        console.log(resp);
                        this.setState({error_message: resp.result});
                }
            })
        }
    }

    render() {
        return (
            <div style={{width: "100%", height: "100%", backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: "center"}}>
                <form action="" className="register-form">
                    <h5 className="register-title">注册</h5>
                    <input onChange={e => {this.setState({username: e.target.value})}} className="register-input" type="text" placeholder="用户名" />
                    <input onChange={e => {this.setState({password: e.target.value})}} className="register-input" type="password" placeholder="密码" />
                    <input onChange={e => {this.setState({password_confirm: e.target.value})}} className="register-input" type="password" placeholder="确认密码" />
                    <div style={{height: "1rem", color: "red", position: "relative", bottom: "10px"}}>
                        {this.state.error_message}
                    </div>
                    <input onClick={this.handleClick} type="submit" className="register-btn register-title" value="注 册" />
                </form>
            </div>
        );
    }
}

export default Register;
