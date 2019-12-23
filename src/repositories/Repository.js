import axios from "axios";

const config = require('../../config.json');
const defaultConfig = config.ConnectionApi;
const baseDomain = defaultConfig;

const baseURL = `${baseDomain}`;

export default axios.create({
    baseURL
});