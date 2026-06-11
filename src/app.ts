import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import healthRoute from './routes/health.route';
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use('/health', healthRoute);
app.get('/', (req, res) => {
    res.send({
        status: true,
        message: 'Auth service is running'
    });
})


export default app;