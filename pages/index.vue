<template>
  <div style="background:#111;color:white;height:100vh;display:flex;flex-direction:column;font-family:sans-serif;">
    <div v-if="!isLoggedIn" style="margin:auto;text-align:center;padding:20px;background:#222;border-radius:10px;">
      <h2>DeepAI Login</h2>
      <input v-model="pw" type="password" @keyup.enter="login" placeholder="Passwort..." style="padding:10px;border-radius:5px;border:none;" />
      <button @click="login" style="padding:10px 20px;margin-left:10px;background:#0066ff;color:white;border:none;border-radius:5px;cursor:pointer;">Login</button>
    </div>
    <div v-else style="display:flex;flex-direction:column;height:100%;max-width:800px;margin:0 auto;width:100%;">
      <div style="padding:15px;border-bottom:1px solid #333;display:flex;justify-content:space-between;">
        <span><b>DeepAI Uncensored</b></span>
        <button @click="isLoggedIn = false" style="background:none;color:#888;border:none;cursor:pointer;">Logout</button>
      </div>
      <div style="flex:1;overflow-y:auto;padding:20px;" ref="box">
        <div v-for="m in messages" :style="m.role === 'user' ? 'text-align:right;margin-bottom:15px;' : 'text-align:left;margin-bottom:15px;'">
          <div :style="m.role === 'user' ? 'background:#0066ff;display:inline-block;padding:10px;border-radius:10px;' : 'background:#333;display:inline-block;padding:10px;border-radius:10px;'">
            {{ m.content }}
          </div>
        </div>
        <div v-if="loading" style="color:#888;">AI generiert...</div>
      </div>
      <div style="padding:20px;background:#222;display:flex;gap:10px;">
        <input v-model="input" @keyup.enter="send" style="flex:1;padding:10px;background:#333;color:white;border:none;border-radius:5px;" placeholder="Frag etwas..." />
        <button @click="send" :disabled="loading" style="padding:10px 20px;background:#0066ff;color:white;border:none;border-radius:5px;">Senden</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const isLoggedIn = ref(false), pw = ref(''), input = ref(''), messages = ref([]), loading = ref(false), box = ref(null)
const login = () => { if(pw.value === '2305512') isLoggedIn.value = true }
const send = async () => {
  if(!input.value || loading.value) return
  const text = input.value; messages.value.push({role:'user', content:text}); input.value = ''; loading.value = true
  try {
    const res = await $fetch('/api/chat', { method: 'POST', body: { prompt: text } })
    messages.value.push({role:'assistant', content: res.message?.content || 'Fehler'})
  } catch (e) {
    messages.value.push({role:'assistant', content: 'API Fehler 404/500'})
  } finally {
    loading.value = false
    setTimeout(() => { if(box.value) box.value.scrollTop = box.value.scrollHeight }, 50)
  }
}
</script>
