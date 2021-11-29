const RequestHeader = {
  'Content-type': 'application/json; charset=UTF-8',
};

export const getData = async () => {
  try {
    const response = await fetch('http://localhost:3000/countries', {
      method: 'GET',
      headers: RequestHeader,
    });
    return response.json();
  } catch (e) {
    alert('Fail to get data from server. Try again later!');
  }
};

export const changeData = async (rowId, changedDataObj) => {
  try {
    await fetch(`http://localhost:3000/countries/${rowId}`, {
      method: 'PUT',
      headers: RequestHeader,
      body: JSON.stringify(changedDataObj),
    });
  } catch (e) {
    alert('Fail to put data to server. Try again later!');
  }
};
