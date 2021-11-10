export class Table {
  columnsConfig = null;
  tableContainer = null;
  tbody = null;
  thead = null;

  constructor(columnsConfig, tableContainer) {
    this.columnsConfig = columnsConfig;
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

    const cells = this.columnsConfig.map((col) => {
      const cell = document.createElement("th");
      cell.textContent = col.label;
      return cell;
    });
    tr.append(...cells);
    this.thead.append(tr);
  }

  render(countries) {
    const fragment = new DocumentFragment();
    countries.forEach((country) => {
      const field = document.createElement("tr");
      const cells = this.columnsConfig.map((column) => {
        const cell = document.createElement("td");
        cell.textContent = country[column.key];

        return cell;
      });
      field.append(...cells);
      fragment.appendChild(field);
    });

    this.tbody.appendChild(fragment);
  }
}
