<template>
    <div>
        <slot />
        <Footer />
    </div>
</template>

<script>
    import Footer from '@/components/layout/footer.vue'
    export default {
        components: {
            Footer
        }
    }
</script>

<style>
</style>