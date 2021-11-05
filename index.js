//import dataJSON from "./data.json";
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

// let json = JSON.parse(dataJSON);
// console.log(json);

(function () {
  document.getElementById("tableItem").innerHTML = countries
    .map(
      (e) =>
        `<tr><td class="item-cell">${e.name}</td><td class="item-cell">${e.iso}</td><td class="item-cell">${e.phoneCode}</td><td class="item-cell">${e.currency}</td><td class="item-cell">${e.capital}</td></tr>`
    )
    .join("");
})();
