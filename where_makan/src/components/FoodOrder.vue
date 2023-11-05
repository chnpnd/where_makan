<template>
<transition name="fade">
  <div v-if="showOrder" class="modal-overlay">
    <div class="modal fade show" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
          <div class="modal-body">
            <p><strong>Food Item:</strong> {{ selectedFood.name }}</p>
            <p><strong>Price:</strong> ${{ selectedFood.price.toFixed(2) }}</p>
          <!-- vue-stripe-checkout component -->
          <stripe-checkout
            ref="checkoutRef"
            mode="payment"
            :pk="publishableKey"
            :line-items="lineItems"
            :success-url="successURL"
            :cancel-url="cancelURL"
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
   </transition>
 </template>
 
<script >

import VueMask from 'v-mask';
import { StripeCheckout } from '@vue-stripe/vue-stripe';
import auth from '@/auth.js';

 
export default {
  components: {
    StripeCheckout,
  },
   directives: {
     mask: VueMask.VueMaskDirective,
   },
   props: {
    showOrder: {
      type: Boolean,
      required: true
    }
  },
  mounted() {
    // Example: Check the URL or session state to see if the payment was successful
    const queryParams = new URLSearchParams(window.location.search);
    const paymentStatus = queryParams.get('payment_status');
    if (paymentStatus === 'success') {
      this.onPaymentSuccess();
    }
  },
   data() {
     return {
      showSuccessModal: false,
      isLoading: false,
      publishableKey: "pk_test_51MrLT6LBkZwSamzsNhao318a2xHlKl5jVLkcOSnXKKPCMSVBjOKJGaNmLZ96ons6fAD3psuHFSagxw842GBgQUAC00iQmwuOSA",
      lineItems: [
        {
          price: 'price_1O8hhTLBkZwSamzsGGHTjCrR', // The id of the one-time price you created in your Stripe dashboard
          quantity: 1,
        },
      ],
      successURL: 'https://vuestripe.com/stripe-checkout/sessions-generator?state=success',
      cancelURL: 'https://vuestripe.com/stripe-checkout/sessions-generator?state=cancel',
     };
   },
   methods:{
    closeOrderModal() {
      this.$emit('close-modal');
    },
    submit () {
      // You will be redirected to Stripe's secure checkout page
      this.$refs.checkoutRef.redirectToCheckout();
    },
    async createOrder(){
      try{
        const orderDetails = {
          consumer_id: auth.getUserID(),
          hawker_stall_id: this.selectedFood.hawker_stall_id, 
          food_id: this.selectedFood.id, 
          order_date: new Date().toISOString(), 
          total_amount: this.selectedFood.price,
          status: "pending" 
        };
  
        const response = await this.$http.post(`https://stingray-app-4wa63.ondigitalocean.app/Order/api/create/order`, orderDetails);
  
        if(response.data.success){
          
        }else{
  
        }
      }catch{
        alert("order cannot be created");
        console.log("order cannot be created");
      }
    },
    async UpdateSales(){
      try{
        const response = await this.$http.post(`https://stingray-app-4wa63.ondigitalocean.app/Sales/api/update/sales/${this.selectedFood.hawker_stall_id}/food/${this.selectedFood.id}`);

        if(response.data.success){
          aler("sales updated");
        }else{
  
        }
      }catch{
        alert("cannot update sales");
      }
    }
    onPaymentSuccess() {
      this.createOrder();
      this.showSuccessModal = true;
    },
    closeSuccessModal() {
      this.showSuccessModal = false;
    },
   }
 };

 </script>
