<template>
    <div class="vintage-container">
      <h2>Share Your Thoughts</h2>
      <div class="review-form">
        <div class="form-group">
          <label for="username">Your Name</label>
          <input type="text" id="username" v-model="review.name" class="form-control vintage-input" placeholder="John Doe">
        </div>
        <div class="form-group">
          <label for="rating">Your Rating</label>
          <select id="rating" v-model="review.rating" class="form-control vintage-input">
            <option value="5">★★★★★ (5)</option>
            <option value="4">★★★★☆ (4)</option>
            <option value="3">★★★☆☆ (3)</option>
            <option value="2">★★☆☆☆ (2)</option>
            <option value="1">★☆☆☆☆ (1)</option>
          </select>
        </div>
        <div class="form-group">
          <label for="comments">Your Review</label>
          <textarea id="comments" v-model="review.comments" rows="5" class="form-control vintage-input" placeholder="Your thoughts..."></textarea>
        </div>
        <button @click="submitReview" class="btn btn-vintage">Submit Review</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        review: {
          name: '',
          rating: '5',
          comments: ''
        }
      };
    },
    methods: {
      submitReview() {
        console.log(this.review);
        alert('Thank you for your feedback!');
      }
    }
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
    max-width: 600px;
    margin: 2rem auto;
  }
  
  .review-form {
    background-color: rgba(255, 255, 255, 0.8);
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
  }
  
  .review-form label {
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
  </style>
  