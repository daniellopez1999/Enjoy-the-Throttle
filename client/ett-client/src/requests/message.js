async function postMessage(url, data) {
  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    let result = await response.json();

    if (response.ok) {
      return { error: false, data: result };
    } else {
      return { error: true, message: result.message };
    }
  } catch (error) {
    console.error(error);
  }
}

async function getMessages(url, groupName) {
  const encodedGroupName = encodeURIComponent(groupName);
  const APIUrl = `${url}/${encodedGroupName}`;
  try {
    let response = await fetch(APIUrl);

    let data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
  }
}

module.exports = {
  postMessage,
  getMessages,
};
