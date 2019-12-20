<template>
    <router-link :to="{ name: 'employeredit', params: { emid: this.Model.id }}" class="contractItem" v-if="this.Model != null">
        <div class="cta_row1">
            <i class="fa fa-id-card" />
            <p class="pName">ABC XYZ {{ Model.Customer_Name }}</p>
        </div>
        <div class="cta_row2">
            <div class="cta_col1">
                <p class="cta_sub">Created at</p>
                <p class="cta_vl">{{ this.dateFormated }}</p>
            </div>
            <div class="cta_col2">
                <p class="cta_sub">Owner</p>
                <p class="cta_vl">{{ this.Model.userName }}</p>
            </div>
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
        data: function () {
            return {
                dateFormated: ''
            }
        },
        mounted: function () {
            var today = new Date(this.Model.dateCreated.substring(0, 10));
            this.dateFormated = String(today.getDate()).padStart(2, '0') + "/" + String(today.getMonth() + 1).padStart(2, '0') + "/" + today.getFullYear();
        }
    }
</script>

<style>
    .contractItem {
        display: block;
        padding: 10px 15px;
        background: #fff;
        margin: 10px 5px;
        border-radius: 4px;
    }

        .contractItem:first-child {
            margin-top: 0;
        }

        .contractItem > div {
            display: block;
            text-align: left;
        }

        .contractItem .cta_row1 i {
            font-size: 2em;
            vertical-align: middle;
            font-weight: normal;
        }

        .contractItem .cta_row1 .pName {
            display: inline-block;
            margin-left: 10px;
            font-weight: bold;
            font-size: 1.2em;
        }


        .contractItem > div.cta_row2 {
            padding: 10px 0 5px;
        }

            .contractItem > div.cta_row2 > div {
                display: inline-block;
                padding: 6px 16px 0 0;
            }

            .contractItem > div.cta_row2 .cta_sub {
                color: #9a9b9c;
                font-size: 0.9em;
            }

            .contractItem > div.cta_row2 .cta_vl {
                color: #151e3b;
                font-size: 0.9em;
                margin-top: 5px;
            }
</style>