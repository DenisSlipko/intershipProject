const RequestHeader = {
  'Content-type': 'application/json; charset=UTF-8',
};

export const getData = async (elementsAmount, pageNumber, ascFlag, sortKey, filter) => {
  const params = new URLSearchParams({
    _limit: elementsAmount,
    _page: pageNumber,
    _order: ascFlag,
    _sort: sortKey,
  });
  filter ? params.append(`${sortKey}_like`, filter) : null;
  const url = `http://localhost:4000/countries?${params}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: RequestHeader,
    });
    const amountCountries = response.headers.get('X-Total-Count');
    const data = await response.json();
    return [data, amountCountries];
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
