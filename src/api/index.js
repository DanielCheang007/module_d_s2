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

export { getJSON, postJSON, postAuthJSON }
