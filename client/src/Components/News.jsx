import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import axios from 'axios';
import Loading from './Loading';

export default function News(props) {
    const location = useLocation()
    const title = useParams().title

    const [spinner, setspinner] = useState(true);
    const [article, setArticle] = useState("");
    const [originalArticle, setOriginalArticle] = useState("")
    const [isTextCopied, setIsTextCopied] = useState(false)
    function getArticle(url) {
        axios.post("http://localhost:8000/api/getArticle", {
            url: url
        }).then((res) => {
            setspinner(false)
            setArticle(res.data.newsArticle)
            setOriginalArticle(res.data.newsArticle)
        })
    }
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setIsTextCopied(true)
        });
    };
    function getHighlights(text) {
        axios.post("http://localhost:8000/api/highlightedSentences", {
            text: text
        }).then((res) => {
            const highlights = res.data.highlightedSentences
            const highlightedSentencesList = highlights.split("=+=")
            setArticle(prevArticle => {
                highlightedSentencesList.forEach(e => {
                    prevArticle = prevArticle.replace(e, `<span class="bg-warning text-dark" >${e}</span>`)
                });
                console.log(prevArticle);
                return prevArticle
            })

        })
    }
    useEffect(() => {

        getArticle(location.state.url)
    }, [])

    return (
        <div className="container d-flex justify-content-center align-items-center">
            {
                spinner &&
                <h4><Loading mode={props.mode} /></h4>
            }
            {
                !spinner &&
                <div className="p-3" style={{ width: '85%' }}>

                    <h3>{title}</h3>
                    <div style={{ whiteSpace: "pre-wrap" }} dangerouslySetInnerHTML={{ __html: article }}></div>
                    <button className={`btn btn-${props.mode == "light" ? "info" : "warning"} mt-4`} onClick={() => getHighlights(article)}>Hightlight</button>
                    <button className={`btn btn-${isTextCopied ? "success" : (props.mode == "light" ? "info" : "warning")} mt-4 ms-2`} onClick={() => copyToClipboard(originalArticle)}>Copy to clipboard</button>
                </div>
            }
        </div>
    )
}
