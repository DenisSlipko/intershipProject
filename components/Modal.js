import { changeData } from '../api/requests.js';

export class Modal {
  tableContainer = null;
  modalWindowContainer = null;
  bgShadow = null;

  constructor(tableContainer) {
    this.tableContainer = tableContainer;
  }

  renderModal(desiredObject, rowId) {
    this.modalWindowContainer = document.createElement('div');
    this.modalWindowContainer.classList.add('modal-window-container');
    this.bgShadow = document.createElement('div');
    this.bgShadow.classList.add('bg-shadow');
    this.tableContainer.append(this.modalWindowContainer, this.bgShadow);
    this.bgShadow.addEventListener('click', () => {
      this.remove();
    });
    let changedDataObj = {};
    this.renderInputFields(desiredObject, changedDataObj);
    const changeDataBtn = document.createElement('button');
    changeDataBtn.classList.add('change-data-btn');
    changeDataBtn.innerText = 'CHANGE DATA';

    changeDataBtn.addEventListener('click', () => {
      changeData(rowId, changedDataObj);
      this.remove();
    });

    this.modalWindowContainer.append(changeDataBtn);
  }

  remove() {
    this.modalWindowContainer.remove();
    this.bgShadow.remove();
  }

  renderInputFields(desiredObject, changedDataObj) {
    for (let key in desiredObject) {
      if (key !== 'id') {
        const inputField = document.createElement('input');
        inputField.classList.add('modal-input-flied');
        inputField.placeholder = key;
        inputField.value = desiredObject[key];
        changedDataObj[key] = inputField.value;

        inputField.addEventListener('input', () => {
          changedDataObj[key] = inputField.value;
        });
        this.modalWindowContainer.append(inputField);
      }
    }
  }
}
