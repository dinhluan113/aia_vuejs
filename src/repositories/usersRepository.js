import Repository from "./Repository";

const resource = "/aiausers";
export default {
    get(id) {
        return Repository.get(`${resource}/${id}`, {
            'headers': {
                Authorization: 'Bearer ' + localStorage.getItem('jwt')
            },
            crossDomain: true
        });
    },
    validate(token) {
        return Repository.get(`${resource}/validate?token=${token}`, {
            crossDomain: true
        });
    },
    checkExist(user) {
        return Repository.post(`${resource}`, user, {
            headers: {
                'method': 'POST',
            },
            crossDomain: true
        })
    },
};