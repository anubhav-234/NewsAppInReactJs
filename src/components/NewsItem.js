import React, { Component } from "react";

export class NewsItem extends Component {
  render () {
    const { title, description, urlToImage, url, author, publishedAt } = this.props;
    const defaultImageUrl = 'https://media.istockphoto.com/id/1182477852/photo/breaking-news-world-news-with-map-backgorund.jpg?s=1024x1024&w=is&k=20&c=S9FBe3KUvooZHZktJzr8Nt94wtg56BQTQiqAz8zUK8M=&p=1'
    return (
      <div className="my-3">
        <div className="card" style={ { width: "18rem" } }>
          <img src={ urlToImage ? urlToImage : defaultImageUrl } className="card-img-top" alt="..." style={ { height: '13rem' } } />
          <div className="card-body">
            <h5 className="card-title">{ title }</h5>
            <p className="card-text">{ description }</p>
             <p className="card-text"><small className="text-muted">By {author ? author : 'UnKnown'} on {publishedAt}</small></p>
          </div>
          <div>
            <a href={ url } rel="noreferrer" target='_blank' className="btn btn-sm btn-dark">
              Read More...
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
