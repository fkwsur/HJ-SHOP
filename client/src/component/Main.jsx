import React from 'react';
import mainImg from '../image/sadasdas.PNG';
import { Link } from 'react-router-dom';
import store from '../store/store';
import { faShoppingBasket} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const Header = () => {

    const remove = () =>{
        window.sessionStorage.removeItem('id');
        window.location.reload();
    }

    return(
        <>
        <div class="header">
            {window.sessionStorage.getItem('id') === 'admin' ?
            <button class="admin"><Link to="/admin">관리자페이지</Link></button> : ''}
            <h2><Link to="/">HJ SHOP</Link></h2>
            <div class="sub_gnb">
              {window.sessionStorage.getItem('id') ?
              <>
               <p><span>{window.sessionStorage.getItem('id')}</span>님 안녕하세요!</p>
               
               
               <button onClick={remove}>로그아웃</button>
              </>
               :
               <>
               <button><Link to="/auth">로그인하기</Link></button>
               </>
              }
            </div>
        </div>
            <div class="gnb">
                <ul>
                    <li><Link to="/">메인</Link></li>
                    <li><Link to="/product">상품목록</Link></li>
                    <li><Link to="/board">게시판</Link></li>
                    <li><Link to="/mypage">마이페이지</Link></li>
                    <li><button><FontAwesomeIcon icon={faShoppingBasket} size="1x" />장바구니</button></li>
                    <li><button>찜목록</button></li>
                    <li><input type="text" placeholder="검색"></input></li>
                </ul>
            </div>
        </>
    );
}

export const Main = () => {
    return(
        <>
        <div class="main_wrap">

            
            <div class="banner">
                <img src={mainImg} alt="메인이미지"/>
            </div>
            <div class="products">
                <div class="item_wrap">
                  <div class="item">
                      <div class="img"><img /></div>
                      <h3>옷입니당</h3>
                      <p>이 옷으로 말하자면 이러쿵저러쿵 어허어허어허 말돌리지마</p>
                  </div>
                  <div class="item">
                      <div class="img"><img /></div>
                      <h3>옷입니당</h3>
                      <p>이 옷으로 말하자면 이러쿵저러쿵 어허어허어허 말돌리지마</p>
                  </div>
                  <div class="item">
                      <div class="img"><img /></div>
                      <h3>옷입니당</h3>
                      <p>이 옷으로 말하자면 이러쿵저러쿵 어허어허어허 말돌리지마</p>
                  </div>
                  <div class="item">
                      <div class="img"><img /></div>
                      <h3>옷입니당</h3>
                      <p>이 옷으로 말하자면 이러쿵저러쿵 어허어허어허 말돌리지마</p>
                  </div>
                </div>
            </div>
        


        </div>{/* wrap area end */}
        </>
    );
}