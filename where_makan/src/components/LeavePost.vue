<template>
    <div v-if="showModal" class="modal-overlay">
      <button class="close-btn" @click="closeModal">×</button>
      <div class="vintage-container">
        <h2>Share Your Thoughts</h2>
        <div class="post-form">
          <div class="form-group">
            <label for="description">Your Post</label>
            <textarea id="description" v-model="post.description" rows="5" class="form-control vintage-input" placeholder="Your post..."></textarea>
          </div>
          <div class="form-group">
            <label for="image">Upload an Image:</label>
            <input type="file" id="image" accept="image/*" @change="handleImageUpload" />
          </div>
          <button @click="submitPost" class="btn btn-vintage">Submit Post</button>
        </div>
        <button @click="closeModal" class="close-button">Close</button>
      </div>
    </div>
  </template>
    
  <script>
  
  export default {
      data() {
        return {
          showModal:false,
          image: null,
          post: {
            likes: 0,
            description: '',
            imageBase64String: ''
          },
          posts: {}
        };
      },
      props: {
          showModal: {
              type: Boolean,
              required: true
          },
          stallId: Number,
          userId: Number,
      },
      methods: {
        async submitPost() {
  
          if(!this.image)
          {
            alert('Please select an image.');
            return;
          }
  
          alert('Thank you for your feedback!');
          // Create a JSON object with the post data
          const postData = {
            business_owner_id: this.userId,
            hawker_stall_id: this.stallId,
            description: this.post.description,
            likes_count: this.post.likes_count,
            post_image: this.post.imageBase64String,
            date: new Date().toISOString(), // Get the current date and time in ISO format
          };
          const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
          };
          try {
              const response = await fetch(`https://stingray-app-4wa63.ondigitalocean.app/Post/api/create/post`, requestOptions);
              console.log(postData);
              if (response.ok) {
                alert('Post submitted successfully!');
                this.posts = await response.json();
                // Reset the post form or perform other actions as needed
                this.closeModal();
                this.$emit('post-submitted');
              } else {
                console.error('Failed to submit the post:', response.statusText);
              }
          } 
          catch (error) {
            console.error('An error occurred while submitting the post:', error);
          }
        },
        closeModal() {
          this.$emit('close');
        },
        handleImageUpload(event) {
          const file = event.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = () => {
              this.post.imageBase64String = reader.result;
            };
            reader.readAsDataURL(file);
            this.image = file;
          }
        },
      },
      
    }
  </script>
    
  <style scoped>
    .vintage-container {
      background-color: #f5f5dc;
      background-image: url('path_to_your_paper_texture.png'); /* Replace with a subtle paper texture */
      padding: 2rem;
      border: 2px solid #d1c7ac;
      border-radius: 10px;
      font-family: 'Times New Roman', Times, serif; /* or another vintage-style font */
      box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.2);
      width: 50%;
      margin: 2rem auto;
    }
    
    .post-form {
      background-color: rgba(255, 255, 255, 0.8);
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
    }
    
    .post-form label {
      color: #5a4a42;
      font-weight: bold;
      font-size: 1.1rem;
    }
    
    .vintage-input {
      background-color: #faf8e4;
      border: 2px solid #d1c7ac;
      border-radius: 5px;
      color: #5a4a42;
      margin-top: 0.5rem;
    }
    
    .btn-vintage {
      background: linear-gradient(#a89f91, #8c827b);
      border: 1px solid #d1c7ac;
      color: #f5f5dc;
      border-radius: 5px;
      padding: 0.5rem 1rem;
      cursor: pointer;
      transition: background-color 0.3s ease, transform 0.2s ease;
      margin-top: 1rem;
    }
    
    .btn-vintage:hover {
      background: linear-gradient(#8c827b, #a89f91);
      transform: translateY(-2px);
    }
    
    .btn-vintage:active {
      transform: translateY(0);
    }
  
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
  
    .selected {
      font-size: 36px;
      color: #FFD700; /* Change this to your selected star color */
    }
  
    .unselected {
      font-size: 36px;
      color: grey; /* Change this to your unselected star color */
    }
  </style>
    