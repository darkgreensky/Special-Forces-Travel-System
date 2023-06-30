import React, { Component } from 'react';
import ServiceCard from './serviceCard';
import $ from 'jquery';
import { URL } from '../../../constants';
import axios from "axios";

const cardBoxStyle = {
    display: "flex",
    flexWrap: "wrap",
    padding: "10px 50px",
}

class Service extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            content: "",
        };
    }

    componentDidMount() {
        $.ajax({
            url: `${URL}/ticket/all`,
            type: 'GET',
            dataType: 'json',
            success: (responseData) => {
                // 请求成功
                // console.log(responseData.infor);
                this.setState({
                    cards: responseData.infor
                });
            },
            error: (xhr, status, error) => {
                // 请求失败
                console.log('network err，status code is ' + xhr.status);
            }
        });
    }

    search = () => {
        // console.log(this.state.content);
        axios.get(`${URL}/ticket/search?text=${this.state.content}`)
            .then(response => {
                // console.log(response);
                this.setState({
                    cards: response.data.infor,
                });
            }).catch(error => {
                console.log(error);
        });
    }

    render() {
        return (
            <React.Fragment>
                <div style={{
                    width: "100%",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "10px",
                }}>
                    <div style={{width: "50%"}}>
                        <div className="input-group mb-3" style={{
                        }}>
                            <input type="text" className="form-control" aria-label="Recipient's username" aria-describedby="button-addon2"
                                   onChange={e => {this.setState({content: e.target.value})}} style={{width: "50%"}} />
                                <button className="btn btn-outline-secondary" type="button" id="button-addon2"
                                        onClick={() => this.search()}>搜索
                                </button>
                        </div>
                    </div>
                    {/*<input  />*/}
                    {/*<button >搜索</button>*/}
                </div>
                <div style={cardBoxStyle}>
                {this.state.cards.map(card => (
                    <ServiceCard
                        key={card.id}
                        card={card}
                    />
                ))}
                </div>
            </React.Fragment>
        );
    }
}

export default Service;
