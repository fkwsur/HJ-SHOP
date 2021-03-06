import axios from 'axios';
import e from 'cors';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const AdminDetail = () => {
	const [title, setTitle] = useState('');
	const [image, setImage] = useState('');
	const [detailImage, setDetailImage] = useState('');
	const [price, setPrice] = useState('');
	const [select, setSelect] = useState('');
	const [content, setContent] = useState('');

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
			} else{
				alert('error');
				return false;
			}
		}).catch(err => {
				alert('등록 실패');
		});
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

	return(
		<>
		<button><Link to="/admin">뒤로가기</Link></button>
		<h2>상세페이지</h2>

		<form onSubmit={onSubmit}>
			<table>
				<tbody>
					<tr>
						<th>No.</th>
						<td>1</td>
						<th>이름</th>
						<td><input type="text" name="title" value={title} onChange={onChange} required/></td>
					</tr>

					<tr>
						<th>썸네일 이미지</th>
						<td><input type="file" name="image" file={image} onChange={FileChange} /></td>
						<th>상세 이미지</th>
						<td><input type="file" name="detailImage" file={detailImage} onChange={FileChange} /></td>
					</tr>

					<tr>
					<th>가격</th>
						<td><input type="text" name="price"value={price} onChange={onChange} required/></td>
					<th>카테고리</th>
						<td>
							<select value={select} onChange={onChange} >
								<option>의류</option>
								<option>가전제품</option>
								<option>잡화</option>
								<option>식품</option>
							</select>
						</td>
					</tr>

					<tr>
						<th>글 내용</th>
						<td colspan="3"><textarea type="text" name="content" value={content} onChange={onChange} required/></td>
					</tr>

				</tbody>
			</table>
			<button type="submit" value="submit">등록하기</button>
		</form>
	</>
	);
}