<template>
    <div v-if="this.isShowing">
        <div id="popupDeleteOverlay">
        </div>
        <div id="popupDelete">
            <div class="pD_group1">
                <div class="pD_header">{{ this.title }}</div>
                <a href="javascript:void(0)" class="pD_btnDelete" @click="confirmDelete()">Delete</a>
            </div>
            <div class="pD_group2">
                <a href="javascript:void(0)" class="pD_btnCancel" @click="cancelDelete()">Cancel</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: "Bạn có chắc muốn xóa không?"
        },
        isShowing: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        confirmDelete() {
            this.$emit("deleteObject", true);
        },
        cancelDelete() {
            this.$emit("deleteObject", false);
        }
    },
}
</script>

<style>
#popupDeleteOverlay{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background-color: rgba(0,0,0,0.5);
}
#popupDelete{
    position: fixed;
    bottom: 20px;
    left: 25px;
    right: 25px;
    z-index: 1001;
}
#popupDelete .pD_group1, #popupDelete .pD_group2{
    background-color: rgba(255,255,255,0.9);
    padding: 10px 20px;
    border-radius: 10px;
}
#popupDelete .pD_group2{
    margin-top: 10px;
    padding: 0;
}
#popupDelete .pD_btnDelete{
    color: red;
    font-size: 1.2em;
    display: block;
    padding: 17px 0 6px;
    margin: 14px 0 0;
    border-top: 1px solid #d5d5d5;
}
#popupDelete .pD_btnCancel{
    color: #0040d5;
    font-size: 1.2em;
    padding: 11px 0;
    display: block;
}
</style>