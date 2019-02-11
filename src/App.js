import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {connect} from 'react-redux';
import { loginAction, updateUIDAction,fetchApiAction,makeForksList } from './actions';
import EventsList from './EventsList'
const mapStateToProps=state=>({...state});


const mapDispatchToProps= dispatch=>({
  loginUser:(uid)=>dispatch(loginAction(uid)),
  updateUid:(uid)=>dispatch(updateUIDAction(uid)),
  fetchApi:(url,proptoupdate)=>dispatch(fetchApiAction(url,proptoupdate)),
  makeForksList:(reposApiData)=>dispatch(makeForksList(reposApiData))
});
const AppContainerComponent=(props)=>{
useEffect(()=>{
  if(props.reposApiData&&props.forksfetched&&props.forklistnotmade)
    props.makeForksList(props.reposApiData);
  console.log(props.forkEventsList)
});
const style=props.loggedIn?{display:'block'}:{display:'none'};
const revstyle=props.loggedIn?{display:'none'}:{display:'block'};
return(  
    <div className={'myApp'}>
    <h1 style={style}>Hello {props.uid}</h1>
      <p style={revstyle}>{props.message}</p>
      <input onChange={(e)=>props.updateUid(e.target.value)} style={revstyle}/>
      <button onClick={()=>{
                            props.loginUser(props.uid);
                            props.fetchApi('https://api.github.com/users/'+props.uid+'/repos','reposApiData');
                            //props.makeForksList(props.reposApiData);
                            props.fetchApi('https://api.github.com/users/'+props.uid+'/events','eventsApiData');
                            }
                      } style={revstyle}>Show Lists</button>
      <div style={style}>
      <h3>Fork Events</h3>
      <ul>
        <EventsList listtype="forks" apiData={props.forkEventsList} isfetched={!props.forklistnotmade}/>
      </ul>
      <h3>Pull Requests</h3>
      <ul>
        <EventsList listtype="pulls" apiData={props.eventsApiData} isfetched={props.pullsfetched}/>
      </ul>
      </div>
      </div>
)}
export default connect(mapStateToProps,mapDispatchToProps)(AppContainerComponent);
