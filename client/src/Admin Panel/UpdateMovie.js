import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import '../css/AddMovie.css'
import Form from 'react-bootstrap/Form';
import { Navigate, useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'
import ReactFileBase64 from 'react-file-base64'
import { updateMovieAction } from '../action/movieAction';
import { getIdMovie } from '../axios/index.js'
import { Col, Row } from 'react-bootstrap';
import ActorsCombo from './ActorsCombo.js';
import { getActorsAction } from '../action/actorsAction.js';
import { IoClose } from "react-icons/io5";
const UpdateMovie = ({ id }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [movieData, setMovieData] = useState({
        name: '', time: '', link: '', country: '', year: '', score: '',
        description: '', director: '', company: '', actors: '', season: '', type: '', catagory: '', image: '', player: []
    })

    const actors = useSelector((state) => state.actors);

    useEffect(() => {
        if (!actors[0]) {
            dispatch(getActorsAction());
        }
    }, [dispatch]);



    useEffect(() => {
        const getMemo = async () => {
            const { data } = await getIdMovie(id)
            setMovieData(data)
        }

        getMemo()
    }, [id])

    const movieUpdate = (e) => {
        e.preventDefault()
        dispatch(updateMovieAction(id, movieData))
        if (movieData.type == "Film") {
            navigate('/movielist')
        }
        else {
            navigate('/serieslist')
        }
    }

    const addPlayer = (newPlayer) => {
        const currentData = { ...movieData };

        currentData.player.push(newPlayer);
        setMovieData(currentData);
    };

    const deletePlayer = (playerId) => {
        const currentData = { ...movieData };

        const playerIndex = currentData.player.findIndex(
            (player) => player.actorsid === playerId
        );

        // Eğer oyuncu bulunduysa, listeden çıkar
        if (playerIndex !== -1) {
            currentData.player.splice(playerIndex, 1);
            setMovieData(currentData);
        }
    };

    const handleAddButtonClick = (e) => {
        const actor1 = actors.filter((item) => e === item._id);
        if (movieData.player.filter((item) => e === item.actorsid).length == 0) {
            const actor = actor1[0]
            const newPlayer = { name: actor.name, image: actor.image, actorsid: actor._id };

            addPlayer(newPlayer);
        }
    };

    const handleDeleteButtonClick = (player) => {
        const playerIdToDelete = player.actorsid;
        deletePlayer(playerIdToDelete);

    };


    const [user, setUser] = useState()
    const userState = useSelector((state) => state.user)
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'))
        setUser(userData)
    }, [userState])
    const userType = user && user.userType
    if (!localStorage.getItem("user")) {
        return <Navigate to="/login" />;
    }
    else if (userType != "ADMIN") {
        navigate("/browse");
    } else {

        return (

            <div class="AddMovie">

                <div class="float-child">
                    <div class="green"><SideBar /></div>
                </div>

                <div class="float-child">
                    <div class="blue ">

                        <div className='flex-container mx-2'>
                            <div class="form__group field py-2 px-2">
                                <input type="input" class="form__field" placeholder="Name"
                                    name="name" id='name' value={movieData.name} required onChange={(e) => setMovieData({ ...movieData, name: e.target.value })} />
                                <label for="Film Adı" class="form__label">Adı</label>
                            </div>
                            <div class="form__group field py-2 px-2">
                                <input type="input" class="form__field" placeholder="Yapımcı Şirketi"
                                    name="name" id='name' value={movieData.company} required onChange={(e) => setMovieData({ ...movieData, company: e.target.value })} />
                                <label for="Yapımcı Şirketi" class="form__label">Yapımcı Şirketi</label>
                            </div>


                        </div>
                        <div className='flex-container mx-2'>

                            <div class="form__group field py-2 px-2">
                                <input type="input" class="form__field" placeholder="Yönetmeni"
                                    name="name" id='name' value={movieData.director} required onChange={(e) => setMovieData({ ...movieData, director: e.target.value })} />
                                <label for="Yönetmeni" class="form__label">Yönetmeni</label>
                            </div>
                            <div class="form__group field py-2 px-2">
                                <input type="input" class="form__field" placeholder="Ülkesi"
                                    name="name" id='name' value={movieData.country} required onChange={(e) => setMovieData({ ...movieData, country: e.target.value })} />
                                <label for="Ülkesi" class="form__label">Ülkesi</label>
                            </div>
                        </div>
                        <div className='flex-container mx-2'>

                            <div class="form__group field py-2 px-2">
                                <input type="input" class="form__field" placeholder="Konusu"
                                    name="name" id='name' value={movieData.description} required onChange={(e) => setMovieData({ ...movieData, description: e.target.value })} />
                                <label for="Konusu" class="form__label">Konusu</label>
                            </div>
                            <div class="form__group field py-2 px-2">
                                <input type="input" class="form__field" placeholder="IMDB Puanı"
                                    name="name" id='name' value={movieData.score} required onChange={(e) => setMovieData({ ...movieData, score: e.target.value })} />
                                <label for="IMDB Puanı" class="form__label">IMDB Puanı</label>
                            </div>
                        </div>
                        <div>
                            {
                                movieData.type === "Film" ? (
                                    <div>
                                        <div className='flex-container mx-2'>
                                            <div class="form__group field py-2 px-2">
                                                <input type="input" class="form__field" placeholder="Linki"
                                                    name="name" id='name' value={movieData.link} required onChange={(e) => setMovieData({ ...movieData, link: e.target.value })} />
                                                <label for="Linki" class="form__label">Linki</label>
                                            </div>
                                            <div class="form__group field py-2 px-2">
                                                <input type="input" class="form__field" placeholder="Süresi"
                                                    name="name" id='name' value={movieData.time} required onChange={(e) => setMovieData({ ...movieData, time: e.target.value })} />
                                                <label for="Süresi" class="form__label">Süresi</label>
                                            </div>
                                        </div>
                                        <div className='flex-container mx-2'>

                                            <div class="form__group field py-2 px-2">
                                                <input type="input" class="form__field" placeholder="Yapım Yılı"
                                                    name="name" id='name' value={movieData.year} required onChange={(e) => setMovieData({ ...movieData, year: e.target.value })} />
                                                <label for="Yapım Yılı" class="form__label">Yapım Yılı</label>
                                            </div>
                                            <div class="form__group field py-2 px-2">
                                                <input type="input" class="form__field" placeholder="IMDB Puanı"
                                                    name="name" id='name' value={movieData.image} required onChange={(e) => setMovieData({ ...movieData, image: e.target.value })} />
                                                <label for="IMDB Puanı" class="form__label">Resim</label>
                                            </div>
                                        </div>
                                    </div>
                                ) : (<div><div className='flex-container mx-2'>
                                    <div class="form__group field py-2 px-2">
                                        <input type="input" class="form__field" placeholder="Süresi"
                                            name="name" id='name' value={movieData.season} required onChange={(e) => setMovieData({ ...movieData, season: e.target.value })} />
                                        <label for="Sezon Sayısı" class="form__label">Sezon Sayısı</label>
                                    </div>
                                    <div class="form__group field py-2 px-2">
                                        <input type="input" class="form__field" placeholder="IMDB Puanı"
                                            name="name" id='name' value={movieData.image} required onChange={(e) => setMovieData({ ...movieData, image: e.target.value })} />
                                        <label for="IMDB Puanı" class="form__label">Resim</label>
                                    </div>

                                </div>
                                </div>)
                            }
                        </div>
                        <div className='flex-container'>
                            <div class="form__group field">
                                <div class="select-dropdown mx-3">

                                    <select value={movieData.catagory} onChange={(e) => setMovieData({ ...movieData, catagory: e.target.value })}>
                                        <option>Choose Catagory</option>
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
                                        <option value="Talk','War & Politics">Talk','War & Politics</option>
                                        <option value="Western">Western</option>
                                    </select>
                                </div>
                                <div class="select-dropdown mx-3 my-2">

                                    <select value={movieData.type} onChange={(e) => setMovieData({ ...movieData, type: e.target.value })}>

                                        <option value="Film">Film</option>
                                        <option value="Dizi">Dizi</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form__group field py-3 px-2">
                                <div className='py-2'>
                                    <ActorsCombo handleMovieSelect={handleAddButtonClick} />
                                </div>
                                <ReactFileBase64
                                    type='file'
                                    multiple={false}
                                    onDone={({ base64 }) => {
                                        setMovieData({ ...movieData, image: base64 })
                                    }}

                                />
                            </div>

                        </div>
                        <button onClick={movieUpdate} className='button-66 ' role="button-66">Güncelle</button>
                        <Row className='my-5 mx-2'>
                            {movieData.player.map((item) => (

                                <Col
                                    sm={12}
                                    md={6}
                                    lg={4}
                                    xl={3}
                                    key={item._id}
                                    style={{ width: "150px", height: "80px" }}
                                >
                                    <div style={{
                                        background: "white", borderRadius: "5px", textAlign: "center",
                                        position: "relative", cursor: "pointer"
                                    }} onClick={() => handleDeleteButtonClick(item)} >
                                        <h5 className='my-5' style={{ fontSize: "16px" }}>{item.name} <IoClose color='#e44002' /></h5>
                                    </div>
                                </Col>

                            ))}
                        </Row>
                    </div>

                </div>


            </div>
        )
    }
};

export default UpdateMovie