import axios from 'axios';
require('dotenv').config();

const url = `${process.env.URL}/v2/creditcard`;

export const CreditCardTest = () => {
    test('should reply forbidden', async () => {
        try {
            const res = await axios.get(url, {
                headers: {
                    Authorization: `Bearer pk_test_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJlamVtcGxvQHBydWViYS5jb20iLCJuYmYiOjE2OTUxNjIwNTgsImV4cCI6MTY5NTE2NTY1OCwiaWF0IjoxNjk1MTYyMDU4fQ.PsdwkZFPVKV--R9M9bp8LMhZwLzpeOh9N91oYXMiBDE`
                }
            });
        } catch (error: any) {
            expect(error.response.status).toEqual(401);
        }
    });
    // test('should reply success', async () => {
    //     const res = await axios.get(`${url}`, {
    //         headers: {
    //             Authorization: `Bearer pk_test_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuZ2Vsb0BnbWFpbC5jb20iLCJpYXQiOjE2OTU4NjIyNjEsImV4cCI6MTY5NTg2MzE2MX0.KTxErZkUQ-AuSr-fRYnaaj1YfrqqQG9Ep_dayiJSf1A`
    //         }
    //     });
    //     expect(res.status).toEqual(200);
    //     expect(res.data).toHaveProperty('card_number');
    // });
};
