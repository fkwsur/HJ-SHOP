import {useEffect, useState} from 'react';
import {AdminDetail} from './AdminDetail';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const ProductManage = (props) => {
	const [title, setTitle] = useState('');
	const [image, setImage] = useState('');
	const [detailImage, setDetailImage] = useState('');
	const [price, setPrice] = useState('');
	const [select, setSelect] = useState('');
	const [content, setContent] = useState('');
	const [showDetail, setShowDetail] = useState(false); 
	const [showUpdate, setShowUpdate] = useState(false); 
	const [productList, setProductList] = useState([]); 

	useEffect(() => {
		axios.get('/api/product/product_list')
		.then(res => {
			console.log(res);
			setProductList(res.data);
		})
		.catch(err => {
			console.log(err);
		})
	},[]);
	
	const onChange = (e) => {
		const {
			target : {name, value},
		} = e;
	if(name === "title"){
		setTitle(value);
	} else if (name === "price"){
		setPrice(value);
	} else if(name === "select"){
		setSelect(value);
	} else if (name === "content"){
		setContent(value);
	}
};

	const FileChange = (e) => {
		const {
			target : {name, files},
		} = e;
		if(name === "image"){
			setImage(files[0]);
		} else if(name === "detailImage"){
			setDetailImage(files[0]);
		}
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("title", title);
		formData.append("price", price);
		formData.append("select", select);
		formData.append("content", content);
		formData.append("image", image);
		formData.append("detailImage", detailImage);
		console.log(formData);
		axios.post('http://localhost:8080/api/product/product_add_item', formData)
		.catch(err => {
			console.log(err);
		})
		.then(res => {
			console.log(res);
			if(res.data === 1){
				alert('등록이 완료');
				setShowDetail(false);
			} else{
				alert('error');
				return false;
			}
		}).catch(err => {
				alert('등록 실패');
		});
	};

	const onClick = () => {
			setShowDetail(!showDetail);
	}
	

	return(
			<>
			{showDetail == true  ?

			<AdminDetail
					h2="등록페이지"
					onSubmit={onSubmit} 
					onChange={onChange} 
					FileChange={FileChange} 
					title={title} 
					image={image} 
					detailImage={detailImage}
					price={price}
					select={select}
					content={content}
					// register="등록하기"
			/> 
			// : showUpdate == true ? 
			// <AdminDetail
			// 		h2="상세페이지"
			// 		onSubmit={onSubmit} 
			// 		onChange={onChange} 
			// 		FileChange={FileChange} 
			// 		title={title} 
			// 		image={image} 
			// 		detailImage={detailImage}
			// 		price={price}
			// 		select={select}
			// 		content={content}
			// /> 
			:	
			<div class="product">
					<button onClick={onClick}>상품 등록</button>
					<table>
							<tr>
									<th>NO</th>
									<th>제목</th>
									<th>이미지</th>
									<th>가격</th>
									<th>카테고리</th>
									<th>보기</th>
							</tr>
							{ productList ? productList.map(k => {
									return(
										<tr>
												<td>{k.p_idx}</td>
												<td>{k.p_name}</td>
												<td><img  width={50} height={50} src={k.p_img}/></td>
												<td>{k.p_price}</td>
												<td>{k.category}</td>
												<td>
													<button> 
														<Link to={`/admin/AdminUpdate/${k.p_idx}`}>상세보기</Link>
													</button>
												</td>
										</tr>
									)
								}) : "ERROR"
							}
					</table>
			</div>
			}
	</>
	);
}