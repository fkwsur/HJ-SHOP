import {useEffect, useState} from 'react';
import mainImg from '../image/main.jpg';
import { Link } from 'react-router-dom';
import store from '../store/store';
import axios from 'axios';
import { faShoppingBasket, faHeart, faUser} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const Header = () => {
    const remove = () =>{
        window.sessionStorage.removeItem('id');
        window.location.reload();
    }
    return(
        <>
        <div class="header">
            <h2><Link to="/">HJ SHOP</Link></h2>
            <input type="text" placeholder="Search" />
            <div class="gnb">
                <ul>
                    <li><Link to="/product/cloth">Cloth</Link></li>
                    <li><Link to="/product/appliances">Appliances</Link></li>
                    <li><Link to="/product/goods">Goods</Link></li>
                    <li><Link to="/product/food">Food</Link></li>
                    <li><Link to="/board">Bulletin Board</Link></li>
                    <li>{window.sessionStorage.getItem('id') === 'admin' ?
                        <Link to="/admin">Admin</Link> : ''}
                    </li>
                    <li>
                        {window.sessionStorage.getItem('id') ?
                        <a onClick={remove} style={{cursor:'pointer'}}>Logout</a>
                        :
                        <Link to="/auth">Login</Link>
                        }
                    </li>
                </ul>
            </div>
            <div className="icon">
                <p>{window.sessionStorage.getItem('id')}</p>
                <button><Link to="/mypage"><FontAwesomeIcon icon={faUser} size="2x" style={{color: '#f2eebe'}}/></Link></button>
                <button><FontAwesomeIcon icon={faShoppingBasket} size="2x" style={{color: '#f2eebe'}}/></button>
                <button><FontAwesomeIcon icon={faHeart} size="2x" style={{color: '#f2eebe'}}/></button>
            </div>  
        </div>
        </>
    );
}

export const Footer = () => {
    return (
        <div className="footer">
            Copyright 2021 HJ SHOP - Lovingly designed by Hyun_Ji Kim
        </div>
    )
}

export const Main = () => {
    const [mainList, setMainList] = useState([]);

    useEffect(() => {
        axios.get('/api/product/main')
        .then(res => {
			console.log(res);
            setMainList(res.data);
		})
		.catch(err => {
			console.log(err);
		})
	},[]);

    return(
        <>
  
        <div class="main_wrap">
            <div class="banner">
                <img src={mainImg} alt="메인이미지"/>
                <h2 className="main_title">HJ SHOP</h2>
            </div>
            
    
            <div className="section introduce">
                <h2>INTRODUCE</h2>
                <p>저희 HJ SHOP은 800만 회원과 5,700개 입점 브랜드를 보유한 온라인 쇼핑 플랫폼입니다.<br/> 차별화된 쇼핑 경험을 제공하기 위해 힘쓰는 HJ SHOP는 입점 브랜드가 매력적인 모습으로 고객을 만날 수 있는 방법을 함께 고민합니다. 상품 기획 단계부터 판매 전략, 마케팅 이벤트까지 다양한 영역에 걸쳐 브랜드의 정체성과 상품의 가치를 알릴 수 있는 마케팅 인프라를 제공합니다.<br/> 오직 HJ SHOP에서만 구매 가능한 단독 상품, 이종 산업 및 브랜드 간의 컬래버레이션, 고객 이벤트 등의 다채로운 기획, 마케팅 툴을 활용해 온라인 쇼핑의 즐거움을 선사하고 있습니다.<br/> HJ SHOP는 고객에게 가장 높은 수준의 온라인 쇼핑 경험을 제공하기 위해 다양한 서비스와 새로운 기술을 지속적으로 도입, 개선하고 있습니다. </p>
            </div>

  
            <div class="products">
                <div class="item_wrap">
                {mainList ? mainList.map( k => {
                    return(
                        <>
                            <div class="item">
                                  <img src={k.p_img}/>
                                <div className="caption">
                                  <h3>{k.p_name}</h3>
                                  <p>{k.p_content}</p>
                                  <a href="#">View More</a>
                                </div>
                            </div>
                        </>
                        )
                    }) : ''
                  }
                </div>
            </div>

            <div className="section section3 clearfix">
                <h2>INTRODUCE</h2>
                <p>저희 HJ SHOP은 800만 회원과 5,700개 입점 브랜드를 보유한 온라인 쇼핑 플랫폼입니다.<br/> 차별화된 쇼핑 경험을 제공하기 위해 힘쓰는 HJ SHOP는 입점 브랜드가 매력적인 모습으로 고객을 만날 수 있는 방법을 함께 고민합니다. 상품 기획 단계부터 판매 전략, 마케팅 이벤트까지 다양한 영역에 걸쳐 브랜드의 정체성과 상품의 가치를 알릴 수 있는 마케팅 인프라를 제공합니다.<br/> 오직 HJ SHOP에서만 구매 가능한 단독 상품, 이종 산업 및 브랜드 간의 컬래버레이션, 고객 이벤트 등의 다채로운 기획, 마케팅 툴을 활용해 온라인 쇼핑의 즐거움을 선사하고 있습니다.<br/> HJ SHOP는 고객에게 가장 높은 수준의 온라인 쇼핑 경험을 제공하기 위해 다양한 서비스와 새로운 기술을 지속적으로 도입, 개선하고 있습니다. </p>
            </div>

        </div>
        </>
    );
}