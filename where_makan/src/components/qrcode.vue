<template>
    <div class="modal-overlay" v-if="showSuccessModal">
      <div class="modal">
        <div class="modal-header">
          <h5 class="modal-title">Order Successful</h5>
          <button type="button" class="close" @click="closeSuccessModal">&times;</button>
        </div>
        <div class="modal-body">
          <p>Your order has been placed successfully!</p>
          <qrcode-vue :value="updateOrderUrl" :size="250"></qrcode-vue>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeSuccessModal">Close</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import auth from '@/auth.js';
  
  export default {
    props: {
      showSuccessModal: {
        type: Boolean,
        default: false
      },
      consumerId: {
        type: String,
        required: true
      }
    },
    computed: {
      updateOrderUrl() {
        const baseUrl = 'https://stingray-app-4wa63.ondigitalocean.app/Order/api/update/order/';
        const status = 'completed';
        return `${baseUrl}${auth.getUserID}/${status}`;
      }
    },
    methods: {
      closeSuccessModal() {
        this.$emit('close-success-modal');
      }
    }
  };
  </script>
  
  <style>
  /* Your CSS for the modal */
  .modal-overlay {
    /* styles for overlay */
  }
  .modal {
    /* styles for modal */
  }
  </style>
  