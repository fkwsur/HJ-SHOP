import {useEffect, useState} from 'react';
import axios from 'axios';

export const UserQna = (props) => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [qnaList, setQnaList] = useState({});
	const [date, setDate] = useState('');

	useEffect(() => {
		axios.get('/api/ask/qnaNoDate')
		.then(res => {
			setQnaList(res.data[0])
			setDate(res.data[0].sending_date);
		})
		.catch(err => {
			console.log(err);
		})
	}, [])
		
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
		axios.post('/api/ask/qna',{
			id : window.sessionStorage.getItem('id'),
			title : title,
			content : content
			}).then(res => {
				alert('문의내용이 접수되었습니다.')
				window.location.reload();
			}).catch(err => {
				alert('에러가 발생했습니다.')
			});
	};

	const onClick = () => {
		window.location.reload()
	}


	return(
			<div class="qna">
				<form onSubmit={onSubmit}>
					<button type="submit" value="submit" className="btn">등록하기</button>
					<button onClick={onClick} className="btn">취소하기</button>
					<table>
						<tbody>
								<tr>
									<th>사용자</th>
									<td>{window.sessionStorage.getItem('id')}</td>
									<th>등록일</th>
									<td>{date}</td>
								</tr>
								
								<tr>
									<th>제목</th>
									<td colSpan="3"><input type="text" name="title" value={title} onChange={onChange} required/></td>
									
								</tr>
								
								<tr>
									<th>글 내용</th>
									<td colSpan="3"><textarea type="text" name="content" value={content} onChange=	{onChange} required /></td>
								</tr>
						</tbody>
					</table>
				</form>
			</div>
	);
}
