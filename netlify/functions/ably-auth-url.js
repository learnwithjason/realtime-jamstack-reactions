const Ably = require('ably');
const rest = new Ably.Rest({ key: process.env.ABLY_API_KEY });

exports.handler = (_event, _context, callback) => {
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
