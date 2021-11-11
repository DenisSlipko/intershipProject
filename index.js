import { Table } from "./components/Table/Table.js";
import { countriesTableColumnsConfig } from "./dataStore/config.js";
import { countries } from "./dataStore/data.js";

const tableContainer = document.getElementById("table");

const countriesTable = new Table(countriesTableColumnsConfig, tableContainer);
countriesTable.createTable();
countriesTable.render(countries);
