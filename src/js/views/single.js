import React, { useState, useEffect, useContext } from "react";
import PropTypes, { object } from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import axios from "axios";
import "../../bootstrap.min (2).css";
import "../../styles/single.css";

export const Single = props => {
	const { store, actions } = useContext(Context);
	const { userId } = useParams();
	const [person, setPerson] = useState({});
	const [planet, setPlanet] = useState({})
	// const [films, setFilms] = useState([])

	useEffect(()=> {
		axios
		.get(`https://swapi.dev/api/people/${parseInt(userId) + 1}`)
		.then(res => {
			if (parseInt(userId) < 16) {
				setPerson(res.data);
				
			}
			else {
				axios
				.get(`https://swapi.dev/api/people/${parseInt(userId) + 2}`)
				.then(res => setPerson(res.data))
			}

			// for(let i = 0; i < person.films.length; i++) {
			// 	console.log(person.films);
			// 	axios
			// 	.get(person.films[i]) 
			// 	.then(res => {
						
			// 		setFilms(previous => previous.concat(res.data.title))
						
						
			// 	})
			
			// }
		})
		.then(res => {console.log(res); })
		.catch(err => console.log(err))

		axios
		.get(`https://swapi.dev/api/planets/${parseInt(userId) + 1}`)
		.then(res => {setPlanet(res.data)})
		.catch(err => console.log(err));

		
		
		
	}, [userId])

	
	
	
	
	

	return (
		<div className="jumbotron"> 
			<h1 className="display-4" style={{textAlign: "center"}}>{person.name}</h1>
			<div className="row" style={{display: "flex"}}>
				<hr className="my-4" />
				<div className="col-6" id="pic">
					<img src= {(userId < 16)? `https://starwars-visualguide.com/assets/img/characters/${parseInt(userId) + 1}.jpg` : `https://starwars-visualguide.com/assets/img/characters/${parseInt(userId) + 2}.jpg`} alt="Not Available" />
				</div> 
				<div className="col-1"></div>
				<div className="col-5" id="pInfo">
				
					<h4>Gender: {String(person.gender).charAt(0).toUpperCase() + String(person.gender).slice(1)}</h4>
					<br/>
					<h4>Birth Year: {String(person.birth_year).charAt(0).toUpperCase() + String(person.birth_year).slice(1)}</h4>
					<br/>
					<h4>Eye Color: {String(person.eye_color).charAt(0).toUpperCase() + String(person.eye_color).slice(1)}</h4>
					<br/>
					<h4>Hair Color: {String(person.hair_color).charAt(0).toUpperCase() + String(person.hair_color).slice(1)}</h4>
					<br/>
					<h4>Height: {String(person.height).charAt(0).toUpperCase() + String(person.height).slice(1)}{console.log(person)}</h4>
					<br/>
					<h4>Mass: {String(person.mass).charAt(0).toUpperCase() + String(person.mass).slice(1)}{console.log(planet)}</h4>
					<br/>
					<h4>HomeWorld: {planet.name}</h4>
					<br/>
					{/* <h4>Movies: {films.map(title => {return <ul style = {{fontStyle: "italic"}}>{title}</ul>}) } {console.log(films)}</h4> */}
					
				</div>	
			</div>
			<div className="row" style={{display: "flex"}}>
				<div className="col-span">
					
				</div>
			</div>

			<Link to="/">
				<span className="btn btn-warning btn-lg" href="#" role="button" style={{marginLeft: "275px", width: "150px", marginTop: "10px"}}>
					Home  
				</span>
			</Link>
		</div>
	);
};

Single.propTypes = {
	match: PropTypes.object
};
