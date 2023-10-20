<template>
    <div>
        <h1>Food Cart: </h1>
        <!-- display the selected food items -->
        <li v-for="(item, index) in items" :key="index">{{item}} </li>
    </div>
</template>

<script>
    const vm = Vue.createApp({  
            data() {
                return {
                    items: ['keyboard', 'mouse', 'iPhone', 'macbook', 'adapter'],
                    addItem: "",
                }
                
            },
            computed:{

            },
        });
</script>