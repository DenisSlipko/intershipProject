const countriesUrl = 'http://localhost:3000/countries';

export const getData = async () => {
  try {
    const response = await fetch(countriesUrl, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const countries = await response.json();
    return countries;
  } catch (e) {
    alert('Fail. Try again later!');
  }
};

export const changeData = async (rowId, changedDataObj) => {
  const url = `http://localhost:3000/countries/${rowId}`;
  try {
    await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(changedDataObj),
    });
  } catch (e) {
    alert('Fail. Try again later!');
  }
};
