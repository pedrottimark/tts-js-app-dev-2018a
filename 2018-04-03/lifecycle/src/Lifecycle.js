import React, {Component} from "react";

export default class Lifecycle extends Component{
    render(){
        const {message} = this.props;

        return <h2>{message}</h2>
    }
}