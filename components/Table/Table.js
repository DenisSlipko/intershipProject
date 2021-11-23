const PaginationConfigList = [
  { pageSize: '20' },
  { pageSize: '50' },
  { pageSize: '100' },
];
const MenuElMap = {
  UNSORT: 'unsort',
  SORT_BY_ASC: 'sortByAsc',
  SORT_BY_DESC: 'sortByDesc',
  FILTER: 'filter',
  HIDE: 'hide',
};
const DefaultAmountEl = PaginationConfigList[0].pageSize;

export class Table {
  columnsConfig = null;
  menuConfig = null;
  tableContainer = null;
  tableBody = null;
  tableHeader = null;
  isOrderAsc = null;

  paginationConfigList = PaginationConfigList;
  callbacksMap = {
    sortCallback: null,
    pagintaionCallback: null,
    filterCallback: null,
  };
  tableElementsMap = {};
  menuElementsMap = [];
  amountElOnPage = DefaultAmountEl;
  pageNumberContainer = null;
  menuElMap = MenuElMap;
  menuDropDownItems = null;

  constructor(columnsConfig, menuConfig, tableContainer, callbacksMap) {
    this.columnsConfig = columnsConfig;
    this.menuConfig = menuConfig;
    this.tableContainer = tableContainer;
    this.callbacksMap = callbacksMap;
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

      const headerSortBtn = document.createElement('div');
      headerSortBtn.classList.add('header-sort-btn');

      const actionsContainer = document.createElement('div');
      actionsContainer.classList.add('actions-container');

      if (col.sortable) {
        const arrowBtn = document.createElement('span');
        arrowBtn.classList.add('material-icons');
        arrowBtn.classList.add('arrow');
        arrowBtn.textContent = 'south';
        actionsContainer.append(arrowBtn);

        const arrayOfActions = [headerSortBtn, arrowBtn];

        arrayOfActions.forEach((el) =>
          el.addEventListener('click', () => {
            const dataKey = cell.getAttribute('data-key');

            if (this.isOrderAsc === null) {
              if (this.callbacksMap.sortCallback) {
                this.isOrderAsc = true;
                this.callbacksMap.sortCallback(dataKey, this.isOrderAsc);
              }
              arrowBtn.setAttribute('data-asc', this.isOrderAsc);
            } else if (this.isOrderAsc === true) {
              if (this.callbacksMap.sortCallback) {
                this.isOrderAsc = false;
                this.callbacksMap.sortCallback(dataKey, this.isOrderAsc);
              }
              arrowBtn.setAttribute('data-asc', this.isOrderAsc);
            } else {
              if (this.callbacksMap.sortCallback) {
                this.isOrderAsc = null;
                this.callbacksMap.sortCallback();
              }
            }
          })
        );
      }
      const menuBtn = document.createElement('span');
      menuBtn.classList.add('material-icons');
      menuBtn.classList.add('menuBtn');
      menuBtn.textContent = 'more_vert';

      this.renderDropDownMenu(menuBtn, col, cell);

      actionsContainer.append(menuBtn);
      headerSortBtn.textContent = col.label;
      cell.append(headerSortBtn);
      cell.append(actionsContainer);
      return cell;
    });
    tableHeaderRow.append(...cells);
    this.tableHeader.append(tableHeaderRow);
  }

  renderDropDownMenu(menuBtn, col, cell) {
    const dropDownMenu = document.createElement('div');
    dropDownMenu.classList.add('drop-down__menu');
    this.menuDropDownItems = this.menuConfig.map((menuElement) => {
      if (!col.sortable) {
        if (menuElement.key === this.menuElMap.SORT_BY_ASC) {
          return (this.menuDropDownItems.innerHTML = '');
        }
        if (menuElement.key === this.menuElMap.SORT_BY_DESC) {
          return (this.menuDropDownItems.innerHTML = '');
        }
      }
      const menuItem = document.createElement('a');
      menuItem.classList.add('menu-item');
      menuItem.textContent = menuElement.label;

      menuItem.addEventListener('click', () => {
        const dataKey = cell.getAttribute('data-key');
        switch (menuElement.key) {
          case this.menuElMap.UNSORT:
            if (this.callbacksMap.sortCallback) {
              this.callbacksMap.sortCallback();
            }
            break;
          case this.menuElMap.SORT_BY_ASC:
            if (this.callbacksMap.sortCallback) {
              this.isOrderAsc = true;
              this.callbacksMap.sortCallback(dataKey, this.isOrderAsc);
            }
            break;
          case this.menuElMap.SORT_BY_DESC:
            if (this.callbacksMap.sortCallback) {
              this.isOrderAsc = false;
              this.callbacksMap.sortCallback(dataKey, this.isOrderAsc);
            }
            break;
          case this.menuElMap.FILTER:
            this.createFilterMenu();
            break;
          case this.menuElMap.HIDE:
            cell.style.display = 'none';
            const dataElements = this.tableElementsMap[dataKey];
            if (dataElements) {
              this.tableElementsMap[dataKey].forEach(
                (item) => (item.style.display = 'none')
              );
            }
            break;
        }
      });

      return menuItem;
    });
    dropDownMenu.append(...this.menuDropDownItems);
    menuBtn.append(dropDownMenu);

    menuBtn.addEventListener('click', () => {
      dropDownMenu.classList.toggle('show');
    });
  }

  createFilterMenu() {
    const filterMenuContainer = document.createElement('div');
    filterMenuContainer.classList.add('filter-menu-container');

    const filterLabel = document.createElement('div');
    filterLabel.classList.add('filter-label');
    filterLabel.textContent = 'Name';

    const filterOperator = document.createElement('div');
    filterOperator.classList.add('filter-operator');
    filterOperator.textContent = 'equal';

    const filterValue = document.createElement('input');
    filterValue.classList.add('filter-value');
    filterValue.placeholder = 'Filter value';

    const btnClean = document.createElement('div');
    btnClean.classList.add('btn-clean');
    btnClean.textContent = 'x';

    const btnExit = document.createElement('div');
    btnExit.classList.add('btn-exit');
    btnExit.textContent = 'x';

    btnExit.addEventListener('click', () => {
      filterMenuContainer.remove();
    });

    btnClean.addEventListener('click', () => {
      filterValue.value = '';
      if (this.callbacksMap.sortCallback) {
        this.callbacksMap.sortCallback();
      }
    });

    const filterFunction = (e) => {
      let filter = e.target.value;
      if (this.callbacksMap.filterCallback) {
        this.callbacksMap.filterCallback(filter);
      }
    };

    filterValue.addEventListener('input', filterFunction);

    filterMenuContainer.append(
      btnClean,
      filterLabel,
      filterOperator,
      filterValue,
      btnExit
    );
    this.tableHeader.append(filterMenuContainer);
  }

  createPagination(totalAmount = 0) {
    const paginationContainer = document.createElement('div');
    paginationContainer.classList.add('pagination-container');

    const dropdownPagintaionContainer = document.createElement('select');
    dropdownPagintaionContainer.classList.add('dropdown-pagination-container');

    this.pageNumberContainer = document.createElement('ul');
    this.pageNumberContainer.classList.add('page-num-container');

    const dropdownPaginationItems = this.paginationConfigList.map((item) => {
      const dropPagItem = document.createElement('option');
      dropPagItem.classList.add('drop-pag-item');
      dropPagItem.textContent = item.pageSize;

      dropdownPagintaionContainer.addEventListener('change', (e) => {
        if (this.amountElOnPage !== parseFloat(e.target.value)) {
          this.amountElOnPage = parseFloat(e.target.value);
          this.renderPagesAmount(totalAmount);
          if (this.callbacksMap.paginationCallback) {
            this.callbacksMap.paginationCallback();
          }
        }
      });

      return dropPagItem;
    });

    dropdownPagintaionContainer.append(...dropdownPaginationItems);
    paginationContainer.append(
      dropdownPagintaionContainer,
      this.pageNumberContainer
    );
    this.tableContainer.append(paginationContainer);
  }

  renderPagesAmount(totalAmount = 0) {
    const pages = Math.ceil(totalAmount / this.amountElOnPage);

    for (let i = 1; i <= pages; i++) {
      const pageNumberBtn = document.createElement('li');
      pageNumberBtn.classList.add('page-number');
      pageNumberBtn.textContent = i;
      this.pageNumberContainer.append(pageNumberBtn);

      pageNumberBtn.addEventListener('click', () => {
        const currentPage = +pageNumberBtn.innerHTML;
        if (this.callbacksMap.paginationCallback) {
          this.callbacksMap.paginationCallback(
            currentPage,
            this.amountElOnPage
          );
        }
      });
    }
  }

  clearTable() {
    this.tableBody.innerHTML = '';
    this.pageNumberContainer.innerHTML = '';
  }

  render(data, totalAmount) {
    this.clearTable();
    this.renderPagesAmount(totalAmount);
    const fragment = new DocumentFragment();
    data.forEach((element) => {
      const rowElement = document.createElement('div');
      rowElement.classList.add('table-row');
      const cells = this.columnsConfig.map((column) => {
        const cell = document.createElement('div');
        cell.classList.add('table-row__cell');
        cell.textContent = element[column.key];

        if (this.tableElementsMap[column.key]) {
          this.tableElementsMap[column.key].push(cell);
        } else {
          this.tableElementsMap[column.key] = [cell];
        }
        return cell;
      });
      rowElement.append(...cells);
      fragment.appendChild(rowElement);
    });

    this.tableBody.appendChild(fragment);
  }
}
