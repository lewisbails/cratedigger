import React, {Component} from 'react';
import {YT_API_KEY} from '../tokens';
import './VideoPanel.css';
const API_KEY = YT_API_KEY;

export default class VideoPanel extends Component {

  constructor(props){
    super(props);
    this.state = {videoAvailable: false};
  }

  componentWillMount(){
    if (this.props.info.name) this.getVideo();
  }

    async shouldComponentUpdate(nextProps,nextState){
        if (this.props.info.name === nextProps.info.name){
            return false;
        } else {
          this.props = nextProps;
          if (this.props.info.name) await this.getVideo();
          return true;

        }
    }

    getVideo(){
      const term = this.props.info.artist+' '+this.props.info.name;
      fetch('https://www.googleapis.com/youtube/v3/search?q='+encodeURIComponent(term)+'&part=snippet&type=video&key='+API_KEY)
      .then((response)=> {return response.json()})
      .then((data)=>{
          this.setState({video: data.items[0],
                          videoAvailable: true});
          return new Promise((resolve,reject)=>resolve('success'));
      })
      .catch((error)=>{
          console.log(error);
          this.setState({videoAvailable:false});
          return new Promise((resolve,reject)=>reject('failure1'));
      });
        

    }

    render(){
          return <div className="col-lg-4 offset-lg-4 col-10 offset-1 video-container">
          {
            this.state.videoAvailable &&
            <div className={"embed-responsive embed-responsive-16by9 video-div"}>
              <iframe title={ this.state.video.snippet.title } className={"embed-responsive-item video"} src={'https://www.youtube.com/embed/'+this.state.video.id.videoId} allowFullScreen />
            </div>
          }
          {
            !this.state.videoAvailable &&
            <div className={"embed-responsive embed-responsive-16by9 video-div"}>
              <iframe title='chumdrumbedrum' className={"embed-responsive-item video"} src={'https://www.youtube.com/embed/tVj0ZTS4WF4'} allowFullScreen />
          	</div>
          }
        </div>
      }


}