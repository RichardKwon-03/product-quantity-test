const autocannon = require('autocannon');

const url = 'http://localhost:3000/products/quantity/decr-race-condition-tx';
const productId = 'a6ea71b6-6248-4733-83b3-23dfc8443c54';

autocannon({
    url,
    method: 'PATCH',
    connections: 100,
    amount: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        id: productId,
    }),
}, (err, result) => {
    if (err) {
        console.error('Autocannon error:', err);
    } else {
        console.log(result);
    }
});
