import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import EventsList from './EventsList'
import * as serviceWorker from './serviceWorker';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
        uid: '',
        pwd: '',
        loggedIn:false,
        message:'Please enter a username and password',
        eventsApiData:'loading...',
        reposApiData:'loading...'
    };
    this.clickHandler=this.clickHandler.bind(this);
    this.changeHandler=this.changeHandler.bind(this);
  }
  changeHandler=(e)=>{this.setState({[e.target.id]:e.target.value})}
  clickHandler=(e)=>{
    if(this.state.uid!==''&&'123'===this.state.pwd)
      this.setState({message:'Welcome back '+this.state.uid,loggedIn:true});
    else
      this.setState({message:'Invalid username or password',loggedIn:false});
  }
  componentDidUpdate(){
  	if(this.state.loggedIn&&this.state.eventsApiData==='loading...'){
  		fetch('https://api.github.com/users/'+this.state.uid+'/repos')
  			.then((res)=>res.json())
  			.then((data)=>{
  					this.setState({reposApiData:data});
  				});
  		fetch('https://api.github.com/users/'+this.state.uid+'/events')
  			.then((res)=>res.json())
  			.then((data)=>{
  					this.setState({eventsApiData:data});
  				});
  	}

  }
  render() {
    const style=this.state.loggedIn?{display:'none'}:{display:'block'}
    return (
      <div className="myApp">
        <h4>{this.state.message}</h4>
        <input id='uid' placeholder="Enter Username" onChange={this.changeHandler} style={style}/>
        <br />
        <input id='pwd' type="password" placeholder="Enter Password" onChange={this.changeHandler} style={style}/>
        <br />
        <button onClick={this.clickHandler}>Log in</button>
        <div>
        	<h2>ForkEvents List</h2>
        	<ul>
        	<EventsList apiData={this.state.reposApiData==='loading...'?[]:this.state.reposApiData} etype='ForkEvent'/>
        	</ul>
        </div>
       	<div>
       		<h2>PullRequestEvents List</h2>
       		<ul>
       		<EventsList apiData={this.state.eventsApiData==='loading...'?[]:this.state.eventsApiData} etype='PullRequestEvent' />
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
