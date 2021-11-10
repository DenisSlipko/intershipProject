import { Table } from "./components/Table/Table.js";
import { columnsConfig } from "./dataStore/config.js";
import { countries } from "./dataStore/data.js";

const tableContainer = document.getElementById("table");

const countrinesTable = new Table(columnsConfig, tableContainer);
countrinesTable.createTable();
countrinesTable.render(countries);
