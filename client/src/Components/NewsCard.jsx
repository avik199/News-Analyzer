import React from 'react'
// import logo as './logo192.png';
import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
function NewsCard(props) {
    const navigate = useNavigate()
    function navigateToNewsArticle() {
        navigate(`/news/${props.title}`, {
            state: {
                url: props.url
            }
        })
    }
    return (
        <>

            <div className={`card bg-${props.mode == "light" ? "light" : "secondary"} text-${props.mode == "light" ? "dark" : "white"} mb-3 h-100 d-inline-block`}>
                <img className="card-img-top" src={props.img} alt="Card" />
                <div className="card-body h-100 d-inline-block ">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text mb-5">{props.description.length < 200 ? props.description.substring(0, 200) : props.description.substring(0, 200) + "..."}</p>
                    <div class="position-absolute" style={{ bottom: "10px" }}>
                        <button onClick={navigateToNewsArticle} className={`btn btn-${props.mode == "light" ? "info" : "warning"} mx-2`} target="_blank">Read Full News</button>
                        <a href={props.url} className={`btn btn-${props.mode == "light" ? "info" : "warning"}`} target="_blank">Original News Site</a>
                    </div>

                </div>
            </div>

        </>
    )
}

export default NewsCard
