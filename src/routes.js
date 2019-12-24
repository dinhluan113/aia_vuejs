import Home from './components/HelloWorld.vue';

// Employer
import Employees from './components/employees/Employees.vue';
import EmployerAdd from './components/employees/Employer_Add.vue';
import EmployerEdit from './components/employees/Employer_Edit.vue';

// Contract
import Contracts from './components/contract/Contracts.vue';
import ContractsAdd from './components/contract/Contract_Add.vue';
import ContractsEdit from './components/contract/Contract_Edit.vue';

import Login from './components/shared/login.vue'
import Profile from './components/profile/profile.vue'

const routes = [
    { path: '/', name: "dashboard", component: Home, meta: { requiresAuth: true } },

    // Employer
    { path: '/employees', name: "employees", component: Employees, meta: { requiresAuth: true } },
    { path: '/employees/add', name: "employeradd", component: EmployerAdd, meta: { requiresAuth: true, layout: 'no-footer' } },
    { path: '/employees/edit/:emid', name: "employeredit", component: EmployerEdit, meta: { requiresAuth: true, layout: 'no-footer' } },

    // Contract
    { path: '/contracts', name: "contracts", component: Contracts, meta: { requiresAuth: true } },
    { path: '/contracts/add', name: "contractsadd", component: ContractsAdd, meta: { requiresAuth: true, layout: 'no-footer' } },
    { path: '/contracts/edit/:id', name: "contractsedit", component: ContractsEdit, meta: { requiresAuth: true, layout: 'no-footer' } },

    { path: '/login', name: "login", component: Login, meta: { layout: 'no-footer' } },
    { path: '/profile', name: "Profile", component: Profile },
];

export default routes;

//{ path: '/student/:id', component: Student },
//Student ID is: {{ $route.params.id }}