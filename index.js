import { Table } from './components/Table/Table.js';
import { countriesTableColumnsConfig } from './dataStore/config.js';
import { countries } from './dataStore/data.js';
import { bubbleSort } from './utils/bubbleSort.js';
import { quickSort } from './utils/quickSort.js';
import { menuConfig } from './dataStore/menuConfig.js';

const tableContainer = document.getElementById('table');
const TOTAL_AMOUNT = 40;

const callbacksObject = {
  sortCallback: (dataKey, isAsc) => {
    const isDataKey = Boolean(dataKey);
    if (!isDataKey) {
      return countriesTable.render(countries);
    }
    isAsc
      ? countriesTable.render(quickSort(countries, dataKey))
      : countriesTable.render(quickSort(countries, dataKey).reverse());
  },
  paginationCallback: (currentPage, amount) => {
    let start = (currentPage - 1) * amount;
    let end = start + amount;
    let notes = countries.slice(start, end);

    countriesTable.render(notes);
  },
  filterCallback: (filter) => {
    let sortedArr = [];
    countries.forEach((country) => {
      if (country['name'].toLowerCase().indexOf(filter) > -1) {
        sortedArr.push(country);
      }
    });
    countriesTable.render(sortedArr);
  },
};
const countriesTable = new Table(
  countriesTableColumnsConfig,
  menuConfig,
  tableContainer,
  callbacksObject
);

countriesTable.createTable();
countriesTable.createPagination(TOTAL_AMOUNT);
countriesTable.render(countries);
