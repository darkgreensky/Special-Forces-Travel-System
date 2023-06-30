import React, { Component } from 'react';
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
import Blog from './content/blog/blog';
import Upload from "./content/blog/upload";
import BlogContent from './content/blog/blogContent';
import Sign from './content/map/sign';
import AllPosition from './content/pages/allPosition';
import { connect } from 'react-redux';
import ACTIONS from "../redux/actions";
import Measure from "./content/map/measure";
import ManageArticle from "./content/mySpace/manageArticle";
import Team from "./content/team/team";
import CreateTeam from "./content/team/createTeam";
import MineTeam from "./content/mySpace/mineTeam";
import TeamInfo from "./content/team/teamInfo";
import Traffic from "./content/pathPlan/traffic";
import Weather from "./content/pages/weather";
import Hotel from "./content/pages/hotel";
import Search from "./content/map/search";
import Activity from "./content/activity/activity";
import ActivityContent from "./content/activity/activityContent";
import Bill from "./content/mySpace/bill";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_login: false,
            username: "login_error",
        };
        const storedLoginStatus = localStorage.getItem('isLoggedIn');
        if (storedLoginStatus === 'true') {
            let username = localStorage.getItem('username');
            // console.log(username);
            if (username === "") {
                this.state.is_login = false;
                this.props.login_token(this.state);
            }
            else {
                this.state.is_login = true;
                this.state.username = username;
                this.props.login_token(this.state);
            }
        }
        else {
            this.state.is_login = false;
            this.props.login_token(this.state);
        }
    }

    render() {
        // console.log("app", this.props);
        return (
            <React.Fragment>
                {/*<SideBar/>*/}
                {/*<div style={{position: 'absolute',left: '200px', height: '100%', right: '0px', padding: '0px', backgroundColor: '#F2F2F2'}}>*/}
                <div className={`mainContent ${this.props.isShow === 1 ? '' : 'hidden-mainContent'}`}>
                    <NavBar is_login={this.state.is_login} username={this.state.username} />
                    <div style={{position: "relative", top: "0px", boxSizing: 'border-box', margin: '0px', padding: '10px',
                        backgroundColor: '#F2F2F2', minHeight: 'calc(100% - 56px)', display: 'grid', gridTemplateRows: 'minmax(0, 1fr)'}}>
                        <div style={{backgroundColor: 'white', height: '100%', flex: 1, position: 'relative'}}>
                            {/*position: "absolute", top: "10px", botton: "10px", left: "10px", right: "10px"*/}
                        <Routes>
                                <Route path='/' element={<Home />} />
                                <Route path='/pathplan/drive' element={<PathPlan />} />
                                <Route path='/pathplan/bus' element={<BusPlan />} />
                                <Route path='/pathplan/traffic' element={<Traffic />} />
                                <Route path='/map/sign' element={<Sign />} />
                                <Route path='/map/measure' element={<Measure />} />
                                <Route path='/map/search' element={<Search />} />
                                <Route path='/service' element={<Service />} />
                                <Route path='/service/:pageNumber' element={<TicketInfo is_login={this.props.is_login} username={this.state.username}/>} />
                                <Route path='/blog' element={<Blog /> } />
                                <Route path='/weather' element={<Weather /> } />
                                <Route path='/hotel' element={<Hotel /> } />
                                <Route path='/blog/upload' element={this.props.is_login ? <Upload username={this.state.username} /> : <Navigate replace to="/login"/>} />
                                <Route path='/blog/content/:pageNumber' element={<BlogContent /> } />
                                <Route path='/login' element={<Login />} />
                                <Route path='/register' element={<Register />} />
                                <Route path='/team' element={<Team />} />
                                <Route path='/team/create' element={this.props.is_login ? <CreateTeam username={this.state.username} /> : <Navigate replace to="/login"/>} />
                                <Route path='/team/info/:pageNumber' element={this.props.is_login ? <TeamInfo username={this.state.username} /> : <Navigate replace to="/login"/>} />
                                <Route path='/manage/article' element={<ManageArticle />} />
                                <Route path='/manage/team' element={<MineTeam />} />
                                <Route path='/activity' element={<Activity />} />
                                <Route path='/activity/content/:pageNumber' element={<ActivityContent /> } />
                                <Route path='/Bill' element={<Bill username={this.state.username} />} />
                                <Route path='/404' element={<NotFound />} />
                                <Route path='/*' element={<Navigate replace to="/404" />} />
                                <Route path='/topic' element={<AllPosition />} />
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
        // isShow: state.isShow,
        is_login: state.is_login,
        username: state.username,
    }
}

const mapDispatchProps = {
    login_token: state => {
        // console.log("dispatch", state);
        return {
            type: ACTIONS.LOGIN_TOKEN,
            is_login: state.is_login,
            username: state.username,
        }
    }
}

export default connect(mapStateToProps, mapDispatchProps)(App);