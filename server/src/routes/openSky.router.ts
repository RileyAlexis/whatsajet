import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/states', async (req: Request, res: Response) => {

    const latitude = 44.933123;
    const longitude = -93.217654;

    const areainKm = 100; // Area in square kilometers

    const sideInKm = Math.sqrt(areainKm);
    const latOffset = sideInKm / 111;
    const lonOffset = sideInKm / (111 * Math.cos((latitude * Math.PI) / 180));

    const lamin = latitude - latOffset;
    const lamax = latitude + latOffset;
    const lomin = longitude - lonOffset;
    const lomax = longitude + lonOffset;

    console.log(lamin, lamax, lomin, lomax);

    try {

        const allStatesUrl = `https://opensky-network.org/api/states/all?lamin=${lamin}&lamax=${lamax}&lomin=${lomin}&lomax=${lomax}&extended=1`;

        const response = await fetch(allStatesUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log('Response', data);
        res.status(200).json(data);


    } catch (error) {
        console.error('Error fetching data from OpenSky API:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/trythis', async (req: Request, res: Response) => {

    console.log('openSky Router');
    res.status(200).send('openSky Router');


})

module.exports = router;