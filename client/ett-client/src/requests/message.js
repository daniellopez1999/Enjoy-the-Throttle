async function postMessage (url,data) {
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

async function getMessages (url,groupName) {
  const encodedGroupName = encodeURIComponent(groupName);
  const APIUrl = `${url}/${encodedGroupName}`
  console.log(APIUrl)
  console.log(APIUrl)
  try {
    let response = await fetch(APIUrl);

    if (!response.ok) {
      console.log(`HTTP error! Status: ${response.status}`);
    }

    let data = await response.json();
    console.log('User data:', data);
    // Hacer algo con los datos obtenidos
    return data

  } catch (error) {
    console.error('Error al obtener el usuario:', error);
  }
}


module.exports = {
  postMessage,
  getMessages
}