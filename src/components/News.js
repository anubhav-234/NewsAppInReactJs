import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import ErrorWrapper from "./ErrorWrapper";

export class News extends Component {
    static defaultProps = {
        pageSize: 5,
        country: 'in',
        category: 'general'
    }
    static propTypes = {
        pageSize: PropTypes.number,
        country: PropTypes.string,
        category: PropTypes.string,
        apiKey: PropTypes.string.isRequired
    }
    constructor (props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0,
            error: { status: false, message: 'No Error' }
        };
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`
    }
    capitalizeFirstLetter ( category ) {
        return category.length && ( category[ 0 ].toUpperCase() + category.substring( 1 ) )
    }

    async updateNews () {

        const { country, category, pageSize, apiKey } = this.props;
        const { page } = this.state;

        window.scrollTo( { top: 0, left: 0, behavior: "smooth" } );

        this.setState( { loading: true } );

        const url = `https://newsapi.org/v2/top-headlines?country=${ country }&category=${ category }&apiKey=${ apiKey }&page=${ page }&pageSize=${ pageSize }`;
        console.log(url);
        const data = await fetch( url );
        const parsedData = await data.json();
        if ( parsedData.status == 'error' ) {
            this.setState( { loading: false, error: { status: true, message: parsedData.message } } )
            return;
        }
        this.setState( {
            articles: parsedData.articles,
            loading: false,
            totalResults: parsedData.totalResults
        } );
    }
    async componentDidMount () {
        this.updateNews();
    }

    handlePrevClick = async () => {

        await this.setState( { page: this.state.page - 1 } );
        this.updateNews();
    };

    handleNextClick = async () => {

        // await this.setState( { page: this.state.page + 1 } );
        // this.updateNews();
        this.setState( { page: this.state.page + 1 }, () => { this.updateNews() } );
    };
    render () {
        const { articles, loading, page, totalResults, error } = this.state;
        const { pageSize, category } = this.props;
        return (
            <div>
                <div className="container my-3">
                    <h1 className="text-center">NewsMonkey - {this.capitalizeFirstLetter(category) } : Top Headlines</h1>
                    { loading && <Spinner /> }
                    { !loading && !error.status && <div className="container d-flex justify-content-between">
                        <button className="btn btn-dark">Category: { this.capitalizeFirstLetter( category ) }</button>
                        <button className="btn btn-dark">Page: { page }</button>
                    </div>
                    }
                    <div className="row">
                        { !loading && !error.status && articles.map( ( element ) => {
                            let { title, description, urlToImage, url, author, publishedAt } = element;

                            return (
                                <div className="col-md-3" key={ url }>
                                    <NewsItem
                                        title={ title ? title.slice( 0, 45 ) : "" }
                                        description={ description ? description.slice( 0, 90 ) : "" }
                                        urlToImage={ urlToImage }
                                        url={ url }
                                        author={ author }
                                        publishedAt={ publishedAt }
                                    />
                                </div>
                            );
                        } ) }
                        { error.status && <ErrorWrapper errorMessage={ error.message } /> }
                    </div>
                </div>
                <div className="container d-flex justify-content-between my-5">
                    <button
                        disabled={ page <= 1 }
                        className="btn btn-dark"
                        onClick={ this.handlePrevClick }
                    >
                        { " " }
                        &larr; Previous
                    </button>
                    <button
                        disabled={
                            page + 1 >
                            Math.ceil( totalResults / pageSize )
                        }
                        className="btn btn-dark"
                        onClick={ this.handleNextClick }
                    >
                        Next &rarr;
                    </button>
                </div>
            </div>
        );
    }
}

export default News;
