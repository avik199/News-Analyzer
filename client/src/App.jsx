import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from './Components/Navbar';
import NewsItem from './Components/NewsItem'
import NewsCard from './Components/NewsCard'
import News from './Components/News'
import { useAuth0 } from '@auth0/auth0-react'
import QuestionAnswer from './Components/QuestionAnswer'
import FakeNews from './Components/FakeNews'
import Footer from './Components/Footer'
import AboutUs from './Components/AboutUs';

function App() {
  const [mode, setmode] = useState("light");

  const changeMode = () => {
    if (mode === "light") {
      setmode("dark");
      document.body.style.backgroundColor = '#1F2C34';
      document.body.style.color = 'white';
    }
    else {
      setmode("light");
      document.body.style.backgroundColor = 'white';
      document.body.style.color = 'black';
    }
  }
  return (
    <>
      <BrowserRouter>
        <Navbar mode={mode} changeMode={changeMode} />
        <Routes>
          <Route path="/britain" element={<NewsItem mode={mode} changeMode={changeMode} country="gb" />}></Route>
          <Route path="/business" element={<NewsItem mode={mode} changeMode={changeMode} key="key1" category="business" country="in" />}></Route>
          <Route path="/entertainment" element={<NewsItem mode={mode} changeMode={changeMode} key="key2" category="entertainment" country="in" />}></Route>
          <Route path="/general" element={<NewsItem mode={mode} changeMode={changeMode} key="key3" category="general" country="in" />}></Route>
          <Route path="/health" element={<NewsItem mode={mode} changeMode={changeMode} key="key4" category="health" country="in" />}></Route>
          <Route path="/science" element={<NewsItem mode={mode} changeMode={changeMode} key="key5" category="science" country="in" />}></Route>
          <Route path="/sports" element={<NewsItem mode={mode} changeMode={changeMode} key="key6" category="sports" country="in" />}></Route>
          <Route path="/technology" element={<NewsItem mode={mode} changeMode={changeMode} key="key7" category="technology" country="in" />}></Route>
          <Route path="/world" element={<NewsItem mode={mode} changeMode={changeMode} key="key9" country="us" />}></Route>
          <Route path="/" element={<NewsItem mode={mode} changeMode={changeMode} key="key8" country="in" />}></Route>
          <Route path="/news/:title" element={<News mode={mode} changeMode={changeMode} key="key82" />}></Route>
          <Route path='/qna' element={<QuestionAnswer mode={mode} changeMode={changeMode} key="32" />}></Route>
          <Route path='/fakenews' element={<FakeNews mode={mode} changeMode={changeMode} key="43" />} ></Route>
          <Route path='/aboutus' element={<AboutUs mode={mode} changeMode={changeMode} key="43" />} ></Route>
        </Routes>
        <Footer />
      </BrowserRouter >

    </>
  );
}

export default App;
