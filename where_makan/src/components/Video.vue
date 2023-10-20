<template>
  <div class="video-wrapper">
    <h2 class="video-title">Recently Featured Hawkers</h2>
    <div class="video-container">
      <iframe
        :src="videoUrl"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // List of YouTube video IDs related to Singapore hawker food.
        videoIds: [
          "ERyJ_9IIfU8",
          "V0LvbAdgX6I",
          "_Ttf--3axiY",
          "5bJAV0ljsFo",
          "B4nRgGnaknY",
          "K5sAw6wZzLY",
          "Ykb15bNIUQk",
          "GcZWFj2pXhE",
          "1fngYpOCfhg",
          "e-QxGrgVWWM",
          "k8bKMt8_XLQ",
          // ... add more video IDs as needed
        ],
        selectedVideoId: "",
      };
    },
    computed: {
      videoUrl() {
        return `https://www.youtube.com/embed/${this.selectedVideoId}`;
      },
    },
    mounted() {
      this.selectRandomVideo();
    },
    methods: {
      selectRandomVideo() {
        const randomIndex = Math.floor(Math.random() * this.videoIds.length);
        this.selectedVideoId = this.videoIds[randomIndex];
      },
    },
  };
  </script>
  
  
  
  <style scoped>
/* Typography */
.video-title {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
  border-bottom: 2px solid #d4af37;
  padding-bottom: 10px;
}

/* Video Wrapper */
.video-wrapper {
  background-color: #faf5e6; /* A soft, vintage background color */
  border: 1px solid #e5e0d3;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  margin: 20px auto;
  max-width: 1024px;
  width:75%;
}

/* Video Container */
.video-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  overflow: hidden;
  border-radius: 10px;
  border: 3px solid #d4af37; /* A vintage gold border */
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}
</style>