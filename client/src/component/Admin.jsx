import {useState} from 'react';

export const Admin = () => {

    return(
        <>
        {window.sessionStorage.getItem('id') === 'admin'
        ? 
        <p>어드민 페이지입니당~~</p>
        : 
        <p>접근 권한이 없습니다.</p>
        }
        </>
    );
}