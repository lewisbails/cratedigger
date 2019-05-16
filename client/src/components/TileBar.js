import React, {Component} from 'react';
import '../App.css';
import ArtistTile from './ArtistTile';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

export default class TileBar extends Component {

    constructor(props){
        super(props);
        this.state = {};
    }

    getRelatedArtists(){
        spotifyApi.getArtistRelatedArtists(this.props.info.id)
        .then((response)=>{
            this.setState({
               relatedArtists: response.artists.splice(0,5),
            });
            // return new Promise((resolve,reject)=>resolve('success'));
            return
        })
        .catch((error)=>{
            this.setState({
                relatedArtists: [],
            });
            // return new Promise((resolve,reject)=>error);
            return
        })
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