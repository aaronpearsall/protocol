import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes will be added here
// app.use('/api/workouts', workoutsRouter);
// app.use('/api/exercises', exercisesRouter);
// app.use('/api/logbook', logbookRouter);
// app.use('/api/community', communityRouter);
// app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`🚀 Protocol API server running on port ${PORT}`);
});

