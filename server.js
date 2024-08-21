import express from 'express';
import dotenv from 'dotenv';
import appRouter from './routes/appRouter';
import userRouter from './routes/userRouter';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', appRouter);
app.use('/api', userRouter);

app.listen(PORT, () => {
    console.log(`\n\n Server is running in PORT ${PORT} \n\n`);
});