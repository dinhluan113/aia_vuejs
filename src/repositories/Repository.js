import axios from "axios";

const config = require('../../config.json');
const defaultConfig = config.ConnectionApi;
const baseDomain = defaultConfig;//"http://api.aia.com:56272";

const baseURL = `${baseDomain}`;

export default axios.create({
    baseURL
});