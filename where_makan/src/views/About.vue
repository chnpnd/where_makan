<template>
    <div class="about">
        <p>This is an about page</p>
    </div>
  
    <Login />
  
</template>

<script>
    import Login from '@/components/Login.vue'

    export default {
    name: 'About',
    components:{
        Login
    }
    }
</script>
