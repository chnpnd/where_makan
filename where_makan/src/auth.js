import { ref } from 'vue';

const user = ref(null);

export default {
  async login(username, password) {
    const userInput = { 
      id: 0,
      username: username,
      password: password,
      type: 0,
      full_name: "",
      doB: "",
      address: "",
      phone_number: 0,
      profile_image: "",
      user_reward: 0
    }; // Replace this with your actual user data
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInput),
    }
    try {
        const response = await fetch(`https://stingray-app-4wa63.ondigitalocean.app/User/api/login/user`, requestOptions);
        if(response.ok)
        {
            const userData = await response.json();
            console.log(userData)
            if(userData && userData.type !== undefined)
            {
                user.value = userData;
                return true;
            }
            else {
                console.error('Login failed. Invalid response from the server.');
                return false;
            }
        }
        else {
            console.error('Failed to login', response.statusText);
            return false;
        }
    }
    catch (error) {
      console.error('An error occurred while submitting the review:', error);
      return false;
    }
  },

  logout() {
    user.value = null;
  },

  isLoggedIn() {
    if(user.value === null)
      return false;
    return true;
  },

  getUser() {
    return user.value;
  },

  getUserID(){
    return user.id;
  },

  getType(){
    return user.value ? user.value.type : null;
  }

};