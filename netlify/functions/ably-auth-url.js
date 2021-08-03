const Ably = require('ably');
const rest = new Ably.Rest({ key: process.env.ABLY_API_KEY });

exports.handler = (event, _context, callback) => {
  if (event.httpMethod === 'OPTIONS') {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    };

    // https://stackoverflow.com/questions/55769272/how-to-set-up-cors-in-netlify-serverless-function
    return {
      statusCode: 200,
      headers,
      body: 'CORS is alright with me',
    };
  }

  rest.auth.createTokenRequest({}, (err, tokenRequest) => {
    if (err) {
      callback({
        statusCode: 500,
        body: JSON.stringify(err),
      });
    } else {
      callback(null, {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tokenRequest),
      });
    }
  });
};
