import React, { Component } from 'react';
import {Polar} from 'react-chartjs-2';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

export default class PolarGraph extends Component {

    constructor(props){
        super(props);
        this.state = {};
    }

    async shouldComponentUpdate(nextProps,nextState){
        if (nextProps.trackid === this.props.trackid){
            return false;
        } else {
            this.props = nextProps;
            await this.getFeatures();
            return true;
        }
  }

    getFeatures(){
        spotifyApi.getAudioFeaturesForTrack(this.props.trackid)
        .then((response)=>{
            this.setState({
                datasets: [{
                    data: [
                      Math.ceil(response.danceability*100),
                      Math.ceil(response.energy*100),
                      Math.ceil(response.instrumentalness*100),
                      Math.ceil(response.liveness*100),
                      Math.ceil(response.valence*100),
                    ],
                    backgroundColor: [
                    '#FABA73',
                    '#7288B9',
                    '#A40607', 
                    '#F4BAC8',
                    '#7BB972',
                    '#733080',
                    ],
                  }],
                  labels: [
                    'Danceability',
                    'Energy',
                    'Instrumentalness',
                    'Liveness',
                    'Valence (Positivity)',
                  ]
            })
        })
        .catch((error)=>console.log(error))
    }

    render() {
        return (
          <div>
            {
                this.props.trackid && this.state.datasets &&
                <Polar data={this.state} height={300} width={600} options={{legend:{display: false,}}} />
            }
          </div>
        );
      }
}