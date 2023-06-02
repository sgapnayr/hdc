import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { ref } from 'vue'

interface Product {
  itemId: string
  productBrand: string
  productName: string
  priceInPennies: number
}

export const useCartStore = defineStore('cart', () => {
  const products: Product[] = [
    {
      itemId: '1',
      productBrand: 'AcneAway',
      productName: 'Ultra Light Moisturizer',
      priceInPennies: 1500,
    },
    {
      itemId: '2',
      productBrand: 'AcneAway',
      productName: 'Benzoyl Peroxide Wash 10%',
      priceInPennies: 1500,
    },
  ]

  const cartItems = useStorage('items', [] as Product[])
  const costOfShippingAndHandlingInPennies = 599
  const taxRate = 0.066

  function addItemToCart(itemId: string) {
    const itemToAdd = products.find((product) => product.itemId === itemId)
    if (itemToAdd) {
      cartItems.value.push(itemToAdd)
    }
  }

  function removeItemFromCart(itemId: string) {
    const itemIndex = cartItems.value.findIndex((item) => item.itemId === itemId)
    if (itemIndex !== -1) {
      cartItems.value.splice(itemIndex, 1)
    }
  }

  function getCartSubTotalBeforeTax() {
    return getCartSubTotal() + costOfShippingAndHandlingInPennies
  }

  function getTaxAmountInPennies() {
    return Math.round(getCartSubTotal() * taxRate)
  }

  function getTotalAmountInPennies() {
    return getCartSubTotal() + getTaxAmountInPennies() + costOfShippingAndHandlingInPennies
  }

  function getCartSubTotal() {
    return cartItems.value.map((cartItem: Product) => cartItem.priceInPennies).reduce((a, b) => a + b, 0)
  }

  function getCartTotal() {
    return getCartSubTotal() + getTaxAmountInPennies() + costOfShippingAndHandlingInPennies
  }

  function getCartTotalForProductWithId(itemId: string) {
    return cartItems.value.filter((cartItem: Product) => cartItem.itemId === itemId).reduce((total, cartItem) => total + cartItem.priceInPennies, 0)
  }

  function getTotalQuantityForProductWithId(itemId: string) {
    return cartItems.value.filter((cartItem: Product) => cartItem.itemId === itemId).length
  }

  return {
    cartItems,
    products,
    taxRate,
    costOfShippingAndHandlingInPennies,
    addItemToCart,
    removeItemFromCart,
    getCartSubTotal,
    getCartSubTotalBeforeTax,
    getTaxAmountInPennies,
    getTotalAmountInPennies,
    getCartTotal,
    getCartTotalForProductWithId,
    getTotalQuantityForProductWithId,
  }
})
