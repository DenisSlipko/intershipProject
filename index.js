import { Table } from './components/Table/Table.js';
import { countriesTableColumnsConfig } from './dataStore/config.js';
import { countries } from './dataStore/data.js';
import { bubbleSort } from './utils/bubbleSort.js';
import { quickSort } from './utils/quickSort.js';
import { menuConfig } from './dataStore/menuConfig.js';

const tableContainer = document.getElementById('table');
let countriesLenght = Object.keys(countries).length;
const TOTAL_AMOUNT = countriesLenght;

const callbacksObject = {
  sortCallback: (dataKey, isAsc) => {
    const isDataKey = Boolean(dataKey);
    if (!isDataKey) {
      return countriesTable.render(countries, TOTAL_AMOUNT);
    }
    isAsc
      ? countriesTable.render(quickSort(countries, dataKey), TOTAL_AMOUNT)
      : countriesTable.render(
          quickSort(countries, dataKey).reverse(),
          TOTAL_AMOUNT
        );
  },
  paginationCallback: (currentPage, amount) => {
    const isArgument = Boolean(currentPage);
    if (!isArgument) {
      return countriesTable.render(countries, TOTAL_AMOUNT);
    }
    let start = (currentPage - 1) * amount;
    let end = start + amount;
    let notes = countries.slice(start, end);

    countriesTable.render(notes, TOTAL_AMOUNT);
  },
  filterCallback: (filter) => {
    let sortedArr = [];
    countries.forEach((country) => {
      if (country['name'].toLowerCase().indexOf(filter) > -1) {
        sortedArr.push(country);
      }
    });
    countriesTable.render(sortedArr, sortedArr.length);
  },
};
const countriesTable = new Table(
  countriesTableColumnsConfig,
  menuConfig,
  tableContainer,
  callbacksObject
);

countriesTable.createTable();
countriesTable.createPagination(countries, TOTAL_AMOUNT);
countriesTable.render(countries, TOTAL_AMOUNT);
