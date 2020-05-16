import axios from 'axios'

const instance = axios.create({
    baseURL: "https://stgapi.omnicuris.com/api/v3/courses"
});

export default instance;