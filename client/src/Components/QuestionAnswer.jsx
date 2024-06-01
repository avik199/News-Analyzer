import React, { useState } from 'react';
import axios from 'axios';
import Loading from './Loading.jsx';
const QuestionAnswer = (props) => {
    const [inputText, setInputText] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [openedHints, setOpenedHints] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };
    const pasteFromClipboard = () => {
        navigator.clipboard.readText().then((text) => {
            setInputText(text);
        });
    };
    const handleSubmit = async () => {
        // console.log()
        try {
            setIsLoading(true)
            // const response = await axios.get('http://localhost:3000/qna', {
            //     text: inputText,
            // });
            const response = await axios.post('http://127.0.0.1:8000/api/qna', {
                text: inputText,
            });
            setIsLoading(false)
            setResponseData(response.data);
            let temp = []
            for (let i = 0; i < response.data.questions.length; i++) {
                temp.push({
                    paraOpened: false, answerOpened: false
                })
            }
            setOpenedHints(temp)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    function showHintHandler(index, type) {

        setOpenedHints(prev => {
            prev[index][type] = !prev[index][type]
            console.log(prev)
            return [...prev]
        })
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col">
                    <textarea className={`form-control mb-3 bg-${props.mode == "light" ? "light" : "secondary"} text-${props.mode == "light" ? "dark" : "white"}`}
                        type="text"

                        placeholder="Enter your article..."
                        value={inputText}
                        onChange={handleInputChange}
                        rows="12"
                    ></textarea>
                    <button className={`btn btn-${props.mode == "light" ? "info" : "warning"}`} onClick={handleSubmit}>
                        Submit
                    </button>
                    <button className={`btn btn-${props.mode == "light" ? "info" : "warning"} ms-2`} type="button" onClick={pasteFromClipboard}>Paste from clipboard</button>
                    {isLoading && <Loading mode={props.mode} />}
                </div>
            </div>
            {!isLoading && responseData &&
                (responseData.isError && <h3>Error while generating question</h3>
                    ||

                    <div className="row mt-3 ">
                        <div className="col">
                            {responseData.questions.map((item, index) =>
                            (
                                <div key={index} className={`card mb-3 container bg-${props.mode == "light" ? "light" : "secondary"} text-${props.mode == "light" ? "dark" : "white"}`}>
                                    <div className="row">

                                        <h5 className="card-title">{index + 1})Question: {item.question}</h5>
                                        <div className="col-3">
                                            <button className={`btn btn-${props.mode == "light" ? "info" : "warning"} m-1`} type="button" key={index} onClick={e => showHintHandler(index, "paraOpened")}>{openedHints[index].paraOpened && "Hide Hint 1" || "Show Hint 1"}</button>
                                            {openedHints[index].paraOpened && <div className="m-1">{item.paraNumber == -1 ? "Hint 1 not available" : "Para Number " + item.paraNumber}</div>}
                                        </div>

                                        <div className="col">
                                            <button className={`btn btn-${props.mode == "light" ? "info" : "warning"} m-1`} type="button" key={index} onClick={e => showHintHandler(index, "answerOpened")}>{openedHints[index].answerOpened && "Hide Hint 2" || "Show Hint 2"}</button>
                                            {openedHints[index].answerOpened && <div className="m-1">{item.answer}</div>}
                                        </div>

                                    </div>
                                </div>
                            )
                            )}
                        </div>

                    </div>
                )}
        </div>
    );
};

export default QuestionAnswer;
