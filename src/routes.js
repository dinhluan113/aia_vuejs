import Home from './components/HelloWorld.vue';
import Contracts from './components/contract/Contracts.vue';
import Employees from './components/employees/Employees.vue';
import Login from './components/shared/login.vue'

const routes = [
    { path: '/', name: "dashboard", component: Home, meta: { requiresAuth: true } },
    { path: '/contracts', name: "contracts", component: Contracts, meta: { requiresAuth: true } },
    { path: '/employees', name: "employees", component: Employees, meta: { requiresAuth: true } },
    { path: '/login', name: "login", component: Login, meta: { layout: 'no-footer' } },
];

export default routes;

//{ path: '/student/:id', component: Student },
//Student ID is: {{ $route.params.id }}