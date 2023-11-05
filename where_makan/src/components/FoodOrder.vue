<template>
  <transition name="fade">
    <div v-if="showOrder" class="modal-overlay">
      <div class="modal fade show" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Complete your order</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeOrderModal">
                <span aria-hidden="true">&times;</span>
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


export default {
  components: {
    StripeCheckout
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
      loading: false,
      publishableKey: "pk_test_51MrLT6LBkZwSamzsNhao318a2xHlKl5jVLkcOSnXKKPCMSVBjOKJGaNmLZ96ons6fAD3psuHFSagxw842GBgQUAC00iQmwuOSA",
      lineItems: [
        {
          price: 'price_1O8hhTLBkZwSamzsGGHTjCrR', // The id of the one-time price you created in your Stripe dashboard
          quantity: 1,
        },
      ],
    };
  },
  methods: {
    closeOrderModal() {
      this.$emit('close-modal');
    },
    submit () {
      // You will be redirected to Stripe's secure checkout page
      this.$refs.checkoutRef.redirectToCheckout();
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
