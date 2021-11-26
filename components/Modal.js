import { changeData } from '../api/requests.js';

export class Modal {
  modalWindowContainer = null;
  constructor(modalWindowContainer) {
    this.modalWindowContainer = modalWindowContainer;
  }

  createModal(matchObj, rowId) {
    let changedDataObj = {};
    for (let key in matchObj) {
      if (key !== 'id') {
        const inputField = document.createElement('input');
        inputField.classList.add('modal-input-flied');
        inputField.placeholder = key;
        inputField.value = matchObj[key];
        changedDataObj[key] = inputField.value;

        inputField.addEventListener('input', () => {
          changedDataObj[key] = inputField.value;
        });
        this.modalWindowContainer.append(inputField);
      }
    }

    const changeDataBtn = document.createElement('button');
    changeDataBtn.classList.add('change-data-btn');
    changeDataBtn.innerText = 'CHANGE DATA';

    changeDataBtn.addEventListener('click', () => {
      changeData(rowId, changedDataObj);
      this.modalWindowContainer.remove();
    });

    this.modalWindowContainer.append(changeDataBtn);
  }
}
