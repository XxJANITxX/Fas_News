import React, {useState, useEffect} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from 'prop-types'

export default function News(props) {


    const [articles,setArticles] = useState([]); 
    const [page,setPage] = useState(1); 
    const [totalResults,setTotalResults] = useState(0); 
    
    // Helper function
    let capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Calling updateNews when component Mounted
    useEffect(()=> {
        updateNews();
        
    },[]);
    
    
    const updateNews = async () => {

        // Setting progress bar so that it displays like moving
        props.setProgress(10);
        
        // Fetching news from News API
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parseData = await data.json();
        
        // Setting articles to fetched news (Loading was for previous and next buttons)
        setArticles(parseData.articles);
        setTotalResults(parseData.totalResults);

        // Completing progress bar
        props.setProgress(100);
        
    }


    // FetchData function which will call when the scroll reached end of page size
    const fetchMoreData = async () => {

        // Setting page to next 
        setPage(page + 1);

        // Fetching news from News API
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parseData = await data.json();

        // Concatinating fetched articles with earlier once
        setArticles(articles.concat(parseData.articles));
        setTotalResults(parseData.totalResults);
    };
    

    document.title = `${capitalizeFirstLetter(props.category)} - Fas News`;

    return (

            <>
                {/* Heading function */}
                <h2 className='text-center my-5 py-2 bg-dark text-light rounded border border-primary border-3'>Fas News - Top Headlines on {capitalizeFirstLetter(props.category)}</h2>

                {/* Data container */}
                <div className="container">

                    {/* Infinite scroll function */}
                    <InfiniteScroll
                        dataLength={articles.length}
                        next={fetchMoreData}
                        hasMore={articles.length !== totalResults}
                        loader={<Spinner />}
                    >
                        <div className="row my-2">

                            {/* Using map function to display fetched news */}
                            {articles.map((element) => {
                                return (
                                    <div className="col-md-4" key={element.title}>
                                        {/* Setting value to handle null conditions and passing as props to News Item */}
                                        <NewsItem
                                            title={element.title === null ? "No Title" : element.title}
                                            description={element.description === null ? "No description" : element.description}
                                            imageURL={element.urlToImage === null ? "https://www.shutterstock.com/shutterstock/photos/667420906/display_1500/stock-vector-breaking-news-background-with-planet-667420906.jpg" : element.urlToImage}
                                            url={element.url === null ? "No url" : element.url}
                                            author={element.author === null ? "Publisher" : element.author}
                                            date={element.publishedAt === null ? "Date unknown" : element.publishedAt}
                                            source={element.source.name === null ? "Source unknown" : element.source.name}
                                        />
                                    </div>)
                            })}
                        </div>
                    </InfiniteScroll>

                </div>
            </>

        )
}

News.defaultProps = {
    country: "in",
    pageSize: 5,
    category: "sports"
  }

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }