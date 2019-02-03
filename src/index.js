import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import * as serviceWorker from './serviceWorker';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
        uid: '',
        pwd: '',
        loggedIn:false,
        message:'Please enter a username and password',
        apiData:{}
    };
    this.clickHandler=this.clickHandler.bind(this);
    this.changeHandler=this.changeHandler.bind(this);
  }
  changeHandler=(e)=>{this.setState({[e.target.id]:e.target.value})}
  clickHandler=(e)=>{
    if('Reactor'===this.state.uid&&'123'===this.state.pwd)
      this.setState({message:'Welcome back Reactor',loggedIn:true});
    else
      this.setState({message:'Invalid username or password',loggedIn:false});
  }
  // componentDidUpdate(){
  // 	if(this.state.loggedIn){
  // 		fetch('https://api.github.com/users/Reactor/events')
  // 			.then((res)=>res.json())
  // 			.then((data)=>{
  // 					console.log(data);
  // 					//this.setState({apiData:data});
  // 				});
  // }
  // }
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
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
