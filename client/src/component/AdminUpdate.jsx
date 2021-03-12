import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const AdminUpdate = ({ props, match }) => {
	const [title, setTitle] = useState('');
	const [image, setImage] = useState('');
	const [detailImage, setDetailImage] = useState('');
	const [price, setPrice] = useState('');
	const [select, setSelect] = useState('');
	const [content, setContent] = useState('');
	const [productList, setProductList] = useState({}); 

	useEffect(() => {
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
		const url = window.location.pathname;
		const p_idx = url.split('/')[3];
		const formData = new FormData();
		formData.append("p_idx", p_idx);
		formData.append("title", title);
		formData.append("price", price);
		formData.append("select", select);
		formData.append("content", content);
		formData.append("image", image);
		formData.append("detailImage", detailImage);
		console.log(formData);
		axios.post('/api/product/AdminUpdate', formData)
		.catch(err => {
			console.log(err);
		})
		.then(res => {
			console.log(res);
			if(res.data === 1){
				alert('수정이 완료');
			} else{
				alert('error');
				return false;
			}
		}).catch(err => {
				alert('수정 실패');
		});
	};

	const handleDelete = () => {
		const url = window.location.pathname;
		const p_idx = url.split('/')[3];
		console.log(p_idx);
		axios.post('/api/product/AdminDelete', {
			p_idx : p_idx		
		})
		.then(res => {
				alert('삭제 완료');
				window.location.href = "/admin";
		}).catch(err => {
				alert('삭제 실패');
		});
	}


	return(
		<div className="container">
			<h2>Admin</h2>
		{window.sessionStorage.getItem('id') === 'admin'
		?
		<>

			<form onSubmit={onSubmit}>
			<button type="submit" value="submit" className="btn">수정하기</button>
				<button type="button" onClick={handleDelete} className="btn">삭제하기</button>
				<Link to="/admin"><button className="btn">취소하기</button></Link>
				<table>
					<tbody>
						<tr>
							<th>No.</th>
							<td>{productList.p_idx}</td> 
							<th>이름</th>
							<td><input type="text" name="title" value={title} onChange={onChange} 	required/></td>
						</tr>

						<tr>
							<th>썸네일 이미지</th>
							<td>
								<input type="file" name="image" file={image} onChange={FileChange} />
							</td>
							<th>상세 이미지</th>
							<td>
								<input type="file" name="detailImage" file={detailImage} onChange={FileChange} />
							</td>
						</tr>

						<tr>
						<th>가격</th>
							<td><input type="text" name="price"value={price} onChange={onChange} 	required/></td>
						<th>카테고리</th>
							<td>
								<select name="select" value={select} onChange={onChange} >
									<option value="" disabled>선택하기</option>
									<option value="의류">의류</option>
									<option value="가전제품">가전제품</option>
									<option value="잡화">잡화</option>
									<option value="식품">식품</option>
								</select>
							</td>
						</tr>

						<tr>
							<th>글 내용</th>
							<td colspan="3"><textarea type="text" name="content" value={content} 	onChange={onChange} required/></td>
						</tr>

					</tbody>
				</table>
			</form>
		</>
		: 
		<p>접근 권한이 없습니다.</p>
		}
	</div>
	);
}
