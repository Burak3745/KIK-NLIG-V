import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MovieCard from '../components/MovieCard1'
import { Col, Row } from 'react-bootstrap'
import { getMovieAction } from '../action/movieAction'
import { useLocation, useNavigate, useParams } from "react-router-dom";
import '../css/Films.css'
const Series = () => {
  const movie = useSelector(state => state.movie)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!movie[0]) {
      dispatch(getMovieAction());
    }
  }, [dispatch]);
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const catagory = searchParams.get('catagory');

  const handleChangeCatagory = (e) => {
    const { value } = e.target;
  
    const params = new URLSearchParams(window.location.search);
    params.set("catagory", value);
  
    navigate(`/diziler?${params.toString()}`);
  };
  return (
    <div>
    <div class="select-dropdown  mx-3">
      <select onChange={handleChangeCatagory}>
        <option value=''>All</option>
        <option value="Action & Advanture">Action & Advanture</option>
        <option value="Animation">Animation</option>
        <option value="Comedy">Comedy</option>
        <option value="Crime">Crime</option>
        <option value="Documentary">Documentary</option>
        <option value="Drama">Drama</option>
        <option value="Family">Family</option>
        <option value="Kids">Kids</option>
        <option value="Mystery">Mystery</option>
        <option value="News">News</option>
        <option value="Reality">Reality</option>
        <option value="Sci-Fi & Fantasy">Sci-Fi & Fantasy</option>
        <option value="Soap">Soap</option>
        <option value="Talk">Talk</option>
        <option value="War & Politics">War & Politics</option> 
        <option value="Western">Western</option>
      </select>
      </div>
      <Row>
        {movie.filter((item) =>{
            if(item.type === 'Dizi'){
                return item
            }
        })
        .filter(item => {
          if (catagory=== '' || catagory === null) return item
          else
                 return catagory && item.catagory.toLowerCase().includes(catagory.toLowerCase())
               })
              
        .map((movie) => (
          <Col
            sm={12}
            md={6}
            lg={4}
            xl={3}
            key={movie._id}
            style={{width:"160px", height:"250px"}}
          >
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>

    
    </div>
  )
}

export default Series