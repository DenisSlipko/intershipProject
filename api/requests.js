const RequestHeader = {
  'Content-type': 'application/json; charset=UTF-8',
};

export const getAmountCountries = async () => {
  try {
    const response = await fetch('http://localhost:4000/countries?_page=1', {
      method: 'GET',
      headers: RequestHeader,
    });
    const amountCountries = response.headers.get('X-Total-Count');
    return amountCountries;
  } catch (e) {
    alert('Fail. Try again later!');
  }
};

export const getData = async (elementsAmount, pageNumber, ascFlag, sortKey, filter) => {
  const url = `http://localhost:4000/countries?_limit=${elementsAmount}&_page=${pageNumber}&_order=${ascFlag}&_sort=${sortKey}`;
  try {
    const response = await fetch(filter ? url + `&${sortKey}_like=${filter}` : url, {
      method: 'GET',
      headers: RequestHeader,
    });
    return await response.json();
  } catch (e) {
    alert('Fail to get data from server. Try again later!');
  }
};

export const changeData = async (rowId, changedDataObj) => {
  try {
    await fetch(`http://localhost:4000/countries/${rowId}`, {
      method: 'PUT',
      headers: RequestHeader,
      body: JSON.stringify(changedDataObj),
    });
  } catch (e) {
    alert('Fail to put data to server. Try again later!');
  }
};
