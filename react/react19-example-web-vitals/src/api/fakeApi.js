
import { PRODUCTS } from '../data/products'
import { USERS } from '../data/users'

/**
 * Products: fast to load (no artificial delay)
 * Users: heavy to load (artificial delay + large payload)
 */

export function fetchProducts(){
  return new Promise((resolve) => {
    // immediate resolve to simulate fast endpoint
    resolve(PRODUCTS)
  })
}

export function fetchUsers(){
  return new Promise((resolve) => {
    // artificial delay to simulate heavy endpoint & slow network
    setTimeout(() => resolve(USERS), 2200) // 2.2s delay
  })
}
