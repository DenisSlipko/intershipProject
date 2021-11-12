export class Table {
  columnsConfig = null;
  tableContainer = null;
  tableBody = null;
  tableHeader = null;

  constructor(columnsConfig, tableContainer) {
    this.columnsConfig = columnsConfig;
    this.tableContainer = tableContainer;
  }

  createTable() {
    this.tableHeader = document.createElement("div");
    this.tableHeader.classList.add("table-header");
    this.tableContainer.append(this.tableHeader);

    this.tableBody = document.createElement("div");
    this.tableBody.classList.add("table-body");
    this.tableContainer.append(this.tableBody);

    this.createHeader();
  }

  createHeader() {
    const tableHeaderRow = document.createElement("div");
    tableHeaderRow.classList.add("table-header-row");

    const cells = this.columnsConfig.map((col) => {
      const cell = document.createElement("div");
      cell.classList.add("table-header__cell");

      const actionsContainer = document.createElement("div");
      actionsContainer.classList.add("actions-container");

      const arrowBtn = document.createElement("span");
      arrowBtn.classList.add("material-icons");
      arrowBtn.textContent = "south";

      const menuBtn = document.createElement("span");
      menuBtn.classList.add("material-icons");
      menuBtn.textContent = "more_vert";

      actionsContainer.append(arrowBtn, menuBtn);
      cell.textContent = col.label;
      cell.append(actionsContainer);
      return cell;
    });
    tableHeaderRow.append(...cells);
    this.tableHeader.append(tableHeaderRow);
  }

  render(data) {
    const fragment = new DocumentFragment();
    data.forEach((element) => {
      const rowElement = document.createElement("div");
      rowElement.classList.add("table-row");
      const cells = this.columnsConfig.map((column) => {
        const cell = document.createElement("td");
        cell.classList.add("table-row__cell");
        cell.textContent = element[column.key];

        return cell;
      });
      rowElement.append(...cells);
      fragment.appendChild(rowElement);
    });

    this.tableBody.appendChild(fragment);
  }
}
