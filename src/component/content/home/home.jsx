import React, { Component } from 'react';
import '../../../styles/card.css';
import HomeCard from "./homeCard";
import fuzimiao from '../../../images/scene/fuzimiao.jpeg'
import meilinggong from '../../../images/scene/meilinggong.jpeg'
import zhongshanling from '../../../images/scene/zhongshanling.jpeg'
import zhongshan from '../../../images/scene/zhongshan.jpeg'
import qixiashan from '../../../images/scene/qixiashan.jpeg'
class Home extends Component {
    state = {
        cards: [
            {id: 1, url: `${fuzimiao}`, isActive: true,
                title: "夫子庙秦淮河", describe: "这是南京非常繁华的地带之一，这也是众多游客来南京必玩的地方，在这里不仅能看到古都南京的历史建筑，还能吃到最地道的秦淮风味名点小吃，从不同视角感受河畔风土人情。"},
            {id: 2, url: `${meilinggong}`, isActive: false,
                title: "美龄宫", describe: "美龄宫坐落于中山风景区以南的小红山上,美龄宫原是“国民政府主席官邸”,用作为民国政府主席居住并处理人民事务的处所,后用为高级官员拜访中山陵的休息处。"},
            {id: 3, url: `${zhongshanling}`, isActive: false,
                title: "中山陵", describe: "这是南京值得一去的地方之一，而且也是一个国家5A级旅游景区，周末节假日很多人游客都会来这里，风景区内还有音乐台、行健亭、光化亭、流徽榭、藏经楼等多处纪念性建筑。"},
            {id: 4, url: `${zhongshan}`, isActive: false,
                title: "钟山风景区", describe: "钟山风景区不仅是南京最美丽的风景胜地之一，也是中国著名的风景游览胜地。它是南京最好的赏花避暑赏叶赏雪的地方。"},
            {id: 5, url: `${qixiashan}`, isActive: false,
                title: "栖霞山风景区", describe: "栖霞山位于南京栖霞区，古称摄山，被誉为“金陵第一明秀山”，南朝时山中建有“栖霞精舍”，因此得名。"},
        ],
    }
    onClick = (card) => {
        const cards = [...this.state.cards];
        const k = this.state.cards.indexOf(card);
        for (let i in cards) {
            cards[i].isActive = false
        }
        cards[k].isActive = true
        this.setState({cards});
    }

    render() { 
        return (
            <React.Fragment>
                <div className="home">
                <div className="home-container">
                    {this.state.cards.map(card => (
                        <HomeCard
                            key={card.id}
                            card={card}
                            onClick={() => this.onClick(card)}
                        />
                    ))}
                </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default Home;