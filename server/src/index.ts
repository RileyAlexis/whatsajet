import express from 'express';

//Routers
const openSkyRouter = require('./routes/openSky.router');

const app = express();
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