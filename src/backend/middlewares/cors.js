import cors from 'cors';

//configurar na próxima sprint
const corsConfig = function() {
  return cors({
    origin: process.env.FRONTEND_URL, // url no .env do frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true, 
  });
};

export default corsConfig;
