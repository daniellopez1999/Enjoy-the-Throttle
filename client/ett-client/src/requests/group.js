async function createGroupRequest(url, data) {
  try {
    let response = await fetch(url, {
      method: 'POST',
      credentials: 'include',

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

async function joinGroupRequest(url, data) {
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

async function getListOfGroups(url) {
  try {
    let response = await fetch(url);

    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
    }

    let data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
  }
}

module.exports = {
  createGroupRequest,
  joinGroupRequest,
  getListOfGroups,
};
