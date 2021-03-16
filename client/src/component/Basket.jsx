import {useEffect, useState} from 'react';
import axios from 'axios';

export const Basket = () => {
	const [basketList, setBasketList] = useState([]); 

	useEffect(() => {
		console.log( window.sessionStorage.getItem('id'));
		axios.post('/api/basket/basket_list', {
			id : window.sessionStorage.getItem('id')
		})
		.then(res => {
			console.log(res);
			setBasketList(res.data);
		})
		.catch(err => {
			console.log(err);
		})
	},[]);

	return (
	<>
		<table>
			<tr>
				<th>NO</th>
				<th>제목</th>
				<th>이미지</th>
				<th>가격</th>
				<th>카테고리</th>
				<th>보기</th>
			</tr>
	{ basketList ? basketList.map(k => {
			return(
				<tr>
				<td>{k.p_idx}</td>
				<td>{k.p_name}</td>
				<td><img  width={50} height={50} src={k.p_img}/></td>
				<td>{k.p_price}</td>
				<td>{k.category}</td>
				<td>
					<button className="btn" style={{margin:'0'}}>버튼입니다용</button>
				</td>
			</tr>
			)
			}) : "ERROR"
		} 
		</table>
	</>
	)
}

export const Favorites = () => {
	const [favoritesList, setFavoritesList] = useState([]); 

	useEffect(() => {
		console.log( window.sessionStorage.getItem('id'));
		axios.post('/api/favorites/favorites_list', {
			id : window.sessionStorage.getItem('id')
		})
		.then(res => {
			console.log(res);
			setFavoritesList(res.data);
		})
		.catch(err => {
			console.log(err);
		})
	},[]);

	return (
	<>
		<table>
			<tr>
				<th>NO</th>
				<th>제목</th>
				<th>이미지</th>
				<th>가격</th>
				<th>카테고리</th>
				<th>보기</th>
			</tr>
	{ favoritesList ? favoritesList.map(k => {
			return(
				<tr>
				<td>{k.p_idx}</td>
				<td>{k.p_name}</td>
				<td><img  width={50} height={50} src={k.p_img}/></td>
				<td>{k.p_price}</td>
				<td>{k.category}</td>
				<td>
					<button className="btn" style={{margin:'0'}}>버튼입니다용</button>
				</td>
			</tr>
			)
			}) : "ERROR"
		} 
		</table>
	</>
	)
}