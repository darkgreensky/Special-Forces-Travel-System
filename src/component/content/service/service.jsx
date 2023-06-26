import React, { Component } from 'react';
import ServiceCard from './serviceCard';
import $ from 'jquery';
import { URL } from '../../../constants';

const cardBoxStyle = {
    display: "flex",
    flexWrap: "wrap",
    padding: "10px 50px",
}

class Service extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [
                {id: 1, image: "https://img1.baidu.com/it/u=1088649273,1938606525&fm=253&fmt=auto&app=138&f=JPEG?w=944&h=500", title: "夫子庙秦淮河", content: "这是南京非常繁华的地带之一，这也是众多游客来南京必玩的地方，在这里不仅能看到古都南京的历史建筑，还能吃到最地道的秦淮风味名点小吃，从不同视角感受河畔风土人情。"},
                // {id: 2, image: "https://img1.baidu.com/it/u=1088649273,1938606525&fm=253&fmt=auto&app=138&f=JPEG?w=944&h=500", title: "夫子庙秦淮河", content: "这是南京非常繁华的地带之一，这也是众多游客来南京必玩的地方，在这里不仅能看到古都南京的历史建筑，还能吃到最地道的秦淮风味名点小吃，从不同视角感受河畔风土人情。"},
                // {id: 3, image: "https://img1.baidu.com/it/u=1088649273,1938606525&fm=253&fmt=auto&app=138&f=JPEG?w=944&h=500", title: "夫子庙秦淮河", content: "这是南京非常繁华的地带之一，这也是众多游客来南京必玩的地方，在这里不仅能看到古都南京的历史建筑，还能吃到最地道的秦淮风味名点小吃，从不同视角感受河畔风土人情。"},
                // {id: 4, image: "https://img1.baidu.com/it/u=1088649273,1938606525&fm=253&fmt=auto&app=138&f=JPEG?w=944&h=500", title: "夫子庙秦淮河", content: "这是南京非常繁华的地带之一，这也是众多游客来南京必玩的地方，在这里不仅能看到古都南京的历史建筑，还能吃到最地道的秦淮风味名点小吃，从不同视角感受河畔风土人情。"},
            ]
        };
    }

    componentDidMount() {
        $.ajax({
            url: `${URL}/ticket/all`,
            type: 'GET',
            dataType: 'json',
            success: (responseData) => {
                // 请求成功
                console.log(responseData.infor);
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

    render() {

        return (
            <React.Fragment>
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
