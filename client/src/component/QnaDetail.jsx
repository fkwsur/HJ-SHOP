import {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const QnaDetail = () => {
	const [qnaList, setQnaList] = useState([]);
	const [checkList, setCheckList] = useState({});
	const [check, setCheck] = useState(false);
	const [answerList, setAnswerList] = useState(false);

	useEffect(() => {
		axios.post('/api/ask/qnaId_post',{
			id : window.sessionStorage.getItem('id'),
			}).then(res => {
				console.log(res.data);
				setQnaList(res.data);
			}).catch(err => {
				console.log('실패');
			});
	}, [])

	useEffect(() => {
		// const idx = qnaList.idx;
		// console.log(idx);
		console.log('맞게오니?????');
		axios.post('/api/answer/qnaAnswerList',{
			// idx : idx,
			}).then(res => {
				console.log(res.data[0]);
				console.log('ㅗ');
				setCheckList(res.data);
				console.log(checkList);
				if(checkList.id == "yes"){
					console.log('성공!!!');
				}else{
					console.log('맛감');

				}
				// setCheck(true);
				// console.log(checkList);
				// console.log(checkList.answered);
			}).catch(err => {
				console.log('실패');
			});
	}, [])

	return(
			<div class="qna">
				<button onClick={() => setAnswerList(false)} className="btn">문의내역</button>
				<button onClick={() => setAnswerList(true)} className="btn">문의답변</button>
				{answerList == false ? 
					<table>
							<tr>
									<th>NO</th>
									<th>사용자</th>
									<th>제목</th>
									<th>내용</th>
									<th>등록일</th>
									{/* <th>상태</th> */}
							</tr>
							{ qnaList ? qnaList.map(k => {
									return(
										<tr>
												<td>{k.idx}</td>
												<td>{k.id}</td>
												<td>{k.title}</td>
												<td>{k.content}</td>
												<td>{k.sending_date}</td>
										</tr>
								)
							}) : "ERROR"
							}
						</table>	
						: <UserQnaAnswer />
						}
			</div>
	);
}


export const UserQnaAnswer = ({match}) => {
	const [answerList, setAnswerList] = useState([]);

	useEffect(() => {
		axios.post('/api/answer/qnaAnswerList', {
			// idx : idx		
		})
		.then(res => {
			console.log(res.data);
			setAnswerList(res.data);
		})
		.catch(err => {
			console.log(err);
		})
	}, [])

	return(
		<>
	
		<table>
			<tr>
				<th>NO</th>
				<th>사용자</th>
				<th>제목</th>
				<th>등록일</th>
				<th>처리상태</th>
				<th>답변</th>
			</tr>
			{ answerList ? answerList.map(k => {
				return(
				<>
					<tr>
						<td>{k.idx}</td>
						<td>{k.id}</td>
						<td >{k.title}</td>
						<td>{k.sending_date}</td>
						<td>{k.answered}</td>
						<td>{k.content}</td>
					</tr>
				</>
				)
				}) : "ERROR"
			}
		</table>

		</>
	);
}