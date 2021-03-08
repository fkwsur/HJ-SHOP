import React from 'react';

export const AdminDetail = (props) => {

	return(
		<>
		<h2>{props.h2}</h2>

		<form onSubmit={props.onSubmit}>
			<table>
				<tbody>
					<tr>
						<th>No.</th>
						<td>{props.idx}</td>
						<th>이름</th>
						<td><input type="text" name="title" value={props.title} onChange={props.onChange} required/></td>
					</tr>

					<tr>
						<th>썸네일 이미지</th>
						<td><input type="file" name="image" file={props.image} onChange={props.FileChange} /></td>
						<th>상세 이미지</th>
						<td><input type="file" name="detailImage" file={props.detailImage} onChange={props.FileChange} /></td>
					</tr>

					<tr>
					<th>가격</th>
						<td><input type="text" name="price"value={props.price} onChange={props.onChange} required/></td>
					<th>카테고리</th>
						<td>
							<select name="select" value={props.select} onChange={props.onChange} >
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
						<td colspan="3"><textarea type="text" name="content" value={props.content} onChange={props.onChange} required/></td>
					</tr>

				</tbody>
			</table>
			<button type="submit" value="submit">등록하기</button>
		</form>
	</>
	);
}
