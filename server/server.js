import express from 'express';
import cors from 'cors';
import './db.js';

import Location from './models/Location.js'

import { fetchWeather, getLocationLongLat } from './services/locationServices.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Get all locations
app.get('/locations', async (req, res) => {
  try {
    const locationsDocs = await Location.find({});
    const locations = locationsDocs.map(loc => loc.locationName)

    return res.send({ locations });
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.post('/locations', async (req, res) => {
  try {
    const locationDoc = await Location.findOne({ locationName: req.body.locationName.toLowerCase() });

    const geoLocationData = await getLocationLongLat(req.body.locationName);
    if(!geoLocationData) {
      throw new Error('Please enter a real city');
    }    

    let message = 'Fetched location data';
    if (!locationDoc) {
      await Location.create({ locationName: req.body.locationName.toLowerCase() });
      message = 'Location added succesfully';
    }
    const location = req.body.locationName.toLowerCase();

    return res.send({ location, message });
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.get('/locations/:name', async (req, res) => {
  try {
    const geoLocationData = await getLocationLongLat(req.params.name);
    const weatherData = await fetchWeather(geoLocationData.longitude, geoLocationData.latitude);

    return res.send({ weatherData, location: req.params.name });
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.get('/delete/:name', async (req, res) => {
  try {
    await Location.findOneAndDelete({ locationName: req.params.name });

    return res.send({ message: 'Deleted Location' });
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.listen(3001, () => {
  console.log('Running on 3001');
});
