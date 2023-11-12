
async function login (url,data) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',

      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    const result = await response.json()

    if (response.ok) {
      return { error: false, data: result};
    } else {
      return { error: true, message: result.message };
    }

  } catch (error) {
      return {error: true, message: error}
  }
}

async function register (url, data) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',

      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    const result = await response.json()

    if (response.ok) {
 
      return { error: false, data: result};
    } else {
      return { error: true, message: result.message };
    }

  } catch (error) {
      return {error: true, message: error}
  }
}

async function getModels (url) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Api-Key': 'Wgp1mwm8XB3PeUrejLLO3Q==pmqHC9BQDe22X2ce',
        "Content-Type": "application/json"
      },      
    })

    let result = await response.json()

    if (response.ok) {
 
      return { error: false, data: result};
    } else {
      return { error: true, message: result.message };
    }

  } catch (error) {
      return {error: true, message: error}
  }
}

async function getUserName(url) {
  console.log('1')
  console.log(url)
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      },
    })

    console.log('2')
    let result = await response.json();
    console.log('3')

    if (response.ok) {
 
      return { error: false, data: result};
    } else {
      return { error: true, message: result.message };
    }

  } catch (error) {
    
  }
}

module.exports = {
  login,
  register,
  getModels,
  getUserName
}