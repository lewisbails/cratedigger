import React, { Component } from 'react';
import './App.css';
import VideoPanel from './components/VideoPanel';
import TileBar from './components/TileBar';
import Current from './components/Current';
import Controller from './components/Controller';
import PolarGraph from './components/PolarGraph';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();


class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams(); //gets access token from address bar (query string)
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token); //sets token so we can now control users account
    }
    this.state = {
      paused: true,
      loggedIn: token ? true : false,
      isActive: false,
      playbackResponse: {artist: '', id:'', name: '', albumArt: '', trackid: '',},
    }
  }

  componentWillMount(){
    if (this.state.loggedIn){
      this.getNowPlaying();
    }
    setInterval(()=>{this.poll();},3000);
  }

  getHashParams(){
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e){
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  poll(){
  	if (this.state.loggedIn){
  		this.getNowPlaying();
  	}
  }

  getNowPlaying(){
    spotifyApi.getMyCurrentPlaybackState()
    .then((response)=>{
      console.log('spotty request successful');
	    this.setState((prevState) => {
    		if (response && (prevState.playbackResponse.name!==response.item.name || prevState.paused !== !response.is_playing)){
				return {
					playbackResponse: {
					artist: response.item.artists[0].name,
					id: response.item.artists[0].id,
					name: response.item.name,
          albumArt: response.item.album.images[0].url,
          trackid: response.item.id,
					},
					isActive: true,
					paused: !response.is_playing,
				}
    		}			
	    });
    })
    .catch((error)=>{
      console.log(error);
      this.setState({
        paused: true,
        isActive: false,
        playbackResponse: {
        artist: '',
        id: '',
        name: '',
        albumArt: '',
        trackid: '',
        }
      });
      return;
    });
  }

  render() {     
    return (
      <div className="App container-fluid">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-lg-4 col-12 playerInfo">
            <a className="btn raise login" role="button" href='http://localhost:8888/login'> Login to Spotify </a>
            <Current info={this.state.playbackResponse} isActive={this.state.isActive}/>
            <Controller loggedIn={this.state.loggedIn} paused={this.state.paused} onClick={()=>this.poll()} />
          </div>
          <PolarGraph className="col-lg-4" trackid={this.state.playbackResponse.trackid}/>
        </div>
        <div className="row"><VideoPanel info={this.state.playbackResponse}/></div>
        <TileBar info={this.state.playbackResponse}/>
      </div>
    );
  }
}

export default App;              
//