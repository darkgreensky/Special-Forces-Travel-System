import React, { Component } from 'react';
import SideBar from './sideBar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './content/home/home';
import NotFound from './content/notFound';
import PathPlan from './content/pathPlan/pathPlan';
import BusPlan from './content/pathPlan/busPlan';
import Service from './content/service/service';
import TicketInfo from './content/service/ticketInfo';
import NavBar from './navBar';
import Login from './content/login/login';
import Register from './content/login/register';
import { connect } from 'react-redux';
import $ from 'jquery';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_login: false,
            username: "dark",
        };
    }

    componentDidMount() {
        return;
        // eslint-disable-next-line no-unreachable
        $.ajax({
            url: "https://app165.acapp.acwing.com.cn/calculator/get_status/",
            type: "get",
            success: resp => {
                if (resp.result === "login") {
                    this.setState({
                        is_login: true,
                        username: resp.username,
                    });
                }
                else {
                    this.setState({
                        is_login: false,
                        username: "",
                    });
                };
            }
        });
    }

    render() {
        return (
            <React.Fragment>
                <SideBar/>
                {/*<div style={{position: 'absolute',left: '200px', height: '100%', right: '0px', padding: '0px', backgroundColor: '#F2F2F2'}}>*/}
                <div className={`mainContent ${this.props.isShow === 1 ? '' : 'hidden-mainContent'}`}>
                    <NavBar is_login={this.state.is_login} username={this.state.username} />
                    <div style={{position: "relative", top: "0px", boxSizing: 'border-box', margin: '0px', padding: '10px',
                        backgroundColor: '#F2F2F2', minHeight: 'calc(100% - 50px)', display: 'grid', gridTemplateRows: 'minmax(0, 1fr)'}}>
                        <div style={{backgroundColor: 'white', height: '100%', flex: 1, position: 'relative'}}>
                            {/*position: "absolute", top: "10px", botton: "10px", left: "10px", right: "10px"*/}
                        <Routes>
                                <Route path='/' element={<Home />} />
                                <Route path='/pathplan/drive' element={<PathPlan />} />
                                <Route path='/pathplan/bus' element={<BusPlan />} />
                                <Route path='/service' element={<Service />} />
                                <Route path='/service/:pageNumber' element={<TicketInfo />} />
                                <Route path='/login' element={<Login />} />
                                <Route path='/register' element={<Register />} />
                                {/*<Route path='/calculator/calculator' element={this.state.is_login ? <Calculator /> : <Navigate replace to="/calculator/login"/>} />*/}
                                {/*<Route path='/calculator/login' element={this.state.is_login ? <Navigate replace to="/calculator/home"/> : <Login />} />*/}
                                {/*<Route path='/calculator/register' element={this.state.is_login ? <Navigate replace to="/calculator/home"/> : <Register />} /> *!/*/}
                                <Route path='/404' element={<NotFound />} />
                                <Route path='/*' element={<Navigate replace to="/404" />} />
                        </Routes>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        isShow: state.isShow,
    }
}

export default connect(mapStateToProps)(App);