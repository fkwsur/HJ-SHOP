import {useState,useEffect} from 'react';
import mainImg from '../image/main.jpg';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const ProductFormat = (props) => {
	return(
		<>
				<div className="item_wrap">
					<div className="item">
							<img src={props.img}/>
							<div className="caption">
								<h3>{props.itemName}</h3>
								<p>{props.itemContent}</p>
								<a href="#">View More</a>
							</div>
					</div>
				</div>
				
		</>
	)
}

export const Product = () => {
	const [urlCategory, setUrlCategory] = useState('');
	const [categoryType, setCategoryType] = useState([]);
	
	useEffect(() => {
		const url = window.location.pathname;
		console.log(window.location.pathname);
		const category = url.split('/')[2];
		setUrlCategory(category);
		console.log(category);
		console.log('▲');
		axios.post('/api/product/category', {
			category : category
		})
		.then(res => {
			setCategoryType(res.data)
			console.log(res.data);
		})
		.catch(err => {
			console.log(err);
		})
	},[])

	return(
		<div className="container">
			{ window.location.pathname.split('/')[2] == 'cloth' ? <h2>Cloth</h2> : 
				window.location.pathname.split('/')[2] == 'appliances' ? <h2>Appliances</h2>  :
				window.location.pathname.split('/')[2] == 'goods' ? <h2>Goods</h2>  :
				window.location.pathname.split('/')[2] == 'food' ? <h2>Food</h2>  :
			''}
			<div class="products">

				{	window.location.pathname.split('/')[2] == 'cloth' ? 
					<ProductFormat 
						itemName="asd" 
						itemContent="111111"
						img={mainImg}
					/> 
				:
					window.location.pathname.split('/')[2] == 'appliances' ? 
					<ProductFormat 
						itemName="asd" 
						itemContent="222222"
						img={mainImg}
					/>  
				:
					window.location.pathname.split('/')[2] == 'goods' ? 
					<ProductFormat 
						itemName="asd" 
						itemContent="333333"
						img={mainImg}
					/>  
				:
					window.location.pathname.split('/')[2] == 'food' ? 
					<ProductFormat 
						itemName="asd" 
						itemContent="444444"
						img={mainImg}
					/>   
				:	''
				}

			</div>
		</div>
	);
}
