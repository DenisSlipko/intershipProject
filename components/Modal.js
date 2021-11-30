import { changeData } from '../api/requests.js';

export class Modal {
  modalWindowContainer = null;
  bgShadow = null;
  changedDataObj = {};

  renderModal(targetObject, rowId) {
    this.modalWindowContainer = document.createElement('div');
    this.modalWindowContainer.classList.add('modal-window-container');
    this.bgShadow = document.createElement('div');
    this.bgShadow.classList.add('bg-shadow');
    document.body.append(this.modalWindowContainer, this.bgShadow);
    this.bgShadow.addEventListener('click', () => {
      this.remove();
    });
    this.renderInputFields(targetObject);
    const changeDataBtn = document.createElement('button');
    changeDataBtn.classList.add('change-data-btn');
    changeDataBtn.innerText = 'CHANGE DATA';

    changeDataBtn.addEventListener('click', () => {
      changeData(rowId, this.changedDataObj);
      this.remove();
    });

    this.modalWindowContainer.append(changeDataBtn);
  }

  remove() {
    this.modalWindowContainer.remove();
    this.bgShadow.remove();
  }

  renderInputFields(targetObject) {
    for (let key in targetObject) {
      if (key !== 'id') {
        const inputField = document.createElement('input');
        inputField.classList.add('modal-input-flied');
        inputField.placeholder = key;
        inputField.value = targetObject[key];
        this.changedDataObj[key] = inputField.value;

        inputField.addEventListener('input', (e) => {
          this.changedDataObj[key] = e.target.value;
        });

        this.modalWindowContainer.append(inputField);
      }
    }
  }
}
