import axios from 'axios';
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import store from '../store/store';

export const Auth = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState(false);
    const [idCheck, setIdCheck] = useState(false);
    const [emailCheck, setEmailCheck] = useState(false);
    const [confirm, setConfirm] = useState('');
    const [authCode, setAuthCode] = useState('');

    const onChange = (e) => {
        const {
            target: {name, value},
        } = e;
        if(name === "id") setId(value);;
        if(name === "password") setPassword(value);
        if(name === "email") setEmail(value);
        if(name === "confirm") setConfirm(value);
    };

    const onChangeId = (e) => {
        const {
            target: {name, value},
        } = e;
        setId(value); 
        setIdCheck(false);
    };

    const onClick = () => {
        setLogin(!login);
        setId('');
        setPassword('');
        setEmail('');
        setConfirm('');
    }

    const onIdCheck = (e) => {
        if(id == ''){
            alert('아디입력');
         } else {
             setIdCheck(true);
             e.preventDefault();
             axios.post('http://localhost:8080/api/member/confirm',{
                 id : id,
                 password : password,
                 email : email   
             })
             .then(res => {
                 console.log(res.data);
                 if(res.data === 1){
                     alert('사용가능한 아이디 입니다.');     
                 } else {
                     setIdCheck(false);
                     alert('중복된 아이디가 존재합니다.');
                     return false;
                 }
             })
         }
    }


    const onSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/member/login',{
            id : id,
            password : password
        })
        .then(res => {
            console.log(res.data);
            if(res.data === 1){
                alert('로그인에 성공하였습니다.');
                window.sessionStorage.setItem('id', id);
                window.location.href = "/";
            } else{
                alert('error');
                return false;
            }
        }).catch(err => {
            console.log(err);
        });
    };
    
    const onMailConfirm = (e) => {
        setEmailCheck(true);
        e.preventDefault();
        axios.post('http://localhost:8080/api/email/emailAuth',{
            email : email,
        })
        .then(res => {
            console.log(res.data);
            setAuthCode(res.data);
            if(res.data === authCode)alert('인증번호가 발송되었습니다.');
        }).catch(err => {
            console.log(err);
            alert('인증번호 발송실패');
        });
    }
    
    const onConfirm = (e) => {
        e.preventDefault();
        if(idCheck === false){
            alert('아이디 중복체크를 해주세요.');
        } else if(emailCheck === false){
            alert('인증번호를 발송해주세요.');
        }else{
            axios.post('http://localhost:8080/api/member/signup',{
                id : id,
                password : password,
                email : email,
            })
            .then(res => {
                console.log(res.data);
                console.log(authCode);
                console.log(confirm);
                if(authCode == confirm){
                    alert('가입에 성공했습니다.');    
                    setLogin(false);
                    setId('');
                    setPassword('');
                } else {
                    alert('가입에 실패했습니다.');
                    return false;
                }
            })
        }
    }

    return(
        <>
        <div class="login">
        {login ?  <h2>회원가입</h2> : <h2>로그인</h2>}
            <form onSubmit={login ? onConfirm : onSubmit}>
              <input 
                placeholder="아이디"
                type="text" 
                name="id" 
                value={id} 
                onChange={onChangeId} 
                required
              />
        {login ?  <><button type="submit" onClick={onIdCheck}>중복체크</button><br/></> : ''}
              <input 
                placeholder="비밀번호"
                type="text" 
                name="password" 
                value={password} 
                onChange={onChange} 
                required
              /><br/>
              {login ?
              <>
              <input 
                placeholder="이메일"
                type="text" 
                name="email" 
                value={email} 
                onChange={onChange} 
                required
              />
              <button onClick={onMailConfirm}>인증번호발송</button><br/>
              <input 
                type="text" 
                name="confirm" 
                value={confirm} 
                onChange={onChange}
                placeholder="인증번호를 입력하세요."
                required
               /><br/>
              </>
              : ''
              }
              <button type="submit" value="submit">{login ?  '가입 완료' : '로그인 완료'}</button>
            </form>
            <button onClick={onClick} style={{marginTop: '20px'}}>{login ?  '로그인하기' :  '회원가입하기'}</button>

        </div>
        </>
    );
}