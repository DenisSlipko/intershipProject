export class Table {
  countriesTableColumnsConfig = null;
  tableContainer = null;
  tbody = null;
  thead = null;

  constructor(countriesTableColumnsConfig, tableContainer) {
    this.countriesTableColumnsConfig = countriesTableColumnsConfig;
    this.tableContainer = tableContainer;
  }

  createTable() {
    this.thead = document.createElement("thead");
    this.tableContainer.append(this.thead);

    this.tbody = document.createElement("tbody");
    this.tableContainer.append(this.tbody);

    this.createHeader();
  }

  createHeader() {
    const tr = document.createElement("tr");

    const cells = this.countriesTableColumnsConfig.map((col) => {
      const cell = document.createElement("th");
      cell.textContent = col.label;
      return cell;
    });
    tr.append(...cells);
    this.thead.append(tr);
  }

  render(data) {
    const fragment = new DocumentFragment();
    data.forEach((element) => {
      const rowElement = document.createElement("tr");
      const cells = this.countriesTableColumnsConfig.map((column) => {
        const cell = document.createElement("td");
        cell.textContent = element[column.key];

        return cell;
      });
      rowElement.append(...cells);
      fragment.appendChild(rowElement);
    });

    this.tbody.appendChild(fragment);
  }
}
