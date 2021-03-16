import {useEffect, useState} from 'react';
import {BoardDetail} from './BoardDetail';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const Board = ({match}) => {
	const [showDetail, setShowDetail] = useState(false); 
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [list, setList] = useState([]);


	useEffect(() => {

		console.log(list.writer);
		console.log('워후 보여줘요!!');
		
		axios.get('/api/board/board_list')
		.then(res => {
			console.log(res.data);
			setList(res.data);
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
		} else if (name === "content"){
			setContent(value);
		}
	};

	const onSubmit = (e) => {
		e.preventDefault();
	
		axios.post('/api/board/board', {
			title : title,
			content : content,
			id : window.sessionStorage.getItem('id'),
		})
		.then(res => {
				alert('등록이 완료');
				window.location.reload();
		}).catch(err => {
				alert('등록 실패');
		});
	};


    return(
		<div className="container">
			<h2>Bulletin Board</h2>
        <div className="board">
				{showDetail == true  ?
					<>
				
					<BoardDetail
					id={window.sessionStorage.getItem('id')}
					date="20.01.01"
					title={title} 
					content={content}
					onSubmit={onSubmit} 
					onChange={onChange} 
					onClick={() => setShowDetail(false)}
					deleteBtn="btn"
					/>
					{/* <button onClick={} className="btn btn_delete">취소하기</button> */}
					</>
					:	
					<>
						<button className="btn" onClick={() => setShowDetail(true)}>등록하기</button>
							<table>
								<tr>
										<th>NO</th>
										<th>제목</th>
										<th>내용</th>
										<th>글쓴이</th>
										<th>등록일</th>
										<th>상세보기</th>
								</tr>
						{list ? list.map(k => {
								return(
            	        <tr>
            	            <td>{k.idx}</td>
            	            <td>{k.title}</td>
            	            <td>{k.content}</td>
            	            <td>{k.writer}</td>
            	            <td>{k.created}</td>
            	            <td>
													<button> 
														<Link to={`/board/boardUpdate/${k.idx}`}>상세보기</Link>
													</button>
													</td>
            	        </tr>
								)
							}) : "Error"
						}
							</table>	
					</>
				}
				</div>
    </div>
    );
}

export const BoardUpdate = () => {
	const [showDetail, setShowDetail] = useState(false); 
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [comment, setComment] = useState('');
	const [commentList, setCommentList] = useState([]);
	const [boardList, setBoardList] = useState({}); 

	useEffect(() => {
		const url = window.location.pathname;
		const idx = url.split('/')[3];
		console.log(idx);
		axios.post('/api/board/board_detail', {
			idx : idx		
		})
		.then(res => {
			console.log('1');
			console.log(res.data);
			console.log(res.data[0])
			setTitle(res.data[0].title);
			setContent(res.data[0].content);
			setBoardList(res.data[0]);
		})
		.catch(err => {
			console.log(err);
		})

		axios.get(`/api/shop_comment/comment_list?value=${idx}`)
		.then(res => {
			console.log(res);
			console.log('☀☀☀☀🌜🌜🌜🌜🌛🌛🌛🌚🌚');
			setCommentList(res.data);
			console.log(commentList);
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
		} else if (name === "content"){
			setContent(value);
		} else if (name === "comment")
			setComment(value);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const url = window.location.pathname;
		const idx = url.split('/')[3];
		axios.post('/api/board/boardUpdate', {
			idx : idx,
			title : title,
			content : content,
		})
		.catch(err => {
			console.log(err);
		})
		.then(res => {
				alert('수정이 완료');
				window.location.href = "/board";
		
		}).catch(err => {
				alert('수정 실패');
		});
	};

	const handleDelete = () => {
		const url = window.location.pathname;
		const idx = url.split('/')[3];
		console.log(idx);
		axios.post('/api/board/boardDelete', {
			idx : idx		
		})
		.then(res => {
				alert('삭제 완료');
				window.location.href = "/board";
		}).catch(err => {
				alert('삭제 실패');
		});
	}

	const onClickBtn = (e) => {
		if(!window.sessionStorage.getItem('id')){
			alert('로그인을 해주세요.');
			return false;
		}
		e.preventDefault();
		console.log(boardList.idx);
		console.log('🐱‍👓🐱‍🐉🐱‍💻');
		axios.post('/api/shop_comment', {
			id : window.sessionStorage.getItem('id'),
			comment : comment,
			idx : boardList.idx
		})
		.then(res => {
			console.log(res);
			alert('댓글 등록완료')
			window.location.reload();
		}).catch(err => {
			console.log(err);
			alert('댓글 등록실패')
		});
	}



	return(
		<div className="container">
			<h2>Bulletin Board</h2>
			{window.sessionStorage.getItem('id') == boardList.writer ?
			<form onSubmit={onSubmit}>
				<button type="submit" value="submit" className="btn">수정하기</button>
				<button type="button" onClick={handleDelete} className="btn">삭제하기</button>
				<Link to="/board"><button className="btn">취소하기</button></Link>
				<table>
					<tr>
							<th>NO</th>
							<td>{boardList.idx}</td>
							<th>글쓴이</th>
							<td>{boardList.writer}</td>
					</tr>
					<tr>
							<th>제목</th>
							<td><input type="text" name="title" value={title} onChange={onChange} 	required/></td>
							<th>등록일</th>
							<td>{boardList.created}</td>
					</tr>
					<tr>
						<th>내용</th>
						<td colspan="3">
							<textarea type="text" name="content" value={content} 	onChange={onChange} required/>
						</td>
					</tr>
				</table>	 

				<p style={{ marginTop: '50px'}}>댓글 리스트</p>
				<table>
					<tr>
						<th>아이디</th>
						<th>댓글</th>
					</tr>

					<td>{window.sessionStorage.getItem('id')}</td>
					<td>
						<input type="text" name="comment" value={comment} onChange={onChange} 	required/>
						<button onClick={onClickBtn} className="btn" style={{margin:'0 0 0 25px'}}>댓글 달기</button>
					</td>
				{commentList ? commentList.map(k => {
					return(
					<tr>
						<td>{k.writer}</td>
						<td>{k.content}</td>
					</tr>
					)
					}) : "Error"
				}
				</table>
			</form>
			: 
			<form>
				<table>
					<tr>
							<th>NO</th>
							<td>{boardList.idx}</td>
							<th>글쓴이</th>
							<td>{boardList.writer}</td>
					</tr>
					<tr>
							<th>제목</th>
							<td>{boardList.title}</td>
							<th>등록일</th>
							<td>{boardList.created}</td>
					</tr>
					<tr>
						<th>내용</th>
						<td colSpan="3">{boardList.content}</td>
					</tr>
					<tr>
						<th>댓글</th>
						<td colSpan="3">ㅁㄴㅇ</td>
					</tr>
				</table>	

				<p style={{ marginTop: '50px'}}>댓글 리스트</p>
				<table>
					<tr>
						<th>아이디</th>
						<th>댓글</th>
					</tr>

					<td>{window.sessionStorage.getItem('id')}</td>
					<td>
						<input type="text" name="comment" value={comment} onChange={onChange} 	required/>
						<button onClick={onClickBtn} className="btn" style={{margin:'0 0 0 25px'}}>댓글 달기</button>
					</td>
				{commentList ? commentList.map(k => {
					return(
					<tr>
						<td>{k.writer}</td>
						<td>{k.content}</td>
					</tr>
					)
					}) : "Error"
				}
				</table>
			</form>
			}
	</div>

	)
}
