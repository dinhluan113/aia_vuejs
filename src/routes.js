import Home from './components/HelloWorld.vue';
import Contracts from './components/contract/Contracts.vue';
import Employees from './components/employees/Employees.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/contracts', component: Contracts },
    { path: '/employees', component: Employees },
];

export default routes;

//{ path: '/student/:id', component: Student },
//Student ID is: {{ $route.params.id }}