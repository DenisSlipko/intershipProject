import { Table } from './components/Table/Table.js';
import { countriesTableColumnsConfig } from './dataStore/config.js';
import { countries } from './dataStore/data.js';
import { bubbleSort } from './utils/bubbleSort.js';
import { quickSort } from './utils/quickSort.js';

const tableContainer = document.getElementById('table');

const countriesTable = new Table(
  countriesTableColumnsConfig,
  tableContainer,
  quickSort
);
countriesTable.createTable(countries);
countriesTable.render(countries);
