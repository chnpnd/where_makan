<template>
    <div class="popup-overlay" v-if="showModal">
      <div class="popup-content" >
        <!-- Modal content here -->
        
        <div class="card bg-glass my-10" style="width:100%; height:100%; border-radius: 0;">
            <button class="close-btn text-danger mx-2 text-right" @click="closeModal" style="font-size:24px;">×</button>
            <div class="login d-flex flex-column align-items-center">
                <img src="@/assets/where_makan_logo.png" alt="where_makan_logo" class="my-5"/>
            </div>
            <h1>Create An Account</h1>
            <div class="card-header border-bottom-0 bg-transparent">
                  <ul class="nav nav-tabs justify-content-center pt-4" id="pills-tab" role="tablist">
                    <li class="nav-item">
                      <a class="nav-link active text-danger" id="pills-login-tab" data-toggle="pill" href="#pills-login" role="tab" aria-controls="pills-login" aria-selected="true">Customer</a>
                    </li>
  
                    <li class="nav-item">
                      <a class="nav-link text-danger" id="pills-register-tab" data-toggle="pill" href="#pills-register" role="tab" aria-controls="pills-register" aria-selected="false">Hawker Owner</a>
                    </li>
                  </ul>
                </div>

                <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="pills-login-tab">
                <form @submit.prevent="handleSignup(1)">
                <!-- Business Name -->
                <div class="form-outline mb-4">
                    <input type="text" class="form-control" v-model="username"/>
                    <label class="form-label text-danger" for="form3Example3">Username</label>
                </div>

                <!-- Password input -->
                <div class="form-outline mb-4">
                    <input type="password" class="form-control" v-model="password"/>
                    <label class="form-label text-danger" for="form3Example4">Password</label>
                </div>

                <!-- Login button -->
                <button type="submit" class="btn btn-danger btn-block my-10">
                    Sign Up
                </button>
                </form>
            </div>

            <div class="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="pills-register-tab">
                <form @submit.prevent="handleSignup(0)">
                <!-- Business Name -->
                <div class="form-outline mb-4">
                    <input type="text" class="form-control" v-model="username"/>
                    <label class="form-label text-danger" for="form3Example3">Business name</label>
                </div>
                <!-- Password input -->
                <div class="form-outline mb-4">
                    <input type="password" class="form-control" v-model="password" />
                    <label class="form-label text-danger" for="form3Example4">Password</label>
                </div>

                <!-- Login button -->
                <button type="submit" class="btn btn-danger btn-block my-10">
                    Sign Up
                </button>
                </form>
            </div>
            </div>

        </div>
        
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import auth from '../../auth';
  import { useRouter } from 'vue-router';
  
  export default {
    setup(){
      const router = useRouter();
      const username = ref('');
      const password = ref('');
      const showModal = ref(false);

      const handleSignup = async (userType) => {
        const created = await auth.signup(username.value, password.value, userType);
        if (created) {
          const success = await auth.login(username.value, password.value);
          if (success) {
            if (auth.getType() === userType) {
              alert('Successful log in!');
              if(userType === 1)
              {
                router.push({ name: 'Home' });
              }
              else if (userType === 0)
              {
                router.push({ name: 'stall-details', params: { stallId: auth.getStallId() } });
              }
            } else {
              alert(`Incorrect user type. Expected type ${userType}.`);
            }
          } 
          else {
            alert('Failed to login, please try again.');
          }
        }
        else {
            alert('Failed to signup, please try again.');
        }
      }
      return{
        showModal,
        username,
        password,
        handleSignup
      }
    },
    props: {
      showModal: Boolean,
    },
    methods: {
      closeModal() {
        this.$emit('close'); // Emit a custom event to notify the parent component to close the modal
      },
    },
  };
  </script>
  
  <style scoped>
 @import 'loginPage.css';
 .bg-glass {
      background-color: hsla(0, 44%, 96%, 0.9) ;
      backdrop-filter: saturate(200%) blur(25px);
  }

.popup-content {
position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
  </style>
  