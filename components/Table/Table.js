export class Table {
  columnsConfig = null;
  menuConfig = null;
  tableContainer = null;
  tableBody = null;
  tableHeader = null;
  sortCallback = null;
  isOrderAsc = null;
  PaginationConfig = [
    { pageSize: '10' },
    { pageSize: '20' },
    { pageSize: '50' },
    { pageSize: '100' },
  ];
  paginationCallback = null;
  initialSizePagination = 20;
  numberOfPage = null;
  selectPageNumber = 1;
  tableElementsMap = {};

  constructor(
    columnsConfig,
    menuConfig,
    tableContainer,
    sortCallback,
    paginationCallback
  ) {
    this.columnsConfig = columnsConfig;
    this.menuConfig = menuConfig;
    this.tableContainer = tableContainer;
    this.sortCallback = sortCallback;
    this.paginationCallback = paginationCallback;
  }

  createTable() {
    this.tableHeader = document.createElement('div');
    this.tableHeader.classList.add('table-header');
    this.tableContainer.append(this.tableHeader);

    this.tableBody = document.createElement('div');
    this.tableBody.classList.add('table-body');
    this.tableContainer.append(this.tableBody);

    this.createHeader();
    this.createPagination();
  }

  createHeader() {
    const tableHeaderRow = document.createElement('div');
    tableHeaderRow.classList.add('table-header-row');

    const cells = this.columnsConfig.map((col) => {
      const cell = document.createElement('div');
      cell.classList.add('table-header__cell');
      cell.setAttribute('data-key', col.key);
      //cell.setAttribute('data-sortable', col.sortable);
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
              this.sortCallback(dataKey, this.isOrderAsc);
              arrowBtn.setAttribute('asc', this.isOrderAsc);
              return;
            }
            if (this.isOrderAsc === true) {
              this.isOrderAsc = false;
              this.sortCallback(dataKey, this.isOrderAsc);
              arrowBtn.setAttribute('asc', this.isOrderAsc);
              return;
            }
            if (this.isOrderAsc === false) {
              this.isOrderAsc = null;
              this.sortCallback();
              return;
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
      const menuItems = this.menuConfig.map((item) => {
        const menuItem = document.createElement('a');
        menuItem.classList.add('menu-item');
        menuItem.textContent = item.label;

        if (!col.sortable) {
          if (item.key === 'sortbyasc') {
            menuItem.style.display = 'none';
          }
          if (item.key === 'sortbydesc') {
            menuItem.style.display = 'none';
          }
        }

        menuItem.addEventListener('click', (e) => {
          const dataKey = cell.getAttribute('data-key');

          switch (item.key) {
            case 'unsort':
              this.sortCallback();
              break;
            case 'sortbyasc':
              this.isOrderAsc = true;
              this.sortCallback(dataKey, this.isOrderAsc);
              break;
            case 'sortbydesc':
              this.isOrderAsc = false;
              this.sortCallback(dataKey, this.isOrderAsc);
              break;
            case 'filter':
              this.filterMenu();
              break;
            case 'hide':
              cell.style.display = 'none';
              for (let key in this.tableElementsMap) {
                if (key === dataKey) {
                  this.tableElementsMap[key].forEach(
                    (item) => (item.style.display = 'none')
                  );
                }
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

  filterMenu() {
    const filterMenuContainer = document.createElement('div');
    filterMenuContainer.classList.add('filter-menu-container');

    const filterLabel = document.createElement('div');
    filterLabel.classList.add('menu-label');
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
      filterMenuContainer.style.display = 'none';
    });

    btnClean.addEventListener('click', () => {
      filterValue.value = '';
      document
        .querySelectorAll('.table-row')
        .forEach((row) => (row.style.display = ''));
    });

    const filterFunction = (e) => {
      this.paginationCallback();
      let filter = e.target.value;
      for (let key in this.tableElementsMap) {
        if (key === 'name') {
          this.tableElementsMap[key].forEach((item) =>
            item.innerHTML.toLowerCase().indexOf(filter) > -1
              ? (item.parentElement.style.display = '')
              : (item.parentElement.style.display = 'none')
          );
        }
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
  createPagination() {
    const pagintaionContainer = document.createElement('div');
    pagintaionContainer.classList.add('pagination-container');

    const dropdownPagintaionContainer = document.createElement('ul');
    dropdownPagintaionContainer.classList.add('dropdown-pagintaion-container');
    const pageNumberContainer = document.createElement('ul');
    pageNumberContainer.classList.add('page-num-container');

    const renderPagesNumbers = () => {
      this.numberOfPage = Math.ceil(
        this.paginationCallback().length / this.initialSizePagination
      );

      for (let i = 1; i <= this.numberOfPage; i++) {
        const pageNumberBtn = document.createElement('li');
        pageNumberBtn.classList.add('page-number');
        pageNumberBtn.textContent = i;
        pageNumberContainer.append(pageNumberBtn);

        pageNumberBtn.addEventListener('click', (e) => {
          this.selectPageNumber = +pageNumberBtn.innerHTML;
          let start = (this.selectPageNumber - 1) * this.initialSizePagination;
          let end = start + this.initialSizePagination;
          let notes = this.paginationCallback().slice(start, end);

          this.render(notes);
        });
      }
    };
    renderPagesNumbers();

    const dropdownPagintaionItems = this.PaginationConfig.map((item) => {
      const dropPagItem = document.createElement('li');
      dropPagItem.classList.add('drop-pag-item');
      dropPagItem.textContent = item.pageSize;

      dropdownPagintaionContainer.addEventListener('click', (e) => {
        dropPagItem.style.display = 'block';

        if (this.initialSizePagination !== +e.target.innerHTML) {
          this.initialSizePagination = +e.target.innerHTML;
          renderPagesNumbers();
        }
      });

      return dropPagItem;
    });

    const pageSwitcher = document.createElement('div');
    pageSwitcher.classList.add('page-switcher');

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
    let paginationData = data.slice(0, this.initialSizePagination);
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
