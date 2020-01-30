<template>
    <div id="employer_list">
        <h1 class="titleE">Danh sách nhân viên</h1>
        <div class="emp_lstItems">
            <emItem v-for="item in this.arrEmployer" v-bind:key="item.id" :Model="item" />
            <router-link to="/employees/add" class="btnAddEmployer"><i class="fa fa-plus"></i></router-link>
            <a href="javascript:void(0)" v-if="iRemainItems > 0" @click="loadmoreEmpl()">Xem thêm</a>
        </div>
        <loading v-if="this.isShowLoading" themeName="lds-dual-ring"></loading>
    </div>
</template>
<script>
    import emItem from "./EmployerItem.vue"
    import loading from '@/components/shared/loading.vue'

    import { RepositoryFactory } from '@/repositories/RepositoryFactory'
    const EmployerRepository = RepositoryFactory.get('employer')
    const pageSize = 5;
    export default {
        components: {
            emItem,
            loading
        },
        data: function () {
            return {
                arrEmployer: [],
                isShowLoading: false,
                iRemainItems: 0,
                pageIndex: 0
            }
        },
        created: function () {
            this.getListEmployer();
        },
        methods: {
            getListEmployer() {
                let self = this;
                this.isShowLoading = true;
                let promise = EmployerRepository.GetAll(pageSize, this.pageIndex);
                promise
                    .then(function (response) {
                        if (response.data != null) {
                            response.data.lstEmpl.forEach(function (obj) {
                                self.arrEmployer.push(obj);
                            });
                            self.iRemainItems = response.data.remain;
                        }
                        return response;
                    })
                    .catch(function (error) {
                        alert("An error occurred, please try again later.");
                        if (error.response.status === 401)
                            self.$router.push("/login");
                    })
                    .finally(function () {
                        self.isShowLoading = false;
                    })
            },
            loadmoreEmpl() {
                this.pageIndex += 1;
                this.getListEmployer();
            }
        }
    }
</script>

<style>

    #employer_list {
        display: block;
    }

        #employer_list .titleE {
            position: relative;
            position: sticky;
            top: 0;
        }

            #employer_list .titleE i {
                position: absolute;
                left: 16px;
                top: 1.1em;
                font-size: 1em;
            }

        #employer_list .emp_lstItems {
            max-width: 640px;
            margin: auto;
            padding: 10px 0;
        }


    .btnAddEmployer {
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
        background: rgba(41,217,144,1);
        background: -moz-linear-gradient(-45deg, rgba(41,217,144,1) 0%, rgba(10,197,184,1) 100%);
        background: -webkit-gradient(left top, right bottom, color-stop(0%, rgba(41,217,144,1)), color-stop(100%, rgba(10,197,184,1)));
        background: -webkit-linear-gradient(-45deg, rgba(41,217,144,1) 0%, rgba(10,197,184,1) 100%);
        background: -o-linear-gradient(-45deg, rgba(41,217,144,1) 0%, rgba(10,197,184,1) 100%);
        background: -ms-linear-gradient(-45deg, rgba(41,217,144,1) 0%, rgba(10,197,184,1) 100%);
        background: linear-gradient(135deg, rgba(41,217,144,1) 0%, rgba(10,197,184,1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#29d990', endColorstr='#0ac5b8', GradientType=1 );
        border: none;
    }

        .btnAddEmployer i {
            font-size: 2em;
            color: #fff;
        }
</style>