import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import EventsList from './EventsList'
import * as serviceWorker from './serviceWorker';
import * as utils from './utils.js'

const fetchApiData=utils.fetchApiData;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
        uid: '',
        loggedIn:false,
        message:'Please enter a username',
        eventsApiData:'loading...',
        reposApiData:'loading...',
        forkEventsList:'',
        forksfetched:false,
        pullsfetched:false
    };
    this.clickHandler=this.clickHandler.bind(this);
    this.changeHandler=this.changeHandler.bind(this);
  }
  changeHandler=(e)=>{this.setState({[e.target.id]:e.target.value})}
  clickHandler=(e)=>{
    if(this.state.uid!=='')
      this.setState({message:'Welcome back '+this.state.uid, loggedIn:true});
  }
  componentDidUpdate(){
    const forks=[];
    if(this.state.loggedIn&&!this.state.forksfetched&&!this.state.pullsfetched){
  		fetchApiData('https://api.github.com/users/'+this.state.uid+'/repos')
  			.then((data)=>{
  					this.setState({reposApiData:data});
            const repoInfoUrlList=data.filter(x=>x.fork).map(x=>x.url);
            let requests=repoInfoUrlList.map(url=>fetchApiData(url));
            Promise.all(requests)
              .then(responses=>{
                responses.map(r=>forks.push({name:r.name,url:r.parent.html_url}));
                this.setState({forkEventsList:forks,forksfetched:true});
                })
              .catch(err=>console.log(err));
  				});
  		fetchApiData('https://api.github.com/users/'+this.state.uid+'/events')
  			.then((data)=>{
  					this.setState({eventsApiData:data,pullsfetched:true});
  				});
  	}

  }
  render() {
    const style=this.state.loggedIn?{display:'none'}:{display:'block'}
    const revstyle=this.state.loggedIn?{display:'block'}:{display:'none'}
    return (
      <div className="myApp">
        <h4>{this.state.message}</h4>
        <input id='uid' onChange={this.changeHandler} style={style}/>
        <button onClick={this.clickHandler}>Show Lists</button>
        <div style={revstyle}>
        	<h2>ForkEvents List</h2>
        	<ul>
        	<EventsList apiData={this.state.forkEventsList} isfetched={this.state.forksfetched} etype='ForkEvent'/>
        	</ul>
        </div>
       	<div style={revstyle}>
       		<h2>PullRequestEvents List</h2>
       		<ul>
       		<EventsList apiData={this.state.eventsApiData} isfetched={this.state.pullsfetched} etype='PullRequestEvent' />
       		</ul>
       	</div>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
