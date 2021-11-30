import { MenuElMap } from '../../dataStore/menuConfig.js';
import { Modal } from '../Modal.js';

const PaginationConfigList = [{ pageSize: '20' }, { pageSize: '50' }, { pageSize: '100' }];
const DefaultAmountEl = PaginationConfigList[0].pageSize;

export class Table {
  columnsConfig = null;
  menuConfig = null;
  tableContainer = null;
  tableBody = null;
  tableHeader = null;
  isOrderAsc = null;

  callbacksMap = {
    sortCallback: null,
    pagintaionCallback: null,
    filterCallback: null,
  };
  tableElementsMap = {};
  amountElOnPage = DefaultAmountEl;
  pageNumberContainer = null;
  menuDropDownItems = null;
  menuItem = null;
  tableHeaderRow = null;
  saveServerData = [];

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
    this.bodyListener();
  }

  createHeader() {
    this.tableHeaderRow = document.createElement('div');
    this.tableHeaderRow.classList.add('table-header-row');

    const cells = this.columnsConfig.map((col) => {
      const cell = document.createElement('div');
      cell.classList.add('table-header__cell');
      cell.setAttribute('data-key', col.key);
      const dataKey = col.key;

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

        if (this.callbacksMap.sortCallback) {
          arrayOfActions.forEach((el) =>
            el.addEventListener('click', () => {
              if (this.isOrderAsc === null) {
                this.isOrderAsc = true;
                this.callbacksMap.sortCallback(dataKey, this.isOrderAsc);
                arrowBtn.setAttribute('data-asc', this.isOrderAsc);
              } else if (this.isOrderAsc === true) {
                this.isOrderAsc = false;
                this.callbacksMap.sortCallback(dataKey, this.isOrderAsc);
                arrowBtn.setAttribute('data-asc', this.isOrderAsc);
              } else {
                this.isOrderAsc = null;
                this.callbacksMap.sortCallback();
              }
            })
          );
        }
      }
      const menuBtn = document.createElement('span');
      menuBtn.classList.add('material-icons');
      menuBtn.classList.add('menuBtn');
      menuBtn.textContent = 'more_vert';

      const isSortable = col.sortable;
      this.renderDropDownMenu(menuBtn, isSortable, cell, dataKey);

      actionsContainer.append(menuBtn);
      headerSortBtn.textContent = col.label;
      cell.append(headerSortBtn);
      cell.append(actionsContainer);
      return cell;
    });
    this.tableHeaderRow.append(...cells);
    this.tableHeader.append(this.tableHeaderRow);
  }

  renderDropDownMenu(menuBtn, isSortable, cell, dataKey) {
    const dropDownMenu = document.createElement('div');
    dropDownMenu.classList.add('drop-down__menu');
    this.menuDropDownItems = this.menuConfig
      .filter((elConfig) => {
        const isSortEl = elConfig.key === MenuElMap.SORT_BY_ASC || elConfig.key === MenuElMap.SORT_BY_DESC;
        return isSortEl ? isSortable && this.callbacksMap.sortCallback : true;
      })
      .map((menuElement) => {
        this.menuItem = document.createElement('a');
        this.menuItem.classList.add('menu-item');
        this.menuItem.textContent = menuElement.label;

        this.menuItem.addEventListener('click', () => {
          switch (menuElement.key) {
            case MenuElMap.UNSORT:
              this.isOrderAsc = null;
              this.callbacksMap.sortCallback();
              break;
            case MenuElMap.SORT_BY_ASC:
              this.isOrderAsc = true;
              this.callbacksMap.sortCallback(dataKey, this.isOrderAsc);
              break;
            case MenuElMap.SORT_BY_DESC:
              this.isOrderAsc = false;
              this.callbacksMap.sortCallback(dataKey, this.isOrderAsc);
              break;
            case MenuElMap.FILTER:
              this.createFilterMenu(dataKey);
              break;
            case MenuElMap.HIDE:
              cell.style.display = 'none';
              const dataElements = this.tableElementsMap[dataKey];
              if (dataElements) {
                this.tableElementsMap[dataKey].forEach((item) => (item.style.display = 'none'));
              }
              break;
          }
        });
        return this.menuItem;
      });

    dropDownMenu.append(...this.menuDropDownItems);
    menuBtn.append(dropDownMenu);

    menuBtn.addEventListener('click', () => {
      dropDownMenu.style.display = 'block';
    });
    this.tableHeaderRow.addEventListener('mouseleave', () => {
      dropDownMenu.style.display = 'none';
    });
  }

  createFilterMenu(dataKey) {
    const filterMenuContainer = document.createElement('div');
    filterMenuContainer.classList.add('filter-menu-container');

    const filterLabel = document.createElement('div');
    filterLabel.classList.add('filter-label');
    filterLabel.textContent = dataKey;

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

    if (this.callbacksMap.filterCallback) {
      btnClean.addEventListener('click', () => {
        filterValue.value = '';
        this.callbacksMap.filterCallback();
      });
      filterValue.addEventListener('input', (e) => {
        let filter = e.target.value;
        this.callbacksMap.filterCallback(filter, dataKey);
      });
    }

    filterMenuContainer.append(btnClean, filterLabel, filterOperator, filterValue, btnExit);
    this.tableHeader.append(filterMenuContainer);
  }

  createPagination(totalAmount = 0) {
    const paginationContainer = document.createElement('div');
    paginationContainer.classList.add('pagination-container');

    const dropdownPagintaionContainer = document.createElement('select');
    dropdownPagintaionContainer.classList.add('dropdown-pagination-container');

    this.pageNumberContainer = document.createElement('ul');
    this.pageNumberContainer.classList.add('page-num-container');

    const dropdownPaginationItems = PaginationConfigList.map((item) => {
      const dropPagItem = document.createElement('option');
      dropPagItem.classList.add('drop-pag-item');
      dropPagItem.textContent = item.pageSize;

      if (this.callbacksMap.paginationCallback) {
        dropdownPagintaionContainer.addEventListener('change', (e) => {
          if (this.amountElOnPage !== parseInt(e.target.value, 10)) {
            this.amountElOnPage = parseInt(e.target.value, 10);
            this.renderPagesAmount(totalAmount);
            this.callbacksMap.paginationCallback();
          }
        });
      }

      return dropPagItem;
    });

    dropdownPagintaionContainer.append(...dropdownPaginationItems);
    paginationContainer.append(dropdownPagintaionContainer, this.pageNumberContainer);
    this.tableContainer.append(paginationContainer);
  }

  renderPagesAmount(totalAmount = 0) {
    const pages = Math.ceil(totalAmount / this.amountElOnPage);

    for (let i = 1; i <= pages; i++) {
      const pageNumberBtn = document.createElement('li');
      pageNumberBtn.classList.add('page-number');
      pageNumberBtn.textContent = i;
      this.pageNumberContainer.append(pageNumberBtn);

      if (this.callbacksMap.paginationCallback) {
        pageNumberBtn.addEventListener('click', () => {
          const currentPage = i;
          this.callbacksMap.paginationCallback(currentPage, this.amountElOnPage);
        });
      }
    }
  }

  createModalWindow(targetObject, rowId) {
    const modalWindow = new Modal(this.tableContainer);
    modalWindow.renderModal(targetObject, rowId);
  }

  bodyListener() {
    this.tableBody.addEventListener('click', (e) => {
      if (e.target.getAttribute('data-id')) {
        const rowId = parseInt(e.target.getAttribute('data-id'), 10);
        const targetObject = this.saveServerData.find(({ id }) => id === rowId);
        this.createModalWindow(targetObject, rowId);
      }
    });
  }

  clearTable() {
    this.tableBody.innerHTML = '';
    this.pageNumberContainer.innerHTML = '';
  }

  render(data, totalAmount) {
    this.clearTable();
    this.renderPagesAmount(totalAmount);
    this.saveServerData = data;
    const fragment = new DocumentFragment();
    data.forEach((element) => {
      const rowElement = document.createElement('div');
      rowElement.classList.add('table-row');
      rowElement.setAttribute('data-id', element.id);
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
