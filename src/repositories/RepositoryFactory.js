import UsersRepository from "./usersRepository";
import CommitRepository from "./commitRepository";

const repositories = {
    users: UsersRepository,
    commit: CommitRepository,
    // other repositories ...
};

export const RepositoryFactory = {
    get: name => repositories[name]
};