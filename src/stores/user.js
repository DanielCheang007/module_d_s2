import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const API_URL = import.meta.env.VITE_API_URL

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const token = ref(null)

  const isUserSignedIn = computed(() => user.value !== null)

  function signout() {
    user.value = null
    token.value = null
  }

  async function signinUser(username, token) {
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
  }

  return { user, signinUser, isUserSignedIn, signout }
})
