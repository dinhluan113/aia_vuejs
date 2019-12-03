import Repository from "./Repository";

const resource = "/AiaUsers";
export default {
    get() {
        return Repository.get(`${resource}/GetAll`);
    },
    checkExist(username, password) {
        return Repository.get(`${resource}/CheckUser?username=${username}&password=${password}`);
    },
};