import React, { Component } from 'react';
import '../App.css';

export default class Current extends Component{

    shouldComponentUpdate(nextProps,nextState){
        if (nextProps.info.name === this.props.info.name){
            return false;
        } else {
            return true;
        }
    }

    render(){
        return <div>
            {
            this.props.isActive &&
            <div>
              <div>
                <p>Now Playing: {this.props.info.artist} - {this.props.info.name}</p>
              </div>
              <div>
                <img src={this.props.info.albumArt} style={{height:150}} alt='albumArt'/>
              </div>
            </div>
          }
          {
            !this.props.isActive &&
            <div>
              <p>Now Playing: A whole lotta nuffin.</p>
            </div>
          }
        </div>
    }



}