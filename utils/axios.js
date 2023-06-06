import axios from 'axios';


const axios1 = axios.create({
    baseURL: 'https://caringstore.xyz/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

const axios2 = axios.create({
    baseURL: 'https://lobster-app-f4kw6.ondigitalocean.app/',
    
    headers: {
        'Content-Type': 'application/json',
    },

});


export {
    axios1,
    axios2
  };

