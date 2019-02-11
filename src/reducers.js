import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {fetchApiData} from './utils'

const initialState={
  uid:'Guest',
  loggedIn:false,
  message:'Please enter your username:',
  eventsApiData:'',
  reposApiData:'',
  forkEventsList:'',
  pullEventsList:'',
  forksfetched:false,
  pullsfetched:false,
  forklistnotmade:true
}

const rootReducer=(store=initialState,action)=>{
  if(action.type==='LOGIN_USER')
    return {...store,uid:action.uid,loggedIn:true}
  else if(action.type==='UPDATE_UID')
    return {...store,uid:action.uid}
  else if(action.type==='FETCH_API'){
  	const fetchedToUpdate=action.propToUpdate==='reposApiData'?'forksfetched':'pullsfetched';
  	return {...store,[action.propToUpdate]:action.payload,[fetchedToUpdate]:true};
  }
  else if(action.type==='MAKE_FORKSLIST'){
    return {...store,forkEventsList:action.payload,forklistnotmade:false}
  }
    return store;
}

export const store=createStore(rootReducer,applyMiddleware(thunk));