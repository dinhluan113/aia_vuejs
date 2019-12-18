import UsersRepository from "./usersRepository";
import CommitRepository from "./commitRepository";
import EmployerRepository from "./employerRepository";

const repositories = {
    users: UsersRepository,
    commit: CommitRepository,
    employer: EmployerRepository,
    // other repositories ...
};

export const RepositoryFactory = {
    get: name => repositories[name]
};