import axios from 'axios';
import { useState, useEffect } from 'react';

import { OpenSkyStatesResponse } from './types/states';

function App() {

  const [aircraft, setAircraft] = useState<OpenSkyStatesResponse | null>(null);

  const callStates = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/opensky/states', {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setAircraft(response.data);
      console.table(response.data);
    } catch (error) {
      console.error('Error fetching data from OpenSky API:', error);
    }
  }


  const callTest = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/opensky/trythis', {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data from OpenSky API:', error);
    }
  }


  return (
    <div>
      <p>Working</p>
      <button onClick={callStates}>Call</button>
      <br />
      <button onClick={callTest}>Call Test</button>

      <p>
        {aircraft && aircraft.states && aircraft.states.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ICAO24</th>
                <th>Callsign</th>
                <th>Origin Country</th>
                <th>Time Position</th>
                <th>Last Contact</th>
                <th>Longitude</th>
                <th>Latitude</th>
                <th>Baro Altitude</th>
                <th>On Ground</th>
                <th>Velocity</th>
                <th>True Track</th>
                <th>Vertical Rate</th>
              </tr>
            </thead>
            <tbody>
              {aircraft.states.map((state, index) => (
                <tr key={index}>
                  {state.map((item, idx) => (
                    <td key={idx}>{item !== null ? item.toString() : 'N/A'}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data available.</p>
        )}
      </p>

    </div>
  )
}

export default App;
