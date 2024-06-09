import axios from 'axios';

axios.defaults.withCredentials = true;
// axios.defaults.baseURL = 'http://localhost:4000/api';

// Now, you can import this configuration in your components
export default axios;