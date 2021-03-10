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
	const [deleteList, setDeleteList] = useState([]); 
	const [deleteButton, setDeleteButton] = useState(false); 
	const [yesList, setYesList] = useState(); 
	const [disable, setDisable] = useState(false); 

	useEffect(() => {
		axios.get('/api/product/product_list')
		.then(res => {
			console.log(res);
			setProductList(res.data);
		
		})
		.catch(err => {
			console.log(err);
		})
		axios.get('/api/product/main_count')
		.then(res => {
			setYesList(res.data[0]);
			console.log(yesList);
			if(yesList.count > 7){
				setDisable(true);
				console.log(disable);
				alert('8개까지만 추가할 수 있습니다.')
				return false;
			}	
	
		})
		.catch(err => {
			console.log(err);
		})
	},[]);

	useEffect(() => {
		axios.get('/api/product/product_delete_list')
		.then(res => {
			console.log(res);
			setDeleteList(res.data);
		})
		.catch(err => {
			console.log(err);
		})
	},[]);

	useEffect(() => {
		axios.get('/api/product/product_delete_list')
		.then(res => {
			console.log(res);
			setDeleteList(res.data);
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
			setDeleteButton(false);
	}

	const onDelete = () => {
			setDeleteButton(true);
	}

	const onCheck = (idx) => {
		console.log('설마사카');
		console.log(disable);
		if(yesList.count > 7){
			setDisable(true);
			console.log(disable);
			alert('8개까지만 추가할 수 있습니다.')
			return false;
		} else if(yesList.count < 7){
			setDisable(false);
			console.log(disable);
		}
		axios.post('/api/product/main_yes', {
			p_idx : idx,
		})
		.then(res => {
			alert('수정성공!');
			window.location.reload();
		}).catch(err => {
			alert('수정실패!');
		});
	}
	
	const onCheckNo = (idx) => {
		axios.post('/api/product/main_no', {
			p_idx : idx,
		})
		.then(res => {
			alert('수정성공!');
			window.location.reload();
		}).catch(err => {
			alert('수정실패!');
		});
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
			/> 
			:	
			<div class="product">
					<button onClick={() => setDeleteButton(false)}>상품 리스트</button>
					<button onClick={onClick}>상품 등록</button>
					<button onClick={onDelete}>삭제된 게시글</button>
				
					<table>
						{	deleteButton == false ?
						<>
							<tr>
								<th>NO</th>
								<th>제목</th>
								<th>이미지</th>
								<th>가격</th>
								<th>카테고리</th>
								<th>보기</th>
								<th>노출상태</th>
								<th>노출여부</th>
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
												<td>{k.main}</td>
												<td>
													{k.main == 'no' ?
														<button  disabled={disable} onClick={(e) => {onCheck(k.p_idx)}}>노출하기</button>
														:
														<button onClick={(e) => {onCheckNo(k.p_idx)}}>노출끄기</button>
													}
												</td>
										</tr>
									)
								}) : "ERROR"
							} 
						</>
						:	<>
							<tr>
								<th>NO</th>
								<th>제목</th>
								<th>이미지</th>
								<th>가격</th>
								<th>카테고리</th>
								<th>보기</th>
							</tr>
							{ deleteList ? deleteList.map(k => {
									return(
										<tr>
												<td>{k.p_idx}</td>
												<td>{k.p_name}</td>
												<td><img  width={50} height={50} src={k.p_img}/></td>
												<td>{k.p_price}</td>
												<td>{k.category}</td>
												<td>
													<button>복구하기</button>
												</td>
										</tr>
									)
								}) : "ERROR"
							}
							</>
						}
					</table>
			</div>
			}
	</>
	);
}

