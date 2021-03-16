import {useState,useEffect} from 'react';
// import PayPage from './Pay'
import mainImg from '../image/main.jpg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { faShoppingBasket, faHeart, faUser} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const ProductFormat = (props) => {
	return(
		<>
				<div className="item_wrap">
					<div className="item">
							<img src={props.img}/>
							<div className="caption">
								<h3>{props.itemName}</h3>
								{/* <p>{props.itemContent}</p> */}
								<p style={{fontWeight:'400'}}>{props.price}원</p>
								<Link to={props.url}>View More</Link>
							</div>
					</div>
				</div>
				
		</>
	)
}

export const ProductFormatList = (props) => {
	const [title, setTitle] = useState('');
	const [image, setImage] = useState('');
	const [detailImage, setDetailImage] = useState('');
	const [price, setPrice] = useState('');
	const [select, setSelect] = useState('');
	const [content, setContent] = useState('');
	const [productList, setProductList] = useState({}); 
	const [urlCategory, setUrlCategory] = useState(''); 

	useEffect(() => {
		const urlCate = window.location.pathname.split('/')[2]
		setUrlCategory(urlCate);
		const url = window.location.pathname;
		const p_idx = url.split('/')[3];
		console.log(p_idx);
		axios.post('/api/product/product_detail_list', {
			p_idx : p_idx		
		})
		.then(res => {
			console.log('1');
			console.log(res.data);
			console.log(res.data[0])
			setProductList(res.data[0]);
			setTitle(res.data[0].p_name);
			setPrice(res.data[0].p_price);
			setSelect(res.data[0].category);
			setContent(res.data[0].p_content);
			setImage(res.data[0].p_img);
			setDetailImage(res.data[0].p_img2);
		})
		.catch(err => {
			console.log(err);
		})
	},[]);

	const onClick = (e) => {
		e.preventDefault();
		console.log(productList.p_idx);
		console.log('🍳');
		axios.post('/api/basket', {
			p_idx : productList.p_idx,
			id : window.sessionStorage.getItem('id')
		})
		.then(res => {
			console.log(res);
			alert('장바구니 목록에 추가되었습니다.')
		})
		.catch(err => {
			console.log(err);
			alert('에러가 발생했습니다.');
		})
	}

	const onClick2 = (e) => {
		e.preventDefault();
		console.log(productList.p_idx);
		console.log('🍳');
		console.log(window.sessionStorage.getItem('id'));
		axios.post('/api/favorites', {
			p_idx : productList.p_idx,
			id : window.sessionStorage.getItem('id')
		})
		.then(res => {
			console.log(res);
			alert('찜하기 목록에 추가되었습니다.');
		})
		.catch(err => {
			console.log(err);
			alert('에러가 발생했습니다.')
		})
	}

	return(
		<div class="container">
			<form>
				<Link to={`/product/${urlCategory}`}>
					<button className="btn">취소하기</button>
				</Link>

				<Link to={'/PayPage'}>
					<button className="btn">구매하기</button>
				</Link>

					<button onClick={onClick} className="btn iconBtn"><FontAwesomeIcon icon={faShoppingBasket} /></button>
					<button onClick={onClick2} className="btn iconBtn"><FontAwesomeIcon icon={faHeart} /></button>
				<table>
					<tbody>
						<tr>
							<th>No.</th>
							<td>{productList.p_idx}</td> 
							<th>이름</th>
							<td>{productList.p_name}</td>
						</tr>

						<tr>
							<th>썸네일 이미지</th>
							<td>
								<img src={productList.p_img} />
							</td>
							<th>상세 이미지</th>
							<td>
								<img src={productList.p_img2} />
							</td>
						</tr>

						<tr>
						<th>가격</th>
						<td>{productList.p_price}</td>
						<th>카테고리</th>
						<td>{productList.category}</td>
						</tr>

						<tr>
							<th>글 내용</th>
							<td colspan="3">{productList.p_content}</td>
						</tr>

					</tbody>
				</table>
			</form>
		</div>
	)
}

export const Product = () => {
	const [productList, setProductList] = useState([]);
	
	const getData = (category) => {
		axios.get(`/api/product/category?value=${category}`)
		.then(res => {
			console.log('1')
			console.log(res);
			setProductList(res.data);
			console.log(productList.deleted);
			console.log('🍕🍔🍟🌭');
		})
		.catch(err => {
			console.log(err);
		})
	}


	useEffect(() => {
		console.log('1');
		let url_category = window.location.pathname.split('/')[2];
		let category = "의류";
		console.log(category);
		if(url_category === 'cloth'){
			category = "의류"
		}else if(url_category === 'appliances'){
			category = "가전제품"
		}else if (url_category === 'goods'){
			category = "잡화"
		}else if (url_category === 'food'){
			category = "식품"
		}
		getData(category);
	},[])

	return(
		<div className="container">
			{ window.location.pathname.split('/')[2] == 'cloth' ? <h2>Cloth</h2> : 
				window.location.pathname.split('/')[2] == 'appliances' ? <h2>Appliances</h2>  :
				window.location.pathname.split('/')[2] == 'goods' ? <h2>Goods</h2>  :
				window.location.pathname.split('/')[2] == 'food' ? <h2>Food</h2>  :
			''}
			<div class="products">
		
				{	productList ? productList.map((k) => {
					return(
						<ProductFormat 
							itemName={k.p_name}
							// itemContent={k.p_content}
							img={k.p_img}
							price={k.p_price}
							url={`/product/${window.location.pathname.split('/')[2]}/${k.p_idx}`}
						/>
					);
				}) 
				:""}
			</div>
		</div>
	);
}
