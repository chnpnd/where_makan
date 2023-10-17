<template>
    <div v-if="foodStall" class="stall-container d-flex">
        <div class="stall-image-container mr-4">
            <img :src="foodStall.store_url" alt="Stall Image" class="stall-image"/>
        </div>
        <div class="stall-details">
            <h1>{{ foodStall.name }}</h1>
            <p><strong>Phone Number:</strong> {{ foodStall.phone_number }}</p>
            <p><strong>Address:</strong> {{ foodStall.address }}</p>
            <p><strong>Opening Hours:</strong> {{ foodStall.opening_hours }}</p>
            <p><strong>Rest Day:</strong> {{ foodStall.rest_day }}</p>
            <p><strong>Signature Item:</strong> {{ foodStall.signature_item }}</p>
            <p><strong>Cuisine Type:</strong> {{ cuisine }}</p>
            <a :href="foodStall.source_url" target="_blank" class="stall-link">Read More</a>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            foodStall: {},
            cuisine: {}
        }
    },
    props: ['stallId'],
    async created() {
        const stallRes = await fetch(`https://stingray-app-4wa63.ondigitalocean.app/HawkerStall/api/get/stall/${this.stallId}`);
        if (stallRes.ok) {
            this.foodStall = await stallRes.json();
            const cuisineRes = await fetch(`https://stingray-app-4wa63.ondigitalocean.app/Cuisine/api/get/cuisine/${this.foodStall.cuisine_type}`);
            if (cuisineRes.ok) {
                this.cuisine = await cuisineRes.text();
            }
        }
    }
}
</script>

<style>
.stall-container {
    max-width: 800px;
    margin: 50px auto;
    background-color: #f5e8d7;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    font-family: 'Georgia', serif;
}

.stall-image-container {
    flex-basis: 40%;
}

.stall-image {
    max-width: 100%;
    border-radius: 10px;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
}

.stall-details {
    flex-basis: 60%;
    color: #5a4134;
}

.stall-details h1 {
    font-size: 24px;
    margin-bottom: 15px;
    text-transform: uppercase;
    letter-spacing: 2px;
    border-bottom: 2px solid #5a4134;
    padding-bottom: 10px;
}

.stall-link {
    display: inline-block;
    padding: 8px 15px;
    margin-top: 20px;
    border: 1px solid #5a4134;
    border-radius: 5px;
    text-decoration: none;
    font-weight: bold;
    color: #f5e8d7;
    background-color: #5a4134;
    transition: background-color 0.3s, color 0.3s;
}

.stall-link:hover {
    background-color: #f5e8d7;
    color: #5a4134;
    text-decoration: underline;
}

</style>