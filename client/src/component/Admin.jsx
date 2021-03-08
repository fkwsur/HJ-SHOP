import {useEffect, useState} from 'react';
import {ProductManage} from './ProductManage';
import {Qna} from './Qna';

export const Admin = () => {
    const [menuType, setMenuType] = useState('product');

    return(
        <>
        {window.sessionStorage.getItem('id') === 'admin'
        ?

        <>
        <h1>관리자페이지입니다.</h1>
        <div class="snb">
            <ul>
                <li onClick={() => setMenuType('product')}>상품관리</li>
                <li onClick={() => setMenuType('Qna')}>문의관리</li>
            </ul>
        </div>
        {menuType == 'product' ? <ProductManage /> : menuType == 'Qna' ? <Qna /> : ''}
        </>

        : 

        <p>접근 권한이 없습니다.</p>

        }
        </>
    );
}

