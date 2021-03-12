import {useEffect, useState} from 'react';
import { UserQna } from './UserQna';
import {QnaDetail} from './QnaDetail';

export const MyPage = () => {
    const [menuType, setMenuType] = useState('');

    return(
			<div className="container">
			<h2>MyPage</h2>
			<div class="snb">
            <ul className="tab">
                <li onClick={() => setMenuType('basket')}>장바구니</li>
                <span>|</span>
                <li onClick={() => setMenuType('wishList')}>찜목록</li>
                <span>|</span>
                <li onClick={() => setMenuType('Qna')}>문의하기</li>
                <span>|</span>
                <li onClick={() => setMenuType('QnaAnswer')}>문의내역</li>
            </ul>
        </div>

        {
        menuType == '' ? <p>마이페이지입니다</p> : 
        menuType == 'basket' ? <p>장바구니입니다</p> :
        menuType == 'wishList' ? <p>찜목록입니다</p> :
        menuType == 'Qna' ? <UserQna /> :
        menuType == 'QnaAnswer' ? <QnaDetail /> : ''
        }

		</div>
    );
}