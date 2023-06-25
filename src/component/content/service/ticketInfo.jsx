import React  from 'react';
import { useParams, Link } from 'react-router-dom';

const TicketInfo = () => {
    let params = useParams();
    let pageNumber = params.pageNumber;
    return (
        <React.Fragment>
            <h1>{pageNumber}</h1>
            <div className="container">
                <div style={{height: "200px", width: "355px", boxSizing: "border-box", padding: "10px"}}>
                    <img src={"https://c.cncnimg.cn/046/921/b4de_m.jpg"} />
                </div>
            <hr />
            <Link to={`/service`}>
                <div>返回</div>
            </Link>
            </div>
        </React.Fragment>
    );
}

export default TicketInfo;