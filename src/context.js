import React, { Component } from 'react'

const Context = React.createContext()

const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_WISHLIST':
            return {
                ...state,
                wishCount: state.wishCount + action.payload
            }
        default:
            return state
    }
}

export default class Provider extends Component {
    state = {
        wishCount: 0,
        cartCount: 0,
        dispatch: action => this.setState(state => reducer(state, action))
    }

    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer
