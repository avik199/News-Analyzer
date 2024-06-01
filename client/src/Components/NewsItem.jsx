import React, { useState, useEffect } from 'react'
import News from './NewsCard.jsx'
import Loading from './Loading.jsx';
import InfiniteScroll from 'react-infinite-scroll-component';

function NewsItem(props) {
    const [article, setarticle] = useState([]);
    const [totalResults, setTotalResults] = useState(1);
    let [page, setPage] = useState(1);
    const [spinner, setspinner] = useState(true);
    const update = async () => {
        // let url = await fetch(`http://localhost:3000/news`);
        //if (!props.category && props.country === "in")
        //    var url = await fetch("http://localhost:3000/news");
        //else
        var url = await fetch(`https://newsapi.org/v2/top-headlines?category=${props.category}&apiKey=81038fe2244442fe8add71b5bdd5f761&page=1&country=${props.country}`);
        let preparedUrl = await url.json();
        setarticle(preparedUrl.articles);
        setTotalResults(preparedUrl.totalResults);
        setspinner(false);
    }
    useEffect(() => {
        update();
    }, [])
    let fetchData = async () => {
        setPage(page + 1);
        // let url = await fetch(`https://newsapi.org/v2/top-headlines?category=${props.category}&apiKey=668d0e3455d74f60aab566a6677ce2e7&page=${page + 1}&country=${props.country}`);

        let preparedUrl = await url.json();
        setarticle(article.concat(preparedUrl.articles));
    }
    // if(article.length>=totalResults){
    //       setspinner(false);
    // }
    return (
        <>
            <InfiniteScroll
                dataLength={article.length}
                next={fetchData}
                hasMore={article.length < totalResults}
                loader={<h4><Loading mode={props.mode} /></h4>}>
                <div className='container my-4' style={{ margin: "auto" }}>

                    {spinner == false && <h2 className='text-center'>News</h2>}

                    <div className='row my-4'>
                        {article.map((element) => {
                            return article.length > 0 && <div className='col-md-4 my-3' >
                                <News mode={props.mode} changeMode={props.changeMode} key={element.url} url={element.url} img={element.urlToImage ? element.urlToImage : "https://ichef.bbci.co.uk/news/976/cpsprodpb/25F5/production/_86871790_anon_976.jpg"} title={element.title ? element.title : "No-Title"} description={element.description ? element.description : " "} />
                            </div>
                        })}
                    </div>

                </div >
            </InfiniteScroll>
        </>
    )
}
NewsItem.defaultProps = {
    category: '',
    country: ''
};
export default NewsItem

