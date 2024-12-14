import cors from 'cors';

export const corsConfig = cors({
  //origin: process.env.FRONTEND_URL,
  origin: "*",  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true,
});