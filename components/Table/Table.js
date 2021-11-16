export class Table {
  columnsConfig = null;
  tableContainer = null;
  tableBody = null;
  tableHeader = null;
  key = null;
  sortFunc = null;
  isOrderAsc = true;
  sortedArray = null;

  constructor(columnsConfig, tableContainer, sortFunc) {
    this.sortFunc = sortFunc;
    this.columnsConfig = columnsConfig;
    this.tableContainer = tableContainer;
  }

  createTable(data) {
    this.tableHeader = document.createElement('div');
    this.tableHeader.classList.add('table-header');
    this.tableContainer.append(this.tableHeader);

    this.tableBody = document.createElement('div');
    this.tableBody.classList.add('table-body');
    this.tableContainer.append(this.tableBody);

    this.createHeader(data);
  }

  createHeader(data) {
    const tableHeaderRow = document.createElement('div');
    tableHeaderRow.classList.add('table-header-row');

    const cells = this.columnsConfig.map((col) => {
      const cell = document.createElement('div');
      cell.classList.add('table-header__cell');
      cell.setAttribute('key', col.key);
      cell.setAttribute('sortable', col.sortable);

      const actionsContainer = document.createElement('div');
      actionsContainer.classList.add('actions-container');

      const arrowBtn = document.createElement('span');
      arrowBtn.classList.add('material-icons');
      arrowBtn.textContent = 'south';

      const menuBtn = document.createElement('span');
      menuBtn.classList.add('material-icons');
      menuBtn.textContent = 'more_vert';

      actionsContainer.append(arrowBtn, menuBtn);
      cell.textContent = col.label;
      cell.append(actionsContainer);
      return cell;
    });
    tableHeaderRow.append(...cells);
    this.tableHeader.append(tableHeaderRow);

    this.tableHeader.addEventListener('click', (e) => {
      this.isOrderAsc = !this.isOrderAsc;
      this.key = e.target.getAttribute('key');
      this.tableBody.innerHTML = '';
      this.sortedArray = this.sortFunc(data, this.key);
      this.isOrderAsc === false
        ? this.render(this.sortedArray)
        : this.render(this.sortedArray.reverse());
    });
  }

  render(data) {
    const fragment = new DocumentFragment();
    data.forEach((element) => {
      const rowElement = document.createElement('div');
      rowElement.classList.add('table-row');
      const cells = this.columnsConfig.map((column) => {
        const cell = document.createElement('div');
        cell.classList.add('table-row__cell');
        cell.textContent = element[column.key];
        cell.setAttribute('key', column.key);

        return cell;
      });
      rowElement.append(...cells);
      fragment.appendChild(rowElement);
    });

    this.tableBody.appendChild(fragment);
  }
}
