import React from 'react';
import '../assets/aboutus.css';
import goto from "../photos/goto.jpeg"
import soura from "../photos/soura.jpg"
import arnab from "../photos/arnab.jpeg"
import rat from "../photos/rat.jpg"
import avik from "../photos/avik.jpeg"
function AboutUs(props) {
    return (
        <div>
            {/* Navigation */}

            {/* About Us Section */}
            <section className="about-section text-center py-5">
                <div className="container">
                    <h2>About Us</h2>
                    <p>The thing about us, is we're all about you!</p>
                    <img src="logo.jpeg" className="img-fluid" alt="Team" style={{ height: "150px", width: "150px" }} />
                </div>
            </section>
            <section className="about-section text-center py-2">
                <div className="container">
                    <h2>Our Team</h2>
                    <p>Meet the team behind the scenes, the minds and hands that crafted this platform from scratch:</p>
                    <br />
                    <strong>
                        <div id="carouselExampleCaptions" className="carousel slide">
                            <div className="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
                                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4" aria-label="Slide 0"></button>
                            </div>
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src={soura} style={{ width: "400px", borderRadius: "10%" }}></img>
                                    <div className="carousel-caption d-none d-md-block" >
                                        <h4 style={{ color: "black" }}>Souradeep Dey</h4>
                                        <p style={{ width: "400px", position: 'relative', left: "28%", color: "black" }}>Lead Developer : "Souradeep spearheaded the project with his expertise in web technologies and machine learning.He ensured a aesthetically pleasing and user-friendly website."</p>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <img src={avik} style={{ width: "400px", borderRadius: "10%" }}></img>
                                    <div className="carousel-caption d-none d-md-block" >
                                        <h4 style={{ color: "black" }} >Avik Sarkar</h4>
                                        <p style={{ width: "400px", position: 'relative', left: "28%", color: "black" }}>Backend Developer: "Avik configured the backend of the project configured using Django, ensuring a robust and scalable foundation for the application's various features using restframework."</p>
                                    </div>
                                </div>


                                <div className="carousel-item">
                                    <img src={rat} style={{ width: "400px", borderRadius: "10%" }}></img>
                                    <div className="carousel-caption d-none d-md-block" >
                                        <h4 style={{ color: "black" }} >Ratul Biswas</h4>
                                        <p style={{ width: "400px", position: 'relative', left: "28%", color: "black" }}>ML and Backend Developer: "Ratul has configured and trained the machine learning models along with souradeep and given assistance to the backend of the website."</p>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <img src={goto} style={{ width: "400px", borderRadius: "10%" }}></img>
                                    <div className="carousel-caption d-none d-md-block" >
                                        <h4 style={{ color: "black" }} >Swagata Karmakar</h4>
                                        <p style={{ width: "400px", position: 'relative', left: "28%", color: "black" }}>Frontend Developer: "Swagata designed the layout and user interactions, ensuring that the website is easy to navigate and visually appealing."</p>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <img src={arnab} style={{ width: "400px", borderRadius: "10%" }}></img>
                                    <div className="carousel-caption d-none d-md-block" >
                                        <h4 style={{ color: "black" }} >Arnab Basak</h4>
                                        <p style={{ width: "400px", position: 'relative', left: "28%", color: "black" }}>ML Developer: "Tested and deployed the Machine Learning Model in our project to generate the News verification section, and also associate with the chatbot section."</p>
                                    </div>
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </strong>
                    {/* <img src={soura} style={{ height: "200px", borderRadius: "10%" }}></img>
                        Souradeep Dey - Lead Developer : "Souradeep spearheaded the project with his expertise in web technologies and machine learning.He ensured a aesthetically pleasing and user-friendly website."
                        Avik Sarkar - Backend Developer: "Avik configured the backend of the project configured using Django, ensuring a robust and scalable foundation for the application's various features using restframework."
                        Ratul Biswas - ML and Backend Developer: "Ratul has managed the machine learning models along with souradeep and given assistance to the backend of the website."
                        Swagata Karmakar- Frontend Developer: "Swagata designed the layout and user interactions, ensuring that the website is easy to navigate and visually appealing."
                        Arnab Basak - ML Developer: "Tested and deployed the Machine Learning Model in our project to generate the News verification section, and also associate with the chatbot section."</p> */}
                    {/* <img src="your-image-url.jpg" className="img-fluid" alt="Team" /> */}
                </div>
            </section>

            {/* Mission Section */}
            <section className="text-center py-5">
                <div className="container">
                    <h2>Our Mission</h2>
                    <p>At News Analyzer, our mission is to revolutionize the news consumption experience through cutting-edge technology and innovation. We aim to deliver accurate news by integrating advanced features such as fake news detector. To make user experience more engaging we provide Question generator section along with a highlighter feature to extract insightful portion of the news articles. Our commitment is to provide a seamless, reliable, and enriched news platform that empowers our readers to stay informed and connected with the world.</p>
                </div>
            </section>

            {/* Our Story Section
            <section className="py-5">
                <div className="container">
                    <h2 className="text-center">Our Story</h2>
                    <p className="text-center">In 2004, fellow MIT graduate students Brian Halligan and Dharmesh Shah noticed a major shift in the way people shop and purchase products. Buyers didn’t want to be interrupted by ads; they wanted helpful information. In 2006, they founded HubSpot to help companies use that shift to grow better with inbound marketing.</p>
                    <div className="row">
                        <div className="col-md-6">
                            <img src="your-image-url.jpg" className="img-fluid" alt="Story Image" />
                        </div>
                        <div className="col-md-6">
                            <p>Along the way, HubSpot expanded beyond marketing into a crafted, not cobbled suite of products that create the frictionless customer experience that buyers expect today. Expertly led by CEO Yamini Rangan, HubSpot uses its customer platform built on an AI-powered Smart CRM to help millions of scaling organizations grow better.</p>
                        </div>
                    </div>
                </div>
            </section> */}
        </div>
    );
}

export default AboutUs;