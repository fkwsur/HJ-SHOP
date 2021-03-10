import {useEffect, useState} from 'react';
import axios from 'axios';

export const QnaAnswer = ({ props, match }) => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [qnaList, setQnaList] = useState({});
	const [date, setDate] = useState('');

	// useEffect(() => {
	// 	axios.get('/api/ask/qnaNoDate')
	// 	.then(res => {
	// 		setQnaList(res.data[0])
	// 		setDate(res.data[0].sending_date);
	// 	})
	// 	.catch(err => {
	// 		console.log(err);
	// 	})
	// }, [])
		
	const onChange = (e) => {
		const {
			target : {name, value},
		} = e;
		if(name === "title"){
			setTitle(value);
		} else if (name === "content"){
			setContent(value);
		}
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const url = window.location.pathname;
		const id = url.split('/')[3];
		console.log(id);
		axios.post('/api/answer/qnaAnswer',{
			id : id,
			title : title,
			content : content
			}).then(res => {
				alert('답변이 접수되었습니다.')
				window.location.reload();
			}).catch(err => {
				alert('에러가 발생했습니다.')
			});
	};




	return(
			<div class="qna">
				<h2>답변하기</h2>
				<form onSubmit={onSubmit}>
					<table>
						<tbody>
								<tr>
									<th>사용자</th>
									<td>받아올예정</td>
									<th>등록일</th>
									<td>{date}</td>
								</tr>
								
								<tr>
									<th>제목</th>
									<td colSpan="3"><input type="text" name="title" value={title} onChange={onChange} required/></td>
									
								</tr>
								
								<tr>
									<th>답변</th>
									<td colSpan="3"><textarea type="text" name="content" value={content} onChange=	{onChange} required /></td>
								</tr>
						</tbody>
					</table>
					<button type="submit" value="submit">등록하기</button>
				</form>
			</div>
	);
}
