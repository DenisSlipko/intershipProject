export class Table {
  columnsConfig = null;
  tableContainer = null;
  tableBody = null;
  tableHeader = null;
  callbackFunc = null;
  isOrderAsc = false;

  constructor(columnsConfig, tableContainer, callbackFunc) {
    this.callbackFunc = callbackFunc;
    this.columnsConfig = columnsConfig;
    this.tableContainer = tableContainer;
  }

  createTable() {
    this.tableHeader = document.createElement('div');
    this.tableHeader.classList.add('table-header');
    this.tableContainer.append(this.tableHeader);

    this.tableBody = document.createElement('div');
    this.tableBody.classList.add('table-body');
    this.tableContainer.append(this.tableBody);

    this.createHeader();
  }

  createHeader() {
    const tableHeaderRow = document.createElement('div');
    tableHeaderRow.classList.add('table-header-row');

    const cells = this.columnsConfig.map((col) => {
      const cell = document.createElement('div');
      cell.classList.add('table-header__cell');
      cell.setAttribute('data-key', col.key);
      cell.setAttribute('data-sortable', col.sortable);
      const headerLabel = document.createElement('div');
      headerLabel.classList.add('table-header-label');

      if (col.sortable) {
        headerLabel.addEventListener('click', () => {
          this.isOrderAsc = !this.isOrderAsc;
          const dataKey = cell.getAttribute('data-key');
          arrowBtn.setAttribute('asc', this.isOrderAsc);
          this.callbackFunc(dataKey, this.isOrderAsc);
        });
      }

      const actionsContainer = document.createElement('div');
      actionsContainer.classList.add('actions-container');

      const arrowBtn = document.createElement('span');
      arrowBtn.classList.add('material-icons');
      arrowBtn.textContent = 'south';
      arrowBtn.setAttribute('name', 'arrow');

      if (col.sortable) {
        arrowBtn.addEventListener('click', () => {
          this.isOrderAsc = !this.isOrderAsc;
          arrowBtn.setAttribute('asc', this.isOrderAsc);
          const dataKey = cell.getAttribute('data-key');
          this.callbackFunc(dataKey, this.isOrderAsc);
        });
      }

      const menuBtn = document.createElement('span');
      menuBtn.classList.add('material-icons');
      menuBtn.textContent = 'more_vert';
      menuBtn.setAttribute('name', 'menuBtn');

      actionsContainer.append(arrowBtn, menuBtn);
      headerLabel.textContent = col.label;
      cell.append(headerLabel);
      cell.append(actionsContainer);
      return cell;
    });
    tableHeaderRow.append(...cells);
    this.tableHeader.append(tableHeaderRow);
  }

  filterMenu() {
    const filterMenuContainer = document.createElement('div');
    filterMenuContainer.classList.add('filter-menu-container');
    const column = document.createElement('div');
    column.classList.add('menu-column');
    const columnLabel = document.createElement('div');
    columnLabel.classList.add('column-label');

    filterMenuContainer.append(column);
    this.tableBody.append(filterMenuContainer);
  }

  clearTable() {
    this.tableBody.innerHTML = '';
  }

  render(data) {
    this.clearTable();
    const fragment = new DocumentFragment();
    data.forEach((element) => {
      const rowElement = document.createElement('div');
      rowElement.classList.add('table-row');
      const cells = this.columnsConfig.map((column) => {
        const cell = document.createElement('div');
        cell.classList.add('table-row__cell');
        cell.textContent = element[column.key];
        cell.setAttribute('data-key', column.key);

        return cell;
      });
      rowElement.append(...cells);
      fragment.appendChild(rowElement);
    });

    this.tableBody.appendChild(fragment);
  }
}
