const fetcher = (url) => fetch(url, {mode: 'no-cors'}).then((res) => res.json());
export default fetcher