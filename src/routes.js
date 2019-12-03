import Home from './components/HelloWorld.vue';
import Contracts from './components/contract/Contracts.vue';
import Employees from './components/employees/Employees.vue';
import Login from './components/shared/login.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/contracts', component: Contracts },
    { path: '/employees', component: Employees },
    { path: '/login', component: Login },
];

export default routes;

//{ path: '/student/:id', component: Student },
//Student ID is: {{ $route.params.id }}