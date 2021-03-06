import {useState} from 'react';
import { Link } from 'react-router-dom';

export const ProductManage = () => {
    return(
        <div class="product">상품 등록 수정 삭제
            <button><Link to="/admin/admindetail">상품 등록</Link></button>
            <table>
                <tr>
                    <th>NO</th>
                    <th>제목</th>
                    <th>이미지</th>
                    <th>가격</th>
                    <th>카테고리</th>
                    <th>보기</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>닥터마틴신발</td>
                    <td>이미지</td>
                    <td>250.000</td>
                    <td>신발</td>
                    <td>상세보기</td>
                </tr>
            </table>
        </div>
    );
}

export const Qna = () => {
    return(
        <div class="qna">답변 삭제 수정</div>
    );
}



export const Admin = () => {
    const [menuType, setMenuType] = useState('');  


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

