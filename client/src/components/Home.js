import axios from 'axios';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";

import '../styles/Home.css'
function Home() {

  const [locations, setLocations] = useState([]);
  const [locationName, setLocationName] = useState('');

  const navigate = useNavigate();

  const getLocations = async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/locations');
      setLocations(data.locations);
    } catch (err) {
      toast.error('Failed to load locations')
    }
  }

  useEffect(() => {
    getLocations();
  }, []);


  function checkInputs() {
    if (!locationName.length) throw new Error('Missing Location Name');
  }

  const deleteLocation = async (name) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/delete/${name}`);
      await getLocations();
      toast.success(data.message);
    } catch (err) {
      toast.error('Failed to load locations')
    }
  }

  async function addLocation() {
    try {
      checkInputs();

      const locationData = {
        locationName
      }

      const { data } = await axios.post('http://localhost:3001/locations', locationData);
      toast.success(data.message);
      navigate(`/${data.location}`);
    } catch (err) {
      toast.error(err.message);
    }
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="Home">
      <div>
        <div className='Header'>Weather App</div>
        <div className='Dropdown'>
          <div className='DropdownHeader'>Favorites</div>
          <div className='DropdownContent'>
            {locations.map(item => (
              <div className='DropdownItem' key={item}>
                <Link to={`/${item}`}>{capitalizeFirstLetter(item)}</Link>
                <button onClick={() => deleteLocation(item)} className='DeleteLocation'>Delete</button>
              </div>
            ))}
          </div>
        </div>
        <div className='AddLocation'>
          <div className="AddLocationForm">
            <div>
              <div>Enter a City Name</div>
              <input placeholder='City Name' type={'text'} value={locationName} className='AddLocationInput' onChange={(e) => setLocationName(e.target.value)} />
            </div>

            <button className='AddLocationBtn' onClick={() => addLocation()}>Search</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
