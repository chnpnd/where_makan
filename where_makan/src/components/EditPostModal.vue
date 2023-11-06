<template>
    <div v-if="showEditPostModal" class="modal show d-block" tabindex="-1">
        <div class="modal-backdrop">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Edit Post</h5>
                        <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group mb-4">
                            <label for="description" class="form-label">Your Post</label>
                            <textarea id="description" v-model="updatedDescription" rows="5" class="form-control" placeholder="Share your posts..."></textarea>
                        </div>
                        <div class="form-group mb-4">
                            <img v-if="updatedImageBase64" v-bind:src="updatedImageBase64" alt="Consumer Image" class="consumer-image img-fluid rounded mb-3"/>
                            <h5>Reupload Image</h5>
                            <div class="input-group">
                                <input type="file" class="form-control" id="image" accept="image/*" @change="handleImageUpload" />
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button @click="closeModal" class="btn btn-light">Close</button>
                        <button @click="editPost" class="btn btn-primary">Confirm Edit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import auth from '../auth'

export default {
    props: {
        showEditPostModal: {
            type: Boolean,
            required: true
        },
        post: {}
    },
    data() {
        return {
            updatedDescription: this.post.description,
            updatedImageBase64: this.post.post_image,
        }
    },
    methods: {
        async editPost()
        {
            const postData = {
                id: this.post.id,
                business_owner_id: auth.getUserID(), // Replace with the actual consumer_id
                hawker_stall_id: this.post.hawker_stall_id, // Replace with the actual hawker_stall_id
                description: this.updatedDescription,
                likes_count: this.post.likes_count,
                post_image: this.updatedImageBase64,
                date: new Date().toISOString(), // Get the current date and time in ISO format
            };
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            };
            try {
                console.log(this.business_owner_id);
                const response = await fetch(`https://stingray-app-4wa63.ondigitalocean.app/Post/api/update/post/${this.post.id}`, requestOptions);
                if (response.ok) {
                    console.log(response.ok);
                    alert('Post updated successfully!');
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
        saveEdit() {
            // Update the post in the parent component or send a request to update the post in the database.
            this.$emit('update-post', this.updatedDescription);
            this.closeModal();
        },
        setRating(rating) {
            this.updatedRating = rating;
        },
        handleImageUpload(event) {
            const file = event.target.files[0];
            if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                this.updatedImageBase64 = reader.result;
            };
            reader.readAsDataURL(file);
            this.image = file;
            }
        },
    }
}
</script>

<style scoped>
.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.75); /* 75% black background */
    z-index: 1000; /* Ensures it appears over the other content */
}

.modal-content {
    border-radius: 15px;
    transition: transform 0.3s ease-out, opacity 0.3s ease-out;
}

.modal.show .modal-content {
    transform: scale(1.05);
    opacity: 0.9;
}

.star-ratings span {
    font-size: 24px;
    margin-right: 5px;
    cursor: pointer;
    transition: color 0.2s ease;
}

.star-ratings span:hover,
.star-ratings span:hover ~ span {
    color: #aaa;
}

.selected {
    color: #FFD700;
}

.unselected {
    color: grey;
}

.consumer-image {
    max-width: 100%;
    height: auto;
}

btn {
    transition: all 0.3s ease;
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.btn:active {
    transform: translateY(0);
}

/* Gradient for modal header */
.modal-header {
    background: linear-gradient(45deg, #007BFF, #6610f2);
    color: white;
}

/* Interactive Star Ratings */
.star-ratings span:hover, 
.star-ratings span:hover ~ span {
    color: #FFD700;  /* This will highlight stars on hover */
}

/* Modal Depth */
.modal-content {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}
</style>