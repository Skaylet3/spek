import 'whatwg-fetch';

// Polyfill Response.json for older node versions or environments where it might be missing/broken
Response.json = (data, init) => {
	const response = new Response(JSON.stringify(data), init);
	response.headers.set('Content-Type', 'application/json');
	return response;
};
