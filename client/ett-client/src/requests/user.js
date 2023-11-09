
async function login (url,data) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    const result = await response.json()

    if (response.ok) {
      return { error: false, data: result };
    } else {
      return { error: true, message: result.message };
    }

  } catch (error) {
      return {error: true, message: error}
  }
}

module.exports = {
  login,
}