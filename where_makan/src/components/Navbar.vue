<template>
  <div>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Source+Sans+Pro&display=swap" rel="stylesheet">
<div>
  <div class="container-fluid pl-0 pr-0">
  <nav class="navbar navbar-expand-lg">
  <router-link :to="{name: 'Home'}" class="navbar-brand">
    <img src="@/assets/where_makan_logo.png" alt="Logo" class="navbar-logo">
  </router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarcoll" aria-controls="navbarcoll" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarcoll">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item active">
        <button
            id="show-modal"
            class="nav-link"
            @click="showModal = true"
          >
            Login/Sign Up
        </button>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'Explore'}" class="nav-link">Explore</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'Analytics'}" class="nav-link">Analytics</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'Profile'}" class="nav-link">Profile</router-link>
      </li>
    </ul>
    </div>
  </nav>
  </div>
  <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <modal :show="showModal" @close="showModal = false">
          <template #header>
            <h3>&nbsp</h3>
          </template>
        </modal>
    </Teleport>
</div>
</div>

</template>

<style lang="scss" scoped>
  .navbar-nav .nav-item .nav-link:hover {
    color: #D40000; 
    background: none;
  }
  .navbar-nav .nav-item .nav-link {
    color: black; /* Set the text color to black */
  }
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Source+Sans+Pro&display=swap'); // Vintage Fonts

.navbar {
    background-color: #f3e0d2; // Soft pastel color inspired by shophouses
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
    font-family: 'Source Sans Pro', sans-serif;
    border-bottom: 3px solid #d4af37; // A touch of gold
}

.navbar-toggler {
    border-color: #b08e6e; // Vintage-inspired color
    &:focus {
        outline: none;
        box-shadow: none;
    }
    .navbar-toggler-icon {
        background-color: #b08e6e;
    }
}

.navbar-nav {
    .nav-item {
        .nav-link {
            color: #625d5d; // Vintage text color
            transition: color 0.3s ease, background-color 0.3s ease;
            padding: 10px 20px;
            border-radius: 10px;

            &:hover {
                color: #d4af37; // Vintage gold color on hover
                background-color: rgba(212, 175, 55, 0.1);
            }
        }
        &.active .nav-link {
            border-bottom: none; // Remove the underline
            background-color: #b08e6e; // Vintage active color
        }
    }

    #show-modal {
        border: 1px solid #d4af37;
        border-radius: 5px;
        color: #d4af37;
        padding: 10px 20px;
        font-family: 'Playfair Display', serif; // Vintage font for button

        &:hover {
            background-color: rgba(212, 175, 55, 0.2);
        }
    }
}

.navbar-logo-link {
    padding: 5px 0;
    margin-left: 20px;
}

.navbar-logo {
    max-width: 60px;
    height: auto;
    margin-right: 10px;
}


</style>

<script setup>
  import { ref } from 'vue'
  const showModal = ref(false)
</script>
