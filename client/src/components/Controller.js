import React, { Component } from 'react';
import '../App.css';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();


export default class Controller extends Component {

    fresh(){
        spotifyApi.getPlaylistTracks("62XU0jZ2Zy95d5QQzhFGsq")
        .then((response)=>{
            spotifyApi.play({"uris": response.items.map((item)=>{return "spotify:track:"+item.track.id})})
            .catch((error)=>console.log(error));
        })
        .catch((error)=>console.log(error))
    }

    render(){
        return <div>
        {
            this.props.loggedIn &&
                <div className="togglePlayback d-flex flex-row ">
                    <button id="nowPlaying" className='btn raise h-50' onClick={()=>{
                    console.log('now playing clicked');
                    spotifyApi.skipToPrevious()
                    .catch((error)=>console.log(error))}}>
                        Previous
                    </button>
                    <div className="d-flex flex-column">
                    <button id="nowPlaying" className='btn raise mt-0' onClick={()=>{
                        console.log('playback toggle clicked');
                        spotifyApi.getMyCurrentPlaybackState()
                        .then((response)=>{
                            if (response.is_playing) {
                                spotifyApi.pause()
                                .catch((error)=>console.log(error));
                            } else {
                                spotifyApi.play()
                                .catch((error)=>{
                                    console.log(error);
                                });
                            }
                    })}}>
                        {
                            this.props.paused &&
                            'Play'
                        }
                        {
                            !this.props.paused &&
                            'Pause'
                        }
                    </button>
                    <button id="fresh" className="btn raise" onClick={this.fresh}>Fresh</button>
                    </div>
                    <button id="nowPlaying" className='btn raise h-50' onClick={()=>{
                    console.log('next track clicked');
                    spotifyApi.skipToNext()
                    .catch((error)=>{
                        console.log(error);
                    })}}>
                    Next
                    </button>
                </div>
        }
        </div>
    }



}

