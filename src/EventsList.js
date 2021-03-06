import React from 'react';

import ForkEventListItem from './ForkEventListItem';
import PullRequestEventListItem from './PullRequestEventListItem';

const EventsList=(props)=>{

	if(props.isfetched){	
	if(props.etype==='ForkEvent'){
		//console.log(props.apiData);
		const myResult=props.apiData.map((x,i)=><ForkEventListItem key={i} url={x.url} name={x.name}/>);
		return myResult;
	}
	else{
		const filtered=props.apiData.filter(obj=>obj.type===props.etype);
		const myResult=filtered.map((x,i)=><PullRequestEventListItem
										 key={i}
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