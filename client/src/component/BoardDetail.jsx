import React from 'react';

export const BoardDetail = (props) => {

	return(
		<>
		<h2>{props.h2}</h2>
		<form onSubmit={props.onSubmit}>
		<button type="submit" value="submit" className="btn">등록하기</button>
		<button onClick={props.onClick} className={props.deleteBtn}>취소하기</button>
			<table>
				<tbody>
					<tr>
						<th>글쓴이</th>
						<td>{props.id}</td>
						<th>등록일</th>
						<td>{props.date}</td>
					</tr>

					<tr>
						<th >제목</th>
						<td colSpan="3"><input type="text" name="title" value={props.title} onChange={props.onChange} required/></td>
					</tr>
				
					<tr>
						<th>글 내용</th>
						<td colSpan="3"><textarea type="text" name="content" value={props.content} onChange={props.onChange} required/></td>
					</tr>

				</tbody>
			</table>
	
		</form>
	</>
	);
}
