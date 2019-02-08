export const fetchApiData=(url)=>fetch(url)
							.then(res=>res.json())
							.then(data=>data)
							.catch(err=>console.log(err));
export const makeForksList=(apiData,forks=[])=>{
	const repoInfoUrlList=apiData.filter(x=>x.fork).map(x=>x.url);
	let requests=repoInfoUrlList.map(url=>fetchApiData(url));
	Promise.all(requests).then(responses=>{
		responses.map(r=>forks.push({name:r.name,url:r.parent.html_url}));
	}).catch(err=>console.log(err));
	return forks;
}
// 	apiData.filter(x=>x.fork)
// 			.map(x=>x.url)
// 			.map((url,i)=>fetchApiData(url)
// 						.then(data=>{
// 							forks.push({name:data.name,url:data.parent.html_url});

// 						}));
// }

