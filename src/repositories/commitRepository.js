import Repository from "./Repository";

const resource = "/commit";

const auth = {
    headers: {
        'method': 'POST',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NzYxNDc5ODIsImlzcyI6ImRpbmhsdWFuMTEzIiwiYXVkIjoiYzRjYTQyMzhhMGI5MjM4MjBkY2M1MDlhNmY3NTg0OWIifQ.OhvAgHtjtiBFr04xgGEVa2s0_yAxDOzJ76CVLX-S5RU'
    },
    crossDomain: true
}

export default {
    ChangeCommitByMonth(commit, month) {
        return Repository.post(`${resource}`, {
            commit: commit,
            month: month
        }, auth);
    }
};