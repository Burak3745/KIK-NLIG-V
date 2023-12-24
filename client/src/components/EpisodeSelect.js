import React, { useEffect, useState } from 'react'
import { deleteSeriesAction, getSeriesAction } from '../action/seriesAction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { BsFillCollectionPlayFill } from 'react-icons/bs'
import { MdBrowserUpdated } from 'react-icons/md'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import '../css/AddMovie.css'
import { Link } from 'react-router-dom';
import { getIdMovie, updateSeries } from '../axios';
import { BsStarFill } from 'react-icons/bs';
import SideBar from '../Admin Panel/SideBar';
import SeriesCard from '../components/SeriesCard'
import { Col, Row, Table } from 'react-bootstrap';
import { MdDashboard } from "react-icons/md";
const EpisodeSelect = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const episodes = useSelector(state => state.series)
    useEffect(() => {
        if (!episodes[0]) {
            dispatch(getSeriesAction());
        }
    }, [dispatch]);
    const navigate = useNavigate();
    const playEpisode = (id) => {
        navigate(`/playseries/${id}`);
    }

    const [movieData, setMovieData] = useState({
        name: '', time: '', link: '', country: '', year: '', score: '',
        description: '', director: '', company: '', actors: '', season: '', type: '', catagory: '', image: ''
    })

    const [click, setClick] = useState('Hakkında')

    console.log(click)
    useEffect(() => {
        const getMemo = async () => {
            const { data } = await getIdMovie(id)
            setMovieData(data)
        }

        getMemo()
    }, [id])

    function scrollToTop() {
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        scrollToTop();
    }, []);

    const [currentPage, setCurrentPage] = useState(1)

    function changeCPage(id) {
        setCurrentPage(id)
    }

    const deleteSeries = (id) => {
        dispatch(deleteSeriesAction(id))
    }
    const UpdateSeries = (id2) => {

        navigate(`/updateseries/${id}/${id2}`);

    }
    const DashboardSeries = (id3) => {

        navigate(`/seriesdashboard/${id}/${id3}`);

    }

    const navigatee = (id) => {
        navigate(`/actors/${id}`);
    }
    const [user, setUser] = useState()
    const userState = useSelector((state) => state.user)
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'))
        setUser(userData)
    }, [userState])
    const userType = user && user.userType

    if (movieData.type == "Film") {
        return (navigate(`/filmler`))
    }
    else {
        return (
            <div>
                <div class="float-child">

                    <div class="green"><SeriesCard movie={movieData} /></div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "white", background: "#06001d", borderRadius: "20px" }}>
                    <h3 className='mx-2 my-2' style={{ cursor: "pointer", position: "relative" }} onClick={() => setClick('Hakkında')} >Hakkında</h3>
                    <h3 className='mx-2 my-2' style={{ cursor: "pointer", position: "relative" }} onClick={() => setClick('Bölümler')}>Bölümler</h3>
                    <h3 className='mx-2 my-2' style={{ cursor: "pointer", position: "relative" }} onClick={() => setClick('Oyuncular')} >Oyuncular</h3>
                </div>
                {click === 'Bölümler' ? (<div class="float-child" style={{ background: "#06001d", borderRadius: "20px", width: "840px" }}>
                    <Table >
                        <thead className='text-light'>
                            <th>Sezonlar</th>
                            <th>Bölümler</th>
                            <th>Bölüm Adı</th>
                        </thead>
                        <tbody className='text-muted'>
                            <tr>
                                <td>
                                    <div className='text-white'>
                                        {Array.from(Array(Math.floor(Number(movieData.season)))).map((_, i) => (
                                            <div>
                                                <h4 style={{ position: "absolute", cursor: "pointer" }} onClick={() => changeCPage(i + 1)}>{i + 1}</h4> <br /> <br />
                                            </div>
                                        ))}
                                    </div>
                                </td>
                                <td>
                                    {episodes.filter((item) => {
                                        if (item.foreignkey == id) {
                                            return item
                                        }
                                        else {
                                            return
                                        }
                                    })
                                        .filter((item2) => {
                                            if (currentPage == item2.season) {
                                                return item2
                                            }
                                        })
                                        .map((episode) => (
                                            <div>
                                                <h6 className='text-white' onClick={() => playEpisode(episode._id)} style={{ position: "absolute", cursor: "pointer" }}>{episode.season}.Sezon {episode.episode}.Bölüm</h6>
                                                <br /> <br />
                                            </div>


                                        ))}

                                </td>
                                <td>
                                    {episodes.filter((item) => {
                                        if (item.foreignkey == id) {
                                            return item
                                        }
                                        else {
                                            return
                                        }
                                    })
                                        .filter((item2) => {
                                            if (currentPage == item2.season) {
                                                return item2
                                            }
                                        }).map((episode) => (
                                            <div>
                                                <h6 className=' text-white' style={{ position: "absolute", cursor: "pointer" }}>{episode.name}</h6>  <br /> <br />
                                            </div>))
                                    }
                                </td>
                                <td>
                                    {episodes.filter((item) => {
                                        if (item.foreignkey == id) {
                                            return item
                                        }
                                        else {
                                            return
                                        }
                                    })
                                        .filter((item2) => {
                                            if (currentPage == item2.season) {
                                                return item2
                                            }
                                        }).map((episode) => (
                                            <div >
                                                {userType == "ADMIN" ? (<div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <div style={{ position: "relative", color: "#2dffb9", cursor: "pointer" }} onClick={() => DashboardSeries(episode._id)}><MdDashboard /></div>
                                                    <div style={{ position: "relative", color: "#2dffb9", cursor: "pointer" }} onClick={() => UpdateSeries(episode._id)} ><MdBrowserUpdated /></div>
                                                    <div style={{ position: "relative", color: "#2dffb9", cursor: "pointer" }} onClick={() => deleteSeries(episode._id)}><RiDeleteBin5Fill /></div>
                                                </div>) :
                                                    (<div></div>)}
                                                <br />
                                            </div>))
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                ) : (<div></div>)
                }
                {click === 'Hakkında' ? (
                    <div class="float-child" style={{ background: "#06001d", borderRadius: "20px", width: "840px", color: "rgba(255, 255, 255, 0.5)" }}>
                        {movieData.description}
                    </div>) : (<div></div>)}
                {click === 'Oyuncular' ? (<div class="float-child" style={{ background: "#06001d", borderRadius: "20px", width: "840px" }}>

                    <Row>
                        {movieData.player && movieData.player.map((item) => (
                            <Col
                                sm={12}
                                md={6}
                                lg={4}
                                xl={3}
                                key={movieData._id}
                                style={{ width: "128px", height: "180px" }}
                                className='my-2'
                            >
                                <div class='card-glass'>
                                    <div class='content-glass' onClick={() => navigatee(item.actorsid)}>
                                        <div class='imgBx-glass'>
                                            <img src={item.image} />
                                        </div>
                                        <div class='contentBx-glass'>
                                            <h3><span>{item.name}</span></h3>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>) : (<div></div>)}
            </div>
        )
    }
}


export default EpisodeSelect