import React, { Component } from 'react';

class Resize extends Component {

    state = {
        windowHeight: undefined,
        windowWidth: undefined
    }

    handleResize = () => this.setState({
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth
    });

    componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }

    render() {
        return (
            <span>
                {this.state.windowWidth} x {this.state.windowHeight}
            </span>
        );
    }
}

export default Resize;