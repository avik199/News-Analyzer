import React from 'react'
import { NavLink } from "react-router-dom";
import { useRef, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import light from "../assets/light.png"
import dark from "../assets/dark.png"

function Navbar(props) {
    const {
        loginWithPopup,
        logout,
        isAuthenticated,
        user,
        getAccessTokenSilently,
    } = useAuth0()
    const popoverRef = useRef()
    useEffect(() => {

    })
    return (

        <div>
            <nav className={`navbar navbar-expand-lg navbar-light bg-${props.mode === "light" ? "info" : "warning"} px-3 my-3 `} style={{ width: "95%", margin: "auto", height: 50, borderRadius: 10, }}>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <NavLink className="navbar-brand" to="/">Breaking News</NavLink>

                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Explore
                            </a>
                            <ul className="dropdown-menu " aria-labelledby="navbarDropdown">
                                <li><NavLink className="nav-link" to="/business">Business</NavLink></li>
                                <li><NavLink className="nav-link" to="/entertainment">Entertainment</NavLink></li>
                                <li><NavLink className="nav-link" to="/general">General</NavLink></li>
                                <li><NavLink className="nav-link" to="/health">Health</NavLink></li>
                                <li><NavLink className="nav-link" to="/science">Science</NavLink></li>
                                <li><NavLink className="nav-link" to="/technology">Technology</NavLink></li>
                                <li><NavLink className="nav-link" to="/britain">Britain</NavLink></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><NavLink className="nav-link" to="/world">Global</NavLink></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <ul className="navbar-nav ml-auto mt-2 mt-lg-0">

                    <li className="nav-item">
                        <NavLink className="nav-link" to="/qna" >QNA generation</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/fakenews" >FakeNews Detector</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/aboutus" >About us</NavLink>
                    </li>
                    <li className="nav-item py-1">
                        {
                            props.mode === "light" &&
                            <img className="custom-control-input" style={{ backgroundColor: "white", border: "2px solid black", borderRadius: "50%", height: "2rem", objectFit: "contain", padding: 5 }} src={dark} onClick={props.changeMode} />
                        }
                        {
                            props.mode === "dark" &&
                            <img className="custom-control-input" style={{ backgroundColor: "white", border: "2px solid black", borderRadius: "50%", height: "2.20rem", objectFit: "contain", padding: 5 }} src={light} onClick={props.changeMode} />
                        }

                    </li>

                </ul>
            </nav >
        </div >
    )
}
export default Navbar;