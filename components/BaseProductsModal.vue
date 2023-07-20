<script setup lang="ts">
// IMPORTS ********************************************************************
import { formatPennies } from '@/utils/helpers'
import MoisturizerProduct from '@/assets/products/moisturizer-product.svg'
import BenzoylProduct from '@/assets/products/benzoyl-product.svg'
import PlusIcon from '@/assets/icons/plus-icon-cart.svg'
import MinusIcon from '@/assets/icons/minus-icon.svg'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'

// ROUTER **********************************************************************
const router = useRouter()

// STORES *********************************************************************
const cartStore = useCartStore()
</script>

<template>
  <BaseModal @action-click="router.push('/stripe')">
    <template #button>
      <button
        class="bg-honeydew-purple h-[40px] px-6 justify-center text-white items-center flex rounded-[60px] font-[500] text-[12px] leading-[24px] cursor-pointer uppercase whitespace-nowrap mt-[16px]"
      >
        Order
      </button>
    </template>
    <template #header>Place an order</template>
    <template #content>
      <div class="flex flex-col w-full justify-center items-center gap-x-6">
        <div class="flex gap-x-6">
          <div>
            <div class="bg-white w-[204px] h-[204px] flex justify-center items-center p-9 rounded-t-[8px]">
              <img :src="MoisturizerProduct" alt="Moisturizer Product" class="w-full" />
            </div>
            <div>
              <div class="mt-[16px] text-[14px] font-[500]">
                {{ cartStore.products[0].productBrand }}
              </div>
              <div class="mt-[2px] text-[14px] font-[500]">
                {{ cartStore.products[0].productName }}
              </div>
              <div class="text-[20px] font-[700] mt-[20px] flex justify-between items-center w-full">
                <div class="flex justify-center items-center">
                  <button @click="cartStore.removeItemFromCart('1')">
                    <img :src="MinusIcon" alt="Minus Icon" />
                  </button>
                  <div class="mx-2">
                    {{ cartStore.getTotalQuantityForProductWithId('1') }}
                  </div>
                  <button @click="cartStore.addItemToCart('1')">
                    <img :src="PlusIcon" alt="Plus Icon" />
                  </button>
                </div>
                {{
                  cartStore.getTotalQuantityForProductWithId('1') === 0
                    ? formatPennies(cartStore.products[0].priceInPennies)
                    : formatPennies(cartStore.getCartTotalForProductWithId('1'))
                }}
              </div>
            </div>
          </div>
          <div>
            <div class="bg-white w-[204px] h-[204px] flex justify-center items-center p-9 rounded-t-[8px]">
              <img :src="BenzoylProduct" alt="Benzoyl Product" class="w-full" />
            </div>
            <div>
              <div class="mt-[16px] text-[14px] font-[500]">
                {{ cartStore.products[1].productBrand }}
              </div>
              <div class="mt-[2px] text-[14px] font-[500]">
                {{ cartStore.products[1].productName }}
              </div>
              <div class="text-[20px] font-[700] mt-[20px] flex justify-between items-center w-full">
                <div class="flex justify-center items-center">
                  <button @click="cartStore.removeItemFromCart('2')">
                    <img :src="MinusIcon" alt="Minus Icon" />
                  </button>
                  <div class="mx-2">
                    {{ cartStore.getTotalQuantityForProductWithId('2') }}
                  </div>
                  <button @click="cartStore.addItemToCart('2')">
                    <img :src="PlusIcon" alt="Plus Icon" />
                  </button>
                </div>
                {{
                  cartStore.getTotalQuantityForProductWithId('2') === 0
                    ? formatPennies(cartStore.products[0].priceInPennies)
                    : formatPennies(cartStore.getCartTotalForProductWithId('2'))
                }}
              </div>
            </div>
          </div>
        </div>
        <div class="mt-[32px] w-full justify-start text-gray-4">Total (plus tax & shipping): {{ formatPennies(cartStore.getCartTotal()) }}</div>
        <div class="mt-[32px]"><BaseCheckBox> Shipping address same as home address {address}. </BaseCheckBox></div>
      </div>
    </template>
    <template #button-text>
      <div>Continue</div>
    </template>
  </BaseModal>
</template>
