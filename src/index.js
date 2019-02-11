// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import EventsList from './EventsList'
// import * as serviceWorker from './serviceWorker';
// import {createStore} from 'redux';
// import {connect,Provider} from 'react-redux';

// const initialState={
//   uid:'Guest',
//   loggedIn:false,
//   message:'Please enter your username:',
//   eventsApiData:'loading...',
//   reposApiData:'loading...',
//   forkEventsList:'',
// }
// //const style=this.state.loggedIn?{display:'none'}:{display:'block'}
// //const revstyle=this.state.loggedIn?{display:'block'}:{display:'none'}
// const App=()=><StoreConnectedComponent />

// const AppContainerComponent=(props)=><div>
//                                         <h1>Hello {props.uid}</h1>
//                                         <p>{props.message}</p>
//                                         <input onChange={(e)=>props.updateUid(e.target.value)} />
//                                         <button onClick={()=>props.loginUser(props.uid)}>Show Lists</button>
//                                       </div>

// const loginAction=(uid)=>{return {type:'LOGIN_USER',uid}}
// const updateUIDAction=(uid)=>{return {type:'UPDATE_UID',uid}}
// const rootReducer=(store=initialState,action)=>{
//   if(action.type==='LOGIN_USER')
//     return {...store,uid:action.uid,loggedIn:true}
//   else if(action.type==='UPDATE_UID')
//     return {...store,uid:action.uid}
//   else
//     return store;
// }
// const mapStateToProps = state => ({ ...state });
// const mapDispatchToProps= dispatch=>({
//   loginUser:(uid)=>dispatch(loginAction(uid)),
//   updateUid:(uid)=>dispatch(updateUIDAction(uid))
// })
// const StoreConnectedComponent=connect(mapStateToProps,mapDispatchToProps)(AppContainerComponent);
// const store=createStore(rootReducer);
// ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { store } from './reducers';

const MyApp = () => <Provider store={store}> <App /> </Provider>;

ReactDOM.render(<MyApp/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();