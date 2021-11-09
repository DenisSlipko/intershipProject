const countries = [
  {
    name: "Afghanistan",
    iso: "AFG",
    phoneCode: "93",
    currency: "AFN",
    capital: "Kabul",
  },
  {
    name: "Aland Islands",
    iso: "ALA",
    phoneCode: "+358-18",
    currency: "EUR",
    capital: "Mariehamn",
  },
  {
    name: "Albania",
    iso: "ALB",
    phoneCode: "355",
    currency: "ALL",
    capital: "Tirana",
  },
  {
    name: "Algeria",
    iso: "DZA",
    phoneCode: "213",
    currency: "DZD",
    capital: "Algiers",
  },
  {
    name: "American Samoa",
    iso: "ASM",
    phoneCode: "+1-684",
    currency: "USD",
    capital: "Pago Pago",
  },
  {
    name: "Andorra",
    iso: "AND",
    phoneCode: "376",
    currency: "EUR",
    capital: "Andorra la Vella",
  },
  {
    name: "Angola",
    iso: "AGO",
    phoneCode: "244",
    currency: "AOA",
    capital: "Luanda",
  },
  {
    name: "Anguilla",
    iso: "AIA",
    phoneCode: "+1-264",
    currency: "XCD",
    capital: "tde Valley",
  },
  {
    name: "Antarctica",
    iso: "ATA",
    phoneCode: "672",
    currency: "AAD",
    capital: "none",
  },
  {
    name: "Antigua And Barbuda",
    iso: "ATG",
    phoneCode: "+1-268",
    currency: "XCD",
    capital: "St. John's",
  },
  {
    name: "Argentina",
    iso: "ARG",
    phoneCode: "54",
    currency: "ARS",
    capital: "Buenos Aires",
  },
  {
    name: "Armenia",
    iso: "ARM",
    phoneCode: "374",
    currency: "AMD",
    capital: "Yerevan",
  },
  {
    name: "Aruba",
    iso: "ABW",
    phoneCode: "297",
    currency: "AWG",
    capital: "Oranjestad",
  },
  {
    name: "Australia",
    iso: "AUS",
    phoneCode: "61",
    currency: "AUD",
    capital: "Canberra",
  },
  {
    name: "Austria",
    iso: "AUT",
    phoneCode: "43",
    currency: "EUR",
    capital: "Vienna",
  },
  {
    name: "Azerbaijan",
    iso: "AZE",
    phoneCode: "994",
    currency: "AZN",
    capital: "Baku",
  },
  {
    name: "Bahamas tde",
    iso: "BHS",
    phoneCode: "+1-242",
    currency: "BSD",
    capital: "Nassau",
  },
  {
    name: "Bahrain",
    iso: "BHR",
    phoneCode: "973",
    currency: "BHD",
    capital: "Manama",
  },
  {
    name: "Bangladesh",
    iso: "BGD",
    phoneCode: "880",
    currency: "BDT",
    capital: "Dhaka",
  },
  {
    name: "Barbados",
    iso: "BRB",
    phoneCode: "+1-246",
    currency: "BBD",
    capital: "Bridgetown",
  },
];

const columnsFields = [
  { nameField: "Name", key: "name", order: null, clicked: false },
  { nameField: "Iso", key: "iso", order: null, clicked: false },
  { nameField: "Phone сode", key: "phoneCode", order: null, clicked: false },
  { nameField: "Currency", key: "currency", order: null, clicked: false },
  { nameField: "Capital", key: "capital", order: null, clicked: false },
];
const headerTableRow = document.querySelector(".table-header-row");
const tableItem = document.querySelector("#tableItem");

class Table {
  constructor() {}

  createHeader() {
    const fragment = new DocumentFragment();
    columnsFields.forEach((col) => {
      const cell = document.createElement("th");
      cell.classList.add("item-cell");
      cell.textContent = col.nameField;
      fragment.appendChild(cell);
    });

    headerTableRow.appendChild(fragment);
  }

  createCells() {
    const fragment = new DocumentFragment();
    countries.forEach((country) => {
      const field = document.createElement("tr");
      field.classList.add("row-field");

      const cells = columnsFields.map((column) => {
        const cell = document.createElement("td");
        cell.classList.add("item-cell");
        cell.textContent = country[column.key];

        return cell;
      });
      field.append(...cells);
      fragment.appendChild(field);
    });
    tableItem.appendChild(fragment);
  }
}
const coutrinesTable = new Table();
coutrinesTable.createHeader();
coutrinesTable.createCells();
