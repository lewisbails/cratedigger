import React, {Component} from 'react';
import '../App.css';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

export default class ArtistTile extends Component {

	randomTrack(artistID){
        spotifyApi.getArtistTopTracks(artistID,'DK')
        .then((data)=>{
            spotifyApi.play({"uris": data.tracks.map((track)=>{return "spotify:track:"+track.id})})
            .catch((error)=>console.log(error))
        })
        .catch((error)=>console.log(error));
    }

	shouldComponentUpdate(nextProps,nextState){
		if (this.props.info.name === nextProps.info.name){
			return false;
		} else {
			return true;
		}
	}

	render(){
		return (
			<div className="raise tile">
				<a onClick={()=>{this.randomTrack(this.props.info.id)}}>
				<img className='img-fluid' style={{width:'150px',height:'150px'}} src={this.props.info.images[0].url} alt={this.props.info.name}/>
				<p>{this.props.info.name}</p>
				</a>
			</div>
		)
	}
}