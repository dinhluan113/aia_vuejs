import UsersRepository from "./usersRepository";

const repositories = {
    users: UsersRepository,
    // other repositories ...
};

export const RepositoryFactory = {
    get: name => repositories[name]
};