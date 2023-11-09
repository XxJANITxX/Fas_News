import React from 'react'

export default function NewsItem(props) {

    // Displaying passed data in cards


    let { title, description, imageURL, url, author, date, source } = props;

    return (
        <div>
            <div className="card my-2 mx-3" style={{ width: "18rem" }}>
                <div>
                    <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">
                        {source}
                    </span>
                    <img src={imageURL} className="card-img-top" alt={title} />
                    <div className="card-body">
                        <h5 className="card-title">
                            {title}
                        </h5>
                        <p className="card-text">
                            {description.slice(0, 88) + "........."}
                        </p>
                        <p className="card-text"><small className='text-muted'>By {author} on {new Date(date).toUTCString()}</small></p>
                        <a href={url} className="btn btn-sm btn-dark">
                            Read More
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

