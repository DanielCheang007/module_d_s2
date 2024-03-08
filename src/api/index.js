import { useUserStore } from '@/stores/user.js'
const API_URL = import.meta.env.VITE_API_URL

async function getJSON(url) {
  const res = await fetch(API_URL + url)
  const data = await res.json()
  return {
    ok: res.ok,
    status: res.status,
    data
  }
}

async function getAuthJSON(url) {
  const userStore = useUserStore()

  const res = await fetch(API_URL + url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userStore.token}`
    }
  })

  const data = await res.json()
  return {
    ok: res.ok,
    status: res.status,
    data
  }
}

async function postJSON(url, data) {
  const res = await fetch(API_URL + url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  const jsonData = await res.json()
  return {
    ok: res.ok,
    status: res.status,
    data: jsonData
  }
}

async function postAuthJSON(url, data) {
  const userStore = useUserStore()
  console.log(userStore.token)
  const res = await fetch(API_URL + url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userStore.token}`
    },
    body: JSON.stringify(data)
  })

  const jsonData = await res.json()
  return {
    ok: res.ok,
    status: res.status,
    data: jsonData
  }
}

async function postHTML(url, formData) {
  const res = await fetch(API_URL + url, {
    method: 'POST',
    body: formData
  })

  return {
    ok: res.ok,
    status: res.status
  }
}

export { getJSON, getAuthJSON, postJSON, postAuthJSON, postHTML }
