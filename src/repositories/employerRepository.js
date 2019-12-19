import Repository from "./Repository";

const resource = "/aiaemployer";

export default {
    GetAll(pagesize, pageindex) {
        return Repository.get(`${resource}?pagesize=${pagesize}&pageindex=${pageindex}`, {
            'headers': {
                Authorization: 'Bearer ' + localStorage.getItem('jwt')
            },
            crossDomain: true
        });
    },
    GetById(id) {
        return Repository.get(`${resource}/${id}`, {
            'headers': {
                Authorization: 'Bearer ' + localStorage.getItem('jwt')
            },
            crossDomain: true
        });
    },
    Add(obj) {
        return Repository.post(`${resource}`, obj, {
            'headers': {
                Authorization: 'Bearer ' + localStorage.getItem('jwt')
            },
            crossDomain: true
        });
    },
    Update(obj) {
        return Repository.put(`${resource}`, obj, {
            'headers': {
                Authorization: 'Bearer ' + localStorage.getItem('jwt')
            },
            crossDomain: true
        });
    },
    Delete(id) {
        return Repository.delete(`${resource}?id=${id}`, {
            'headers': {
                Authorization: 'Bearer ' + localStorage.getItem('jwt')
            },
            crossDomain: true
        });
    }
};