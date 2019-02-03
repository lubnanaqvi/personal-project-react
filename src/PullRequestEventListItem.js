import React from 'react';


const PullRequestEventListItem=(props)=><li><a href={props.url}>{props.prt}</a>
											<span className={props.status}>{props.status}</span>
											<span className='merged'>{props.merged}</span>
											</li>
export default PullRequestEventListItem;