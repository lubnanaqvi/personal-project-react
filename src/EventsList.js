import React from 'react';

import ForkEventListItem from './ForkEventListItem';
import PullRequestEventListItem from './PullRequestEventListItem';

const EventsList=(props)=>{

	if(props.apiData.length>0){	
	if(props.etype==='ForkEvent'){
		const filtered=props.apiData.filter(obj=>obj.fork)
		const myResult=filtered.map(x=><ForkEventListItem url={x.html_url} name={x.name}/>);
		return myResult;
	}
	else{
		const filtered=props.apiData.filter(obj=>obj.type===props.etype);
		const myResult=filtered.map(x=><PullRequestEventListItem
										 prt={x.payload.pull_request.title}
										 url={x.payload.pull_request.html_url} 
										 status={x.payload.pull_request.state}
										 merged={x.payload.pull_request.merged?'merged':''}
										 />);
		return myResult
		
	}
	
	}
	else
		return null;
}

export default EventsList;