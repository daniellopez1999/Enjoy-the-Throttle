async function createGroupRequest (url,data) {
  try {
    let response = await fetch(url, {
      method: 'POST',
      credentials: 'include',

      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    
    let result = await response.json()

    if (response.ok) {
      console.log('OK',data)
      return { error: false, data: result};
    } else {
      console.log('ERROR',result.message)
      return { error: true, message: result.message };
    }

  } catch (error) {
    console.log(error)
  }

  
}

async function joinGroupRequest (url,data) {
  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    let result = await response.json();

    if (response.ok) {
      console.log('OK', data);
      return { error: false, data: result };
    } else {
      console.log(response)
      console.log('Error Status:', response.status);
      console.log('Error Message:', result.message);
      return { error: true, message: result.message };
    }

  } catch (error) {
    console.log(error)
  }
}


module.exports = {
  createGroupRequest,
  joinGroupRequest,
}