import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send({
        status: true,
        message: 'Auth service is running'
    });
})


export default app;