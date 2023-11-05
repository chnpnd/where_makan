<template>
    <div class="about">
        <p>This is an about page</p>
        <div class="max-w-sm mx-auto"><span class="text-2xl font-bold text-indigo-700"></span>
        </div>
            <Login />
    </div>
  
    
  
</template>

<script>
    import { ref, onMounted } from 'vue';
    import Login from '@/components/Login.vue'

    const userInput = ref([])
    export default {
        name: 'About',
        components:{
            Login
        }
    }
</script>
