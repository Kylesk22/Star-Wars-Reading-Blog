import React, { useContext, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import "./navbar.css"

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const [deleteBtn, setDeleteBtn] = useState(false);
	const [input, setInput] = useState("")
	const history = useHistory();
	

	let removeItem = (index) => {
		store.favorite.splice(index, 1)
	}

	let onSubmit = (e) => {
		e.preventDefault();
		console.log(e.target);
		let inputLower = input.toLowerCase();
		let allPeopleLower = store.allPeople.map((v) =>  {return v.toLowerCase()});
		console.log(inputLower);
		console.log(store.allPeople);

		if (allPeopleLower.includes(inputLower)) {
			let index = allPeopleLower.indexOf(inputLower);
			console.log(index);
			history.push(`/single/${index}`);
			
		 } 
		else alert("Not Found, Check Spelling and Try Again!");
	}

	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<span className="navbar-brand mb-0 h1"><img src="https://www.freepnglogos.com/uploads/star-wars-logo-design-21.png" width="200" alt="star wars logo design" /></span>
			</Link>
			<form onSubmit={(e) => onSubmit(e)}>
				<input type="text" placeholder="Search" onChange= {(e) => {console.log(e.target.value); setInput(e.target.value)}}></input>
			</form>
			<ul className="navbar-nav ml-auto mr-auto" >
				
					<li className="nav-item dropdown" >
					<a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false" style= {{paddingRight: "10px", fontSize: "larger"}}><strong>Favorites</strong></a>
          			<div className="dropdown-menu">
						{store.favorite.map((val, index) =>{
							console.log("store" + index)
							return(
							<li className= "favLi" key = {index} id = {index} onMouseOver = {(e) => {setDeleteBtn(index); console.log(e)}} onMouseOut={() => {setDeleteBtn(false); console.log(deleteBtn)}}>
								<Link to={`/single/${index}`}>						
								{val}
								</Link>
								{(deleteBtn === index)? <button  onClick= {() => removeItem(index)} className= "btn btn-danger" style = {{float: "right"}}  >x</button> : <button  className= "btn btn-danger" style = {{float: "right", display: "none"}}  >x</button>  }
							</li>
						)})}
					</div>
					</li>
				
			</ul>
		</nav>
	);
};

