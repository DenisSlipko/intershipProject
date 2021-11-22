const PaginationConfigList = [
  { pageSize: '20' },
  { pageSize: '50' },
  { pageSize: '100' },
];

export class Table {
  columnsConfig = null;
  menuConfig = null;
  tableContainer = null;
  tableBody = null;
  tableHeader = null;
  isOrderAsc = null;

  PaginationConfigList = PaginationConfigList;
  callbacksMap = {
    sortCallback: null,
    pagintaionCallback: null,
    filterCallback: null,
  };
  tableElementsMap = {};
  amount = this.PaginationConfigList[0].pageSize;

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
        const arrayOfListener = [headerSortBtn, arrowBtn];
        actionsContainer.append(arrowBtn);

        arrayOfListener.forEach((el) =>
          el.addEventListener('click', () => {
            const dataKey = cell.getAttribute('data-key');

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
      const menuBtn = document.createElement('span');
      menuBtn.classList.add('material-icons');
      menuBtn.classList.add('menuBtn');
      menuBtn.textContent = 'more_vert';

      const dropDownMenu = document.createElement('div');
      dropDownMenu.classList.add('drop-down__menu');
      const menuItems = this.menuConfig.map((menuElement) => {
        const menuItem = document.createElement('a');
        menuItem.classList.add('menu-item');
        menuItem.textContent = menuElement.label;

        if (!col.sortable) {
          if (menuElement.key === 'sortByAsc') {
            menuItem.style.display = 'none';
          }
          if (menuElement.key === 'sortByDesc') {
            menuItem.style.display = 'none';
          }
        }

        menuItem.addEventListener('click', () => {
          const dataKey = cell.getAttribute('data-key');

          switch (menuElement.key) {
            case 'unsort':
              this.callbacksMap.sortCallback();
              break;
            case 'sortByAsc':
              this.isOrderAsc = true;
              this.callbacksMap.sortCallback(dataKey, this.isOrderAsc);
              break;
            case 'sortByDesc':
              this.isOrderAsc = false;
              this.callbacksMap.sortCallback(dataKey, this.isOrderAsc);
              break;
            case 'filter':
              this.createFilterMenu();
              break;
            case 'hide':
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
      dropDownMenu.append(...menuItems);
      menuBtn.append(dropDownMenu);

      menuBtn.addEventListener('click', () => {
        dropDownMenu.classList.toggle('show');
      });

      actionsContainer.append(menuBtn);
      headerSortBtn.textContent = col.label;
      cell.append(headerSortBtn);
      cell.append(actionsContainer);
      return cell;
    });
    tableHeaderRow.append(...cells);
    this.tableHeader.append(tableHeaderRow);
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
      filterMenuContainer.parentElement.children[1].remove();
    });

    btnClean.addEventListener('click', () => {
      filterValue.value = '';
      document
        .querySelectorAll('.table-row')
        .forEach((row) => (row.style.display = 'flex'));
    });

    const filterFunction = (e) => {
      let filter = e.target.value;
      this.callbacksMap.filterCallback(filter);
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

  createPagination(TOTAL_AMOUNT = 0) {
    const pagintaionContainer = document.createElement('div');
    pagintaionContainer.classList.add('pagination-container');

    const dropdownPagintaionContainer = document.createElement('select');
    dropdownPagintaionContainer.classList.add('dropdown-pagination-container');

    const pageNumberContainer = document.createElement('ul');
    pageNumberContainer.classList.add('page-num-container');

    const renderPagesNumbers = () => {
      const pages = Math.ceil(TOTAL_AMOUNT / this.amount);

      for (let i = 1; i <= pages; i++) {
        const pageNumberBtn = document.createElement('li');
        pageNumberBtn.classList.add('page-number');
        pageNumberBtn.textContent = i;
        pageNumberContainer.append(pageNumberBtn);

        pageNumberBtn.addEventListener('click', () => {
          const currentPage = +pageNumberBtn.innerHTML;
          this.callbacksMap.paginationCallback(currentPage, this.amount);
        });
      }
    };
    renderPagesNumbers();

    const dropdownPagintaionItems = this.PaginationConfigList.map((item) => {
      const dropPagItem = document.createElement('option');
      dropPagItem.classList.add('drop-pag-item');
      dropPagItem.textContent = item.pageSize;

      dropdownPagintaionContainer.addEventListener('change', (e) => {
        if (this.amount !== +e.target.value) {
          pageNumberContainer.innerHTML = '';
          this.amount = +e.target.value;
          renderPagesNumbers();
          this.callbacksMap.sortCallback();
        }
      });

      return dropPagItem;
    });

    dropdownPagintaionContainer.append(...dropdownPagintaionItems);
    pagintaionContainer.append(
      dropdownPagintaionContainer,
      pageNumberContainer
    );
    this.tableContainer.append(pagintaionContainer);
  }

  clearTable() {
    this.tableBody.innerHTML = '';
  }

  render(data) {
    this.clearTable();
    const fragment = new DocumentFragment();
    let hidePagination = document.querySelector('.page-num-container');
    let paginationData = data.slice(0, this.amount);
    let dataLenght = Object.keys(paginationData).length;
    if (dataLenght < this.amount) {
      hidePagination.style.display = 'none';
    } else {
      hidePagination.style.display = 'flex';
    }
    paginationData.forEach((element) => {
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
