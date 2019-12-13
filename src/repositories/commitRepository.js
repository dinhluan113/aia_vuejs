import Repository from "./Repository";

const resource = "/commit";

export default {
    ChangeCommitByMonth(commit, month) {
        return Repository.post(`${resource}`, {
            commit: commit,
            month: month
        }, {
            headers: {
                'method': 'POST',
                Authorization: 'Bearer ' + localStorage.getItem('jwt')
            },
            crossDomain: true
        });
    }
};