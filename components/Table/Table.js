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
    this.thead = document.createElement("div");
    this.thead.classList.add("table-header");
    this.tableContainer.append(this.thead);

    this.tbody = document.createElement("div");
    this.tbody.classList.add("table-body");
    this.tableContainer.append(this.tbody);

    this.createHeader();
  }

  createHeader() {
    const tr = document.createElement("div");
    tr.classList.add("table-header-row");

    const cells = this.columnsConfig.map((col) => {
      const cell = document.createElement("div");
      cell.classList.add("table-header__cell");

      const btnContainer = document.createElement("div");
      btnContainer.classList.add("btn-container");

      const arrowBtn = document.createElement("span");
      arrowBtn.classList.add("material-icons");
      arrowBtn.textContent = "south";

      const menuBtn = document.createElement("span");
      menuBtn.classList.add("material-icons");
      menuBtn.textContent = "more_vert";

      btnContainer.append(arrowBtn, menuBtn);
      cell.textContent = col.label;
      cell.append(btnContainer);
      return cell;
    });
    tr.append(...cells);
    this.thead.append(tr);
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

    this.tbody.appendChild(fragment);
  }
}
