import express, { Request, Response } from 'express';
import { console } from 'node:inspector/promises';

const router = express.Router();

router.get('/states', async (req: Request, res: Response) => {

    const latitude = 44.933123;
    const longitude = -93.217654;

    const sideInMiles = Math.sqrt(2); // 1.41
    const latOffset = sideInMiles / 69;
    const lonOffset = sideInMiles / (69 * Math.cos(latitude * Math.PI / 180));

    const lamin = latitude - latOffset;
    const lamax = latitude + latOffset;
    const lomin = longitude - lonOffset;
    const lomax = longitude + lonOffset;

    console.log(lamin, lamax, lomin, lomax);

    try {

        const allStatesUrl = `https://opensky-network.org/api/states/all?lamin=${lamin}&lamax=${lamax}&lomin=${lomin}&lomax=${lomax}`;

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