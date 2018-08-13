import React, { Component } from 'react'

class Hello extends Component {
    render() {
        return (
            <div>
                <h1>Hello world. { this.props.name } </h1>
            </div>
        );
    }
}

export default Hello;