export const fetchApiData=(url)=>fetch(url)
							.then(res=>res.json())
							.then(data=>data)
							.catch(err=>{alert(err);return false;});
