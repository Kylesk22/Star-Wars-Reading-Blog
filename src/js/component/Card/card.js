import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Context } from "../../store/appContext";
import "../../../bootstrap.min (2).css";
import './card.css';




const Card = () => {
    const [people, setPeople] = useState([])
    const [planets, setPlanets] = useState([])
    const [vehicles, setVehicles] =useState([])
    const { store, actions } = useContext(Context);



    function getPeople(page) {
        
        axios
        .get(page)
        .then(res => {
            setPeople(previous => previous.concat(res.data.results));

            for(let i = 0; i < res.data.results.length; i++) {
            (store.allPeople.includes(res.data.results[i].name))? "" : actions.setAllPeople(res.data.results[i].name);
            console.log(store.allPeople)
            }
            if (res.data.next !== null) {
            getPeople(res.data.next);
       
        
            }
            
    })
        .catch(err => console.log(err))
        console.log(page)
    
    }

    function getPlanets(page) {
        
        axios
        .get(page)
        .then(res => {
            setPlanets(previous => previous.concat(res.data.results));
            console.log(res.data.next);
            if (res.data.next !== null) {
            getPlanets(res.data.next);
       
        
            }
            
    })
        .catch(err => console.log(err))
        console.log(page)
    
    }

    function getVehicles(page) {
        
        axios
        .get(page)
        .then(res => {
            setVehicles(previous => previous.concat(res.data.results));
            console.log(res.data.next);
            if (res.data.next !== null) {
            getVehicles(res.data.next);
       
        
            }
            
    })
        .catch(err => console.log(err))
        console.log(page)
    
    }

    useEffect(() => {
        getPeople("https://swapi.dev/api/people");
        getPlanets('https://swapi.dev/api/planets');
        getVehicles('https://swapi.dev/api/vehicles');

        // people.map((val, index) => {
        //     (store.allPeople.includes(val.name))? null : actions.setAllPeople(val.name);
        //     console.log(store.allPeople)
        // });
        

    
    }, [])
    console.log(people);
    return (
        <div>
            <h1>Characters</h1>
            <div className= "scrollbar">
                {people.map((val, index) => {

                return(
                
                <div key = {index} id = {index} className="card" style={{width: "18rem", margin: "10px"}}>
                    <img className="card-img-top" src={(index < 16)? `https://starwars-visualguide.com/assets/img/characters/${index + 1}.jpg` : `https://starwars-visualguide.com/assets/img/characters/${index + 2}.jpg`} alt="Not Available" />
                    <div className="card-body">
                        <h5 className="card-title">{val["name"]}</h5>
                        <p className="card-text">Gender: {val["gender"]}<br/>Hair Color: {val["hair_color"]}<br/>Eye Color: {val["eye_color"]}</p>
                        <div className="row " id = "card-buttons">
                            <Link to={`/single/${index}`} style={{width: "150px"}}>
                                <a href="#" className="btn btn-primary " style={{float: "left"}}>More Info</a>
                            </Link>
                            <div className="col-5 mb-1" style= {{float: "right"}}>
                                <a href="#" role="button" onClick= {() => (store.favorite.includes(val.name))? alert("Already in Favorites!") : actions.setFavorite(val.name) }>
                                    <svg style = {{width: "50px", float: "right"}}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z"/></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                
                )
                })}
            </div>
            <h1>Planets</h1>
            <div className= "scrollbar">
                {planets.map((val, index) => {
                    
                    return( 
                        <div key = {index} className="card" style={{width: "18rem", margin: "10px"}}>
                            
                            <img className="card-img-top" src={(index !== -1)? `https://starwars-visualguide.com/assets/img/planets/${index + 2}.jpg`: `not available`} alt="Card image cap" />
                            <div className="card-body">
                                <h5 className="card-title">{val["name"]}</h5>
                                <p className="card-text">Population: {val["population"]}<br/>Terrain: {val["terrain"]}</p>
                    
                                <a href="#" className="btn btn-primary">More Info</a>
                            </div>
                        </div>


                )})}
            </div>
            <h1>Vehicles</h1>
            <div className= "scrollbar">
                {vehicles.map((val, index) => {

                    return( 
                        <div key = {index} className="card" style={{width: "18rem", margin: "10px"}}>
                            <img className="card-img-top" src={(index !== 1 || 2 || 3 || 5)? `https://starwars-visualguide.com/assets/img/vehicles/${index + 1}.jpg` : "" } alt="Not Available" />
                            <div className="card-body">
                                <h5 className="card-title">{val["name"]}</h5>
                                <p className="card-text">Model: {val["model"]}<br/>Manufacturer: {val["manufacturer"]}</p>
                    
                                <a href="#" className="btn btn-primary">More Info</a>
                                
                            </div>
                        </div>


                )})}
            </div>
        </div>

    )
}

export default Card;