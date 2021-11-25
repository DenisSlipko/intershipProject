import { Table } from './components/Table/Table.js';
import { countriesTableColumnsConfig } from './dataStore/config.js';
import { countries } from './dataStore/data.js';
import { bubbleSort } from './utils/bubbleSort.js';
import { quickSort } from './utils/quickSort.js';
import { menuConfig } from './dataStore/menuConfig.js';

const tableContainer = document.getElementById('table');

let countriesLenght = Object.keys(countries).length;
let totalAmount = countriesLenght;

const callbacksObject = {
  sortCallback: (dataKey, isAsc) => {
    const isDataKey = Boolean(dataKey);
    if (!isDataKey) {
      return countriesTable.render(countries, totalAmount);
    }
    isAsc
      ? countriesTable.render(quickSort(countries, dataKey), totalAmount)
      : countriesTable.render(
          quickSort(countries, dataKey).reverse(),
          totalAmount
        );
  },
  paginationCallback: (currentPage, amountEl) => {
    if ((currentPage == null, amountEl == null)) {
      return countriesTable.render(countries, totalAmount);
    }
    let firstElOnPage = (currentPage - 1) * amountEl;
    let lastElOnPage = firstElOnPage + amountEl;
    let paginationData = countries.slice(firstElOnPage, lastElOnPage);

    countriesTable.render(paginationData, totalAmount);
  },
  filterCallback: (filter, dataKey) => {
    if ((filter == null, dataKey == null)) {
      return countriesTable.render(countries, totalAmount);
    }
    let sortedArr = countries.filter(
      (country) =>
        country[dataKey].toLowerCase().indexOf(filter.toLowerCase()) > -1
    );
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
countriesTable.createPagination(countries, totalAmount);
countriesTable.render(countries, totalAmount);
