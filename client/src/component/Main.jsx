import React from 'react';
import mainImg from '../image/sadasdas.PNG';
import { Link } from 'react-router-dom';
import store from '../store/store';

export const Header = () => {

    const remove = () =>{
        window.sessionStorage.removeItem('id');
        window.location.reload();
    }

    return(
        <>
        <div class="header">
            <h2><Link to="/">HJ SHOP</Link></h2>
            <div class="sub_gnb">
              {window.sessionStorage.getItem('id') ?
              <>
               <p>{window.sessionStorage.getItem('id')}님 안녕하세요!</p>
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
                    <li>상품목록</li>
                    <li><Link to="/board">자유게시판</Link></li>
                    <li>문의하기</li>
                    <li>장바구니</li>
                    <li>찜목록</li>
                    <li><Link to="/admin">관리자페이지</Link></li>
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
            <div class="notice">

            </div>


        </div>{/* wrap area end */}
        </>
    );
}