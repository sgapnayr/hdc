<script setup lang="ts">
// IMPORTS ********************************************************************
import { ref } from 'vue'
import { useCartStore } from '~/stores/cart'
import { formatPennies } from '~/utils/helpers'
import { useRouter } from 'vue-router'
import ChevronIcon from '@/assets/icons/chevron-icon.svg'
import EditIcon from '@/assets/icons/edit-icon.svg'
import { useAuthenticator } from '@aws-amplify/ui-vue'

// LAYOUT **********************************************************************
definePageMeta({
  layout: 'captured',
  middleware: ['auth'],
})

// ROUTER **********************************************************************
const user = useAuthenticator()

onMounted(() => {
  watchEffect(() => {
    if (user.authStatus !== 'authenticated') {
      navigateTo('/')
    }
  })
})

// STORES *********************************************************************
const cartStore = useCartStore()

// ROUTER *********************************************************************
const router = useRouter()

// STATE *********************************************************************
const shippingAddressOption = ref<'Customer Address' | 'Add New Shipping Address'>('Customer Address')
const paymentMethodOption = ref<'Customer Card' | 'Add New Card'>('Customer Card')
const billingAddressOption = ref<'Same as Shipping Address' | 'Add New Billing Address'>('Same as Shipping Address')
</script>

<template>
  <BaseWrapper>
    <!-- Buy Products -->
    <div class="flex mt-[32px]">
      <div class="w-2/3 flex flex-col pr-8">
        <NuxtLink to="/profile" class="flex text-honeydew-purple text-[14px] font-p400 cursor-pointer">
          <img :src="ChevronIcon" alt="Chevron Icon" class="mr-[14px]" />
          Back to Dashboard
        </NuxtLink>
        <h1 class="text-[32px] font-[500] leading-[40px] text-gray-3 mt-[20px]">Buy products</h1>

        <!-- Shipping Address -->
        <h2 class="text-[16px] font-[500] leading-[40px] text-gray-3 mt-[32px] mb-[16px]">1. Shipping Address</h2>
        <div
          @click="shippingAddressOption = 'Customer Address'"
          class="bg-white p-3 flex text-[14px] font-[500] text-[#403E48] items-center justify-between rounded-[8px] cursor-pointer"
        >
          <div class="flex">
            <div
              :class="[shippingAddressOption === 'Customer Address' ? 'bg-honeydew-green' : 'bg-honeydew-bg2']"
              class="w-[20px] h-[20px] border rounded-full mr-3 border-gray-2 flex justify-center items-center"
            >
              <div class="w-[12px] h-[12px] bg-white rounded-full"></div>
            </div>
            {customerName}
            <div class="ml-[12px] text-[14px] font-[400] text-[#403E48]">{customerAddress}</div>
          </div>
          <img :src="EditIcon" alt="Edit Icon" />
        </div>
        <div
          @click="shippingAddressOption = 'Add New Shipping Address'"
          class="bg-white p-3 flex text-[14px] font-[500] text-[#403E48] items-center justify-start rounded-[8px] mt-[8px] cursor-pointer"
        >
          <div
            :class="[shippingAddressOption === 'Add New Shipping Address' ? 'bg-honeydew-green' : 'bg-honeydew-bg2']"
            class="w-[20px] h-[20px] border rounded-full mr-3 border-gray-2 flex justify-center items-center"
          >
            <div class="w-[12px] h-[12px] bg-white rounded-full"></div>
          </div>
          Add New Shipping Address
        </div>

        <!-- Payment Method -->
        <h2 class="text-[16px] font-[500] leading-[40px] text-gray-3 mt-[32px] mb-[16px]">2. Payment Method</h2>
        <div
          @click="paymentMethodOption = 'Customer Card'"
          class="bg-white p-3 flex text-[14px] font-[500] text-[#403E48] items-center justify-between rounded-[8px] cursor-pointer"
        >
          <div class="flex">
            <div
              :class="[paymentMethodOption === 'Customer Card' ? 'bg-honeydew-green' : 'bg-honeydew-bg2']"
              class="w-[20px] h-[20px] border rounded-full mr-3 border-gray-2 flex justify-center items-center"
            >
              <div class="w-[12px] h-[12px] bg-white rounded-full"></div>
            </div>
            {customerName}
            <div class="ml-[12px] text-[14px] font-[400] text-[#403E48]">{customerCardOnFile}</div>
          </div>
          <img :src="EditIcon" alt="Edit Icon" />
        </div>
        <div
          @click="paymentMethodOption = 'Add New Card'"
          class="bg-white p-3 flex flex-col text-[14px] font-[500] text-[#403E48] items-start justify-start rounded-[8px] mt-[8px] cursor-pointer"
        >
          <div class="flex">
            <div
              :class="[paymentMethodOption === 'Add New Card' ? 'bg-honeydew-green' : 'bg-honeydew-bg2']"
              class="w-[20px] h-[20px] border rounded-full mr-3 border-gray-2 flex justify-center items-center"
            >
              <div class="w-[12px] h-[12px] bg-white rounded-full"></div>
            </div>
            Add New Credit or Debit Card
          </div>
          <input
            class="bg-honeydew-bg2 w-full h-[48px] mt-[16px] rounded-[80px] border border-gray-2 outline-none focus:ring-0 flex justify-start px-4"
            placeholder="Card holder name"
            type="text"
          />
          <div class="flex w-full gap-x-4">
            <input
              class="bg-honeydew-bg2 w-full h-[48px] mt-[16px] rounded-[80px] border border-gray-2 outline-none focus:ring-0 flex justify-start px-4"
              placeholder="Card number"
              type="text"
            />
            <input
              class="bg-honeydew-bg2 w-1/2 h-[48px] mt-[16px] rounded-[80px] border border-gray-2 outline-none focus:ring-0 flex justify-start px-4"
              placeholder="MM/YY"
              type="text"
            />
            <input
              class="bg-honeydew-bg2 w-1/2 h-[48px] mt-[16px] rounded-[80px] border border-gray-2 outline-none focus:ring-0 flex justify-start px-4"
              placeholder="CVV"
              type="text"
            />
          </div>
          <BaseCheckBox class="mt-[16px]">
            <div class="text-[#667085] text-[14px] font-[400]">Save this credit card for later use</div>
          </BaseCheckBox>
        </div>

        <!-- Billing Address -->
        <h2 class="text-[16px] font-[500] leading-[40px] text-gray-3 mt-[32px] mb-[16px]">3. Billing Address</h2>
        <div
          @click="billingAddressOption = 'Same as Shipping Address'"
          class="bg-white p-3 flex text-[14px] font-[500] text-[#403E48] items-center justify-between rounded-[8px] cursor-pointer"
        >
          <div class="flex">
            <div
              :class="[billingAddressOption === 'Same as Shipping Address' ? 'bg-honeydew-green' : 'bg-honeydew-bg2']"
              class="w-[20px] h-[20px] border rounded-full mr-3 border-gray-2 flex justify-center items-center"
            >
              <div class="w-[12px] h-[12px] bg-white rounded-full"></div>
            </div>
            Same as the shipping address
            <div class="ml-[12px] text-[14px] font-[400] text-[#403E48]">{customerAddress}</div>
          </div>
        </div>
        <div
          @click="billingAddressOption = 'Add New Billing Address'"
          class="bg-white p-3 flex text-[14px] font-[500] text-[#403E48] items-center justify-start rounded-[8px] mt-[8px] cursor-pointer"
        >
          <div
            :class="[billingAddressOption === 'Add New Billing Address' ? 'bg-honeydew-green' : 'bg-honeydew-bg2']"
            class="w-[20px] h-[20px] border rounded-full mr-3 border-gray-2 flex justify-center items-center"
          >
            <div class="w-[12px] h-[12px] bg-white rounded-full"></div>
          </div>
          Add New Billing Address
        </div>
      </div>

      <!-- Order Summary -->
      <div class="w-1/3 flex flex-col">
        <div class="bg-white rounded-[8px] p-6">
          <h2 class="text-[16px] font-[500] leading-[40px] text-gray-3">Order Summary</h2>
          <div class="text-gray-5 mt-[16px] text-[14px] flex w-full justify-between">
            <div>Items ({{ cartStore.cartItems.length }}):</div>
            <div>{{ formatPennies(cartStore.getCartSubTotal()) }}</div>
          </div>
          <div class="text-gray-5 mt-[8px] text-[14px] flex w-full justify-between">
            <div>Shipping & handling:</div>
            <div>{{ formatPennies(cartStore.costOfShippingAndHandlingInPennies) }}</div>
          </div>
          <div class="text-gray-5 mt-[16px] text-[14px] flex w-full justify-between">
            <div>Before tax:</div>
            <div>{{ formatPennies(cartStore.getCartSubTotalBeforeTax()) }}</div>
          </div>
          <div class="text-gray-5 mt-[16px] text-[14px] flex w-full justify-between">
            <div>Tax collected:</div>
            <div>{{ formatPennies(cartStore.getTaxAmountInPennies()) }}</div>
          </div>
          <div class="border-b border-[#F2F4F7] my-6"></div>
          <h2 class="text-[16px] font-[500] leading-[40px] text-gray-3">
            Add coupon code
            <span class="text-[#667085] text-[14px] ml-[12px] font-[400]">Optional</span>
          </h2>
          <input
            class="bg-honeydew-bg2 w-full h-[48px] mt-[16px] mb-[24px] rounded-[80px] border border-gray-2 outline-none focus:ring-0 flex justify-start px-4"
            placeholder="Search by patient's name"
            type="text"
          />
          <div class="border-b border-[#F2F4F7] my-6"></div>
          <h2 class="text-[16px] font-[500] leading-[40px] text-gray-3 flex w-full justify-between">
            Order total
            <div>{{ formatPennies(cartStore.getCartTotal()) }}</div>
          </h2>
          <BaseButton class="w-full mt-[24px] mb-[16px]">
            <div class="w-full">GO TO CHECKOUT</div>
          </BaseButton>
          <p class="text-[12px] font-[400] mt-[16px] text-[#6C6A7C] text-center">
            By placing your order, you agree to our company Privacy Policy and Conditions of Use.
          </p>
        </div>
      </div>
    </div>
  </BaseWrapper>
</template>
