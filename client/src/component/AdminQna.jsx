import {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const AdminQna = () => {
	const [qnaList, setQnaList] = useState([]);
	// const [date, setDate] = useState('');

	useEffect(() => {
		axios.get('/api/ask/AdminQna')
		.then(res => {
			setQnaList(res.data)
			// setDate(res.data[0].sending_date);
		})
		.catch(err => {
			console.log(err);
		})
	}, [])

	return(
			<div className="board">
					<table>
							<tr>
									<th>NO</th>
									<th>사용자</th>
									<th>제목</th>
									<th>내용</th>
									<th>등록일</th>
									<th>상태</th>
							</tr>
						{ qnaList ? qnaList.map(k => {
									return(
							<tr>
									<td>{k.idx}</td>
									<td>{k.id}</td>
									<td>{k.title}</td>
									<td>{k.content}</td>
									<td>{k.sending_date}</td>
									<td>
										<button className="btn btnDetail" style={{margin:'0'}}> 
												<Link to={`/admin/QnaAnswer/${k.id}`}>
													처리 / 미처리
												</Link>
										</button>
									</td>
							</tr>
								)
							}) : "ERROR"
						}
						</table>	
			</div>
	);
}