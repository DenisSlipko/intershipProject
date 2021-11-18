export class Table {
  columnsConfig = null;
  menuConfig = null;
  tableContainer = null;
  tableBody = null;
  tableHeader = null;
  sortCallback = null;
  isOrderAsc = null;
  initialArrCallback = null;

  constructor(
    columnsConfig,
    menuConfig,
    tableContainer,
    sortCallback,
    initialArrCallback
  ) {
    this.columnsConfig = columnsConfig;
    this.menuConfig = menuConfig;
    this.tableContainer = tableContainer;
    this.sortCallback = sortCallback;
    this.initialArrCallback = initialArrCallback;
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
      const headerSortBtn = document.createElement('div');
      headerSortBtn.classList.add('header-sort-btn');

      const actionsContainer = document.createElement('div');
      actionsContainer.classList.add('actions-container');

      const arrowBtn = document.createElement('span');
      arrowBtn.classList.add('material-icons');
      arrowBtn.classList.add('arrow');
      arrowBtn.textContent = 'south';

      const arrayOfListener = [headerSortBtn, arrowBtn];

      if (col.sortable) {
        arrayOfListener.forEach((el) =>
          el.addEventListener('click', () => {
            const dataKey = cell.getAttribute('data-key');
            console.log(this.isOrderAsc);
            if (this.isOrderAsc === null) {
              this.isOrderAsc = true;
              console.log(this.isOrderAsc);
              this.sortCallback(dataKey, this.isOrderAsc);
              arrowBtn.setAttribute('asc', this.isOrderAsc);
              return;
            }
            if (this.isOrderAsc === true) {
              this.isOrderAsc = false;
              console.log(this.isOrderAsc);
              this.sortCallback(dataKey, this.isOrderAsc);
              arrowBtn.setAttribute('asc', this.isOrderAsc);
              return;
            }
            if (this.isOrderAsc === false) {
              this.isOrderAsc = null;
              console.log(this.isOrderAsc);
              this.initialArrCallback();
              return;
            }
          })
        );
      }
      const menuBtn = document.createElement('span');
      menuBtn.classList.add('material-icons');
      menuBtn.classList.add('menuBtn');
      menuBtn.textContent = 'more_vert';

      actionsContainer.append(arrowBtn, menuBtn);
      headerSortBtn.textContent = col.label;
      cell.append(headerSortBtn);
      cell.append(actionsContainer);
      return cell;
    });
    tableHeaderRow.append(...cells);
    this.tableHeader.append(tableHeaderRow);
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

        return cell;
      });
      rowElement.append(...cells);
      fragment.appendChild(rowElement);
    });

    this.tableBody.appendChild(fragment);
  }
}
