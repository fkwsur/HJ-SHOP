import {useEffect, useState} from 'react';
import {ProductManage} from './ProductManage';
import {AdminQna} from './AdminQna';

export const Admin = () => {
    const [menuType, setMenuType] = useState('product');

    return(
        <div className="container">
          {window.sessionStorage.getItem('id') === 'admin'
          ?

          <>
          <h2>Admin</h2>
          <div class="snb">
              <ul className="tab">
                  <li onClick={() => setMenuType('product')}>상품관리</li>
                  <span>|</span>
                  <li onClick={() => setMenuType('Qna')}>문의관리</li>
              </ul>
          </div>
          {menuType == 'product' ? <ProductManage /> : menuType == 'Qna' ?    <AdminQna /> : ''}
          </>

          : 

          <p>접근 권한이 없습니다.</p>

          }
        </div>
    );
}

