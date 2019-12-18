<template>
    <div>
        <h1 class="titleE">All Employees List</h1>
        <emItem v-for="item in this.arrEmployer" v-bind:key="item.id" :Model="item" />
        <loading v-if="this.isShowLoading" themeName="lds-dual-ring"></loading>
        <router-link to="/employees/add" class="btnAddEmployer"><i class="fa fa-user-plus"></i></router-link>
    </div>
</template>
<script>
import emItem from "./EmployerItem.vue"
import loading from '@/components/shared/loading.vue'

import { RepositoryFactory } from '@/repositories/RepositoryFactory'
const EmployerRepository = RepositoryFactory.get('employer')

export default {
    components: {
        emItem,
        loading
    },
    data: function() {
        return {
            arrEmployer: [],
            isShowLoading: false
        }
    },
    created: function() {
        let self = this;
        this.isShowLoading = true;
        let promise = EmployerRepository.GetAll(10, 0);
        promise
            .then(function(response) {
                if (response.data != null) {
                    response.data.forEach(function(obj) {
                        self.arrEmployer.push(obj);
                    });
                }
                return response;
            })
            .catch(function(error) {
                alert("Đã có lỗi xảy ra vui lòng thử lại sau.");
                console.log(error);
                if (error.response.status === 401)
                    self.$router.push("/login");
            })
            .finally(function() {
                self.isShowLoading = false;
            })
    }
}
</script>

<style>
.titleE {
    background: #039789;
    color: #fff;
    padding: 20px 0;
    font-size: 1.5em;
    position: relative;
}
.btnAddEmployer{
    box-shadow: 0px 0px 8px rgba(0,0,0,0.5);
    border-radius: 4em;
    width: 4em;
    position: fixed;
    bottom: 91px;
    z-index: 1;
    right: 10px;
    width: 3.5em;
    height: 3.5em;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #4aa1c0;
}
    .btnAddEmployer i{
        font-size: 2em;
        color: #fff;
    }
</style>