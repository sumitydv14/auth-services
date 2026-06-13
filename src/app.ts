import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import healthRoute from './routes/health.route';
import authRouter from './modules/auth/auth.routes';
import { errorHandler } from './middlewares/error.middleware';
import refreshTokenRouter from './modules/refresh-token/refresh-token.routes';
import userRouter from './modules/user/user.routes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use('/health', healthRoute);
app.use('/api/auth', authRouter);
app.use('/api/refresh-token', refreshTokenRouter);
app.use('/api', userRouter);
app.use('/api/docs',swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use(errorHandler);
app.get('/', (req, res) => {
    res.send({
        status: true,
        message: 'Auth service is running'
    });
})


export default app;