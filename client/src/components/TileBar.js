import React, { Component } from 'react';
import '../App.css';
import ArtistTile from './ArtistTile';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

export default class TileBar extends Component {

    constructor(props){
        super(props);
        this.state = {};
    }

    async shouldComponentUpdate(nextProps,nextState){
        if (nextProps.info.name === this.props.info.name){
            return false;
        } else {
            this.props = nextProps;
            await this.getRelatedArtists();
            return true;
        }
  }

    getRelatedArtists(){
        spotifyApi.getArtistRelatedArtists(this.props.info.id)
        .then((response)=>{
            this.setState({
               relatedArtists: response.artists.splice(0,5),
            });
            return
        })
        .catch((error)=>{
            this.setState({
                relatedArtists: [],
            });
            return
        })
      }

      render(){
        return <div>
            {
            this.state.relatedArtists &&
            <div className='row d-flex justify-content-center align-items-center'>
            {
            this.state.relatedArtists.map((artist)=>{
                return (<ArtistTile key={artist.id} info={artist}/>)
            })
            }
            </div>
            }
            </div>
      }


    
}