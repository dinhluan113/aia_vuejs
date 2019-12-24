import axios from "axios";

const defaultConfig = process.env.VUE_APP_API;
const baseDomain = defaultConfig;

const baseURL = `${baseDomain}`;

export default axios.create({
    baseURL
});