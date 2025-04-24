import express from 'express';
import cors from 'cors';

//Routers
const openSkyRouter = require('./routes/openSky.router');

const corsOptions = {
    origin: function (origin: any, callback: any) {
        const allowedOrigins = [
            'http://localhost:5173',
            'https://localhost:5173',
        ];

        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);  // Allow if origin matches or if no origin
        } else {
            callback(new Error('Not allowed by CORS'));  // Reject otherwise
        }
    },
    // credentials: true,  // Allow cookies to be sent across origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // allowedHeaders: ['Content-Type', 'Authorization'],
    // exposedHeaders: ['Content-Length', 'X-Kuma-Revision'],
}


const app = express();
app.use(cors(corsOptions));

const PORT = process.env.PORT || 5001;

app.use(express.json());

app.use('/api/opensky', openSkyRouter);

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);