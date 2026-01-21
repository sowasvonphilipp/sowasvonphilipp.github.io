export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log("-> Anfrage erhalten für Prompt:", body.prompt)
  
  try {
    const response = await $fetch('http://127.0.0.1:11434/api/chat', {
      method: 'POST',
      body: {
        model: 'deepai-hardcore:latest',
        messages: [{ role: 'user', content: body.prompt }],
        stream: false
      }
    })
    console.log("-> Ollama hat erfolgreich geantwortet")
    return response
  } catch (err) {
    console.error("-> FEHLER BEI OLLAMA-VERBINDUNG:", err.message)
    return { message: { content: "Ollama Fehler: " + err.message } }
  }
})
