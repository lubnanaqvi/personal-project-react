import { fetchApiData } from './utils'

export const loginAction=(uid)=>{return {type:'LOGIN_USER',uid}}
export const updateUIDAction=(uid)=>{return {type:'UPDATE_UID',uid}}
export const makeForksList=(reposApiData)=>(dispatch)=>{
	 const r=reposApiData
	 			.filter(x=>x.fork)
	 			.map(x=>x.url)
	 			.map(url=>fetch(url).then(r=>r.json()));
	 const forks= Promise.all(r).then(result=>result.map(r=>({name:r.name,url:r.parent.html_url})))
	 forks.then(result=>dispatch({type:'MAKE_FORKSLIST',payload:result})).catch(err=>{alert(err);return false});
	 // .map(x=>x.url).map(url=>fetch(url).then(r=>r.json()))
	 // .then(result=>dispatch( {type:'MAKE_FORKSLIST',payload:result}))
	
}
export const fetchApiAction = (url,propToUpdate) =>
  (dispatch) => fetchApiData(url)
    .then(result => dispatch({
  type: 'FETCH_API',
  payload: result,
  propToUpdate: propToUpdate
}));

   //  const forks=[];
  	// const repoInfoUrlList=action.payload.filter(x=>x.fork).map(x=>x.url);
   //  let requests=repoInfoUrlList.map(url=>fetchApiData(url));
   //  Promise.all(requests)
   //         .then(responses=>{
   //              responses.map(r=>forks.push({name:r.name,url:r.parent.html_url}));
   //              console.log(forks);
   //              })
   //          .catch(err=>console.log(err));