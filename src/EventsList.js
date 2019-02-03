import React from 'react';

import ForkEventListItem from './ForkEventListItem';
import PullRequestEventListItem from './PullRequestEventListItem';

const EventsList=(props)=>{
	if(props.apiData.length>0){
	const filtered=props.apiData.filter(obj=>obj.type===props.etype);
	if(props.etype==='ForkEvent'){
		const myResult=filtered.map(x=><ForkEventListItem url={x.payload.forkee.html_url} name={x.repo.name}/>);
		return myResult;
	}
	else{
		console.log(filtered);

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