<template>
    <router-link :to="{ name: 'employeredit', params: { emid: this.Model.id }}" class="employerItem" v-if="this.Model != null">
        <div class="col1">
            <img src="@/assets/img/employer.png" />
        </div>
        <div class="col2">
            <p class="pName">{{ Model.name }}</p>
            <p><a v-bind:href="'tel:' + Model.phone" class="pDate">{{ Model.phone }}</a></p>
        </div>
        <div class="col3">
            <i class="fa fa-expand"></i>
        </div>
    </router-link>
</template>

<script>
export default {
    props: {
        Model: {
            type: Object,
            default: null
        }
    },
    data: function(){
        return{
            // dateFormated: ""
        }
    },
    created: function(){
        // var date = new Date(this.Model.dateCreated);
        // var dd = date.getDate();
        // var mm = date.getMonth()+1; 
        // var yyyy = date.getFullYear();
        // if(dd<10) 
        //     dd='0'+dd;
        // if(mm<10) 
        //     mm='0'+mm;

        // this.dateFormated = dd + "/" + mm + "/" + yyyy;
    }
}
</script>

<style>
.employerItem {
    display: block;
    padding: 10px 0;
    background: #fff;
    margin: 10px 5px;
    border-radius: 4px;
}
    .employerItem:first-child{
        margin-top: 0;
    }

    .employerItem>div {
        display: inline-block;
    }

    .employerItem>div.col1 {
        width: 20%;
    }

        .employerItem>div.col1 img {
            max-width: 55%;
            border-radius: 50%;
            vertical-align: middle;
        }

    .employerItem>div.col2 {
        width: 50%;
        text-align: left;
        vertical-align: middle;
    }


        .employerItem>div.col2 .pDate{
            color: #7b7b7b;
            font-size: 0.9em;
        }

    .employerItem>div.col3 {
        width: calc(30% - 17px);
        text-align: right;
        padding-right: 17px;
    }
</style>