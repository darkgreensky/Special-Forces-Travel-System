import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from "react-redux";
import Logo from '../images/tripLogo.png';
import "bootstrap-icons/font/bootstrap-icons.css";


class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentPage: 0,
        currentSubPage: 0,
    };
    // check location need do
    //   console.log(window.location.pathname);
      switch (true) {
      case (window.location.pathname === "/"):
          this.state.currentPage = 1;
          break;
      case window.location.pathname.startsWith("/pathplan/"):
          this.state.currentPage = 2;
          break;
      case (window.location.pathname === "/service"):
          this.state.currentPage = 3;
          break;
      default:
          this.state.currentPage = 0;
      }

  }
  
  handlePageChange = (id) => {
    // this.setState({ currentPage: window.location.pathname });
      if (this.state.currentPage === id) return;
      this.setState({
        currentSubPage: 0,
        currentPage: id
      });
  };

  handleSubPageClick = (id) => {
      this.setState({currentSubPage: id});
  }
  
  render() {
      // console.log(this.state.currentSubPage);
    return (
        <div className={`sidebar ${this.props.isShow === 1 ? '' : 'hidden-sidebar'}`}>
            <ul className="sidebar-menu">
                <li className='sidebar-menu-title'>
                  南京旅游信息系统
                </li>
                <li style={{userSelect: "none"}}>
                    <img src={Logo} style={{width: "30%", marginLeft: "15px"}} alt=""/>
                    <div style={{display: "inline-block", fontSize: "20px", color: "#367caf"}}>导航</div>
                    <hr style={{margin: 0}}/>
                </li>
                <li className={`sidebar-menu-item ${this.state.currentPage === 1 ? 'sidebar-active' : ''}`}>
                    <Link to="/" onClick={() => this.handlePageChange(1)} className={'fa-bar'}><i className="bi bi-house-heart"></i> 地区相关介绍</Link>
                </li>
                <li className={`sidebar-menu-item ${this.state.currentPage === 2 ? 'sidebar-active' : ''}`}>
                    <div onClick={() =>  this.handlePageChange(2)} className={'fa-bar'}><i className="bi bi-car-front"></i> 出行路线规划</div>
                    <Link to="/pathplan/drive" onClick={() => this.handleSubPageClick(1)}
                          className={`sub-bar ${this.state.currentSubPage === 1 ? 'sub-bar-active' : ''}`}>
                        驾车路线规划</Link>
                    <Link to="/pathplan/bus" onClick={() => this.handleSubPageClick(2)}
                          className={`sub-bar ${this.state.currentSubPage === 2 ? 'sub-bar-active' : ''}`}>
                        公交换乘查询</Link>
                </li>
                <li className={`sidebar-menu-item ${this.state.currentPage === 3 ? 'sidebar-active' : ''}`}>
                    <Link to="/service" onClick={() => this.handlePageChange(3)} className={`fa-bar`}>
                        <i className="bi bi-ticket-detailed"></i> 购票服务</Link>
                </li>
                {/*<li className={`sidebar-menu-item ${this.state.currentPage === 4 ? 'sidebar-active' : ''}`}>*/}
                {/*    <Link to="/contact" onClick={() => this.handlePageChange(4)} className={'fa-bar'}>*/}
                {/*        <i className="bi bi-bookmarks"></i> 特种兵旅游分享*/}
                {/*    </Link>*/}
                {/*</li>*/}
            </ul>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
    return {
        isShow: state.isShow,
    }
}

export default connect(mapStateToProps)(SideBar);
