<template>
  <transition name="fade">
    <div v-if="showOrder" class="modal-overlay">
      <div class="modal fade show" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Complete your order</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeOrderModal">
                x
              </button>
            </div>
            <div class="modal-body">
              <p><strong>Food Item:</strong> {{ selectedFood.name }}</p>
              <p><strong>Price:</strong> ${{ selectedFood.price.toFixed(2) }}</p>
              <!-- vue-stripe-checkout component -->
              <stripe-checkout
                ref="checkoutRef"
                mode="payment"
                :pk="publishableKey"
                :line-items="lineItems"
                @loading="v => loading = v"
              />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" :disabled="isLoading" @click="submit">
                <span v-if="isLoading">Processing... <i class="fa fa-spinner fa-spin"></i></span>
                <span v-else>Place Order</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script >

import VueMask from 'v-mask';
import { StripeCheckout } from '@vue-stripe/vue-stripe';
import QRCode from 'qrcode';
import auth from '../auth';


export default {
  components: {
    StripeCheckout,
    QRCode
  },
  directives: {
    mask: VueMask.VueMaskDirective,
  },
  props: {
    selectedFood: {
      type: Object,
      required: true
    },
    showOrder: {
      type: Boolean,
      required: true
    },
  },
  data() {
    return {
      isLoading: false,
      publishableKey: "pk_test_51MrLT6LBkZwSamzsNhao318a2xHlKl5jVLkcOSnXKKPCMSVBjOKJGaNmLZ96ons6fAD3psuHFSagxw842GBgQUAC00iQmwuOSA",
      lineItems: [
        {
          price: 'price_1O8hhTLBkZwSamzsGGHTjCrR', // The id of the one-time price you created in your Stripe dashboard
          quantity: 1,
        },
      ],
      base64QRCode: '',
    };
  },
  methods: {
    closeOrderModal() {
      this.$emit('close');
    },
    async submit () {
      await this.generateQRCode();
      await this.createOrder();
    },
    async generateQRCode(){
      const userId = auth.getUserID();
      const status = "completed";
      const baseUrl = 'https://stingray-app-4wa63.ondigitalocean.app/Order/api/update/order';
      const qrCodeUrl = `${baseUrl}/${userId}/${status}`;

      try {
        // Convert the QR code to a Data URL (Base64 encoded)
        const qrCodeDataUri = await QRCode.toDataURL(qrCodeUrl);
        this.base64QRCode = qrCodeDataUri;
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    },
    async createOrder() {
      const orderDetails = {
        consumer_id: auth.getUserID(), 
        hawker_stall_id: this.selectedFood.hawkerStallId, 
        food_id: this.selectedFood.id,
        order_date: new Date().toISOString(), 
        total_amount: this.selectedFood.price,
        status: "pending",
        qrCode: this.base64QRCode
      };
      const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderDetails),
        };
      try {
        const response = await fetch(`https://stingray-app-4wa63.ondigitalocean.app/Order/api/create/order`,requestOptions);
        console.log(requestOptions);
        if (response.ok) {
          // Handle the success (e.g., show a message to the user, redirect, etc.)
          this.$refs.checkoutRef.redirectToCheckout();
        } else {
          // Handle any errors that the server might return
          console.error('Failed to submit the order:', response.statusText);
          }
        } catch (error) {
        console.log(error.message);
      }
    },
  }
};
</script>

<style scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050; 
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6); 
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15); 
  width: auto; 
  max-width: 500px; 
  margin: 10px; 
  display: contents; 
}

.modal-dialog {
  display: flex;
  flex-direction: column;
  background:white;
}

.modal-content {
  padding: 25px; 
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px; 
}

.modal-title {
  font-size: 1.25rem; 
  font-weight: 600; 
  color: #333; 
}

.close {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-body {
  font-size: 1rem;
  color: #555; 
  line-height: 1.5; 
}

.form-group {
  margin-bottom: 15px; 
}

.form-control {
  font-size: 1rem;
  padding: 0.75rem 1rem; 
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.form-control:focus {
  border-color: #86b7fe;
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
}

::placeholder {
  color: #adb5bd;
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-top: 15px; 
}

.btn-primary {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.btn-primary:hover {
  background-color: #0069d9;
  border-color: #0062cc;
}

@media (max-width: 768px) {
  .modal-content {
    width: auto; 
    margin: 20px; 
  }
}

</style>
