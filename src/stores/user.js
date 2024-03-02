import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const API_URL = import.meta.env.VITE_API_URL

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const loading = ref(false)
  const username = ref(localStorage.getItem('username') || null)
  const token = ref(localStorage.getItem('token') || null)

  const isUserSignedIn = computed(() => user.value !== null)

  // auto sign after page refresh
  if (!isUserSignedIn.value && username.value && token.value) {
    signinUser(username.value, token.value)
  }

  function signout() {
    user.value = null
    token.value = null

    localStorage.removeItem('username')
    localStorage.removeItem('token')
  }

  async function signinUser(username, token) {
    loading.value = true
    const url = API_URL + `/users/${username}`

    console.log(url)
    const res = await fetch(url, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    })

    const json = await res.json()
    user.value = json
    console.log(json)

    // store token to localStorage
    localStorage.setItem('username', username)
    localStorage.setItem('token', token)

    loading.value = false
  }

  return { user, loading, signinUser, isUserSignedIn, signout }
})
