import axios from 'axios';
require('dotenv').config();

const url = `${process.env.URL}/v2/token`;

export const TokenTest = () => {
    test('should reply success', async () => {
        const res = await axios.post(
            url,
            {
                card_number: 377897181068606,
                cvv: 123,
                expiration_month: '08',
                expiration_year: '2028',
                email: 'angelo@gmail.com'
            },
            {
                headers: {
                    Authorization: `Bearer pk_test_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJlamVtcGxvQHBydWViYS5jb20iLCJuYmYiOjE2OTUxNjIwNTgsImV4cCI6MTY5NTE2NTY1OCwiaWF0IjoxNjk1MTYyMDU4fQ.PsdwkZFPVKV--R9M9bp8LMhZwLzpeOh9N91oYXMiBDE`
                }
            }
        );
        expect(res.status).toEqual(200);
        expect(res.data).toHaveProperty('token');
    });
};
