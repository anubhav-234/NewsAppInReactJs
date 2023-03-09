import React, { Component } from 'react'

export default class ErrorWrapper extends Component {
    render () {
        const { errorMessage } = this.props;
        return (
            <div>
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            </div>
        )
    }
}
