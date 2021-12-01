import { Table } from './components/Table/Table.js';
import { countriesTableColumnsConfig } from './dataStore/config.js';
import { bubbleSort } from './utils/bubbleSort.js';
import { quickSort } from './utils/quickSort.js';
import { menuConfig } from './dataStore/menuConfig.js';
import { getData } from './api/requests.js';

const tableContainer = document.getElementById('table');

const firstPage = await getData(20, 1);
const totalAmount = await getData();

const getDataCallback = async (amountEl, currentPage, isAsc, dataKey, filter) => {
  const ascFlag = isAsc ? 'asc' : 'desc';
  const sortRequest = await getData(amountEl, currentPage, ascFlag, dataKey, filter);
  countriesTable.render(sortRequest[0], totalAmount[1]);
};

const countriesTable = new Table(countriesTableColumnsConfig, menuConfig, tableContainer, getDataCallback);

countriesTable.createTable();
countriesTable.createPagination(totalAmount[1]);
countriesTable.render(firstPage[0], totalAmount[1]);
