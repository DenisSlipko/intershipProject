import { Table } from './components/Table/Table.js';
import { countriesTableColumnsConfig } from './dataStore/config.js';
import { countries } from './dataStore/data.js';
import { bubbleSort } from './utils/bubbleSort.js';
import { quickSort } from './utils/quickSort.js';
import { menuConfig } from './dataStore/menuConfig.js';

const tableContainer = document.getElementById('table');

const countriesTable = new Table(
  countriesTableColumnsConfig,
  menuConfig,
  tableContainer,
  (dataKey, isAsc) => {
    isAsc
      ? countriesTable.render(quickSort(countries, dataKey))
      : countriesTable.render(quickSort(countries, dataKey).reverse());
  },
  () => {
    countriesTable.render(countries);
  }
);

countriesTable.createTable();
countriesTable.render(countries);
