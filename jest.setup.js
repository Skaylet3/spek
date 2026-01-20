import 'whatwg-fetch';

if (!Response.json) {
	Response.json = (data, init) => {
		const response = new Response(JSON.stringify(data), init);
		response.headers.set('Content-Type', 'application/json');
		return response;
	};
}
