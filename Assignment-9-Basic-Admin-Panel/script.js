const url = 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';



//  DOM elements
const tableData = document.getElementById('table-data');
const searchBox = document.getElementById('search-box');
let activeRow = null;

// render table data
function renderTable(data) {
  //  existing table rows
  tableData.innerHTML = '';

  // Loop data and create table rows
  data.forEach((item) => {
    const row = document.createElement('tr');
    row.className = 'data-row';

    //  event listener to show details on  right 
    row.addEventListener('click', () => {
      showDetails(item);
      setActiveRow(row);
    });

    // table cells for columns
    const columns = ['id', 'firstName', 'lastName', 'email', 'phone'];
    columns.forEach((column) => {
      const cell = document.createElement('td');
      cell.className = `column${columns.indexOf(column) + 1}`;
      cell.textContent = item[column];
      row.appendChild(cell);
    });

    // Append the row table
    tableData.appendChild(row);
  });
}

// Function to set the active row
function setActiveRow(row) {
  if (activeRow) {
    activeRow.classList.remove('active');
  }

  row.classList.add('active');
  activeRow = row;
}

//  show details in the right 
function showDetails(item) {
  const infoContent = document.getElementById('info-content');
  const selectedUser = document.querySelector('#info-content > div:nth-child(1)');
  const description = document.querySelector('#info-content > div:nth-child(2) > textarea');
  const address = document.querySelector('#info-content > div:nth-child(3)');
  const city = document.querySelector('#info-content > div:nth-child(4)');
  const state = document.querySelector('#info-content > div:nth-child(5)');
  const zip = document.querySelector('#info-content > div:nth-child(6)');

  // selected user's name
  selectedUser.textContent = `User selected: ${item.firstName} ${item.lastName}`;

  // description
  description.value = item.description;

  // address, city, state, and zip
  address.textContent = `Address: ${item.address.streetAddress}`;
  city.textContent = `City: ${item.address.city}`;
  state.textContent = `State: ${item.address.state}`;
  zip.textContent = `Zip: ${item.address.zip}`;

  // Show the details
  infoContent.style.display = 'block';
}

// filter the table rows based on search
function filterTableRows(searchText) {
  const rows = document.getElementsByClassName('data-row');

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const firstName = row.querySelector('.column2').textContent.toLowerCase();

    if (firstName.includes(searchText.toLowerCase())) {
      row.style.display = 'table-row';
      row.classList.add('highlight');
    } else {
      row.style.display = 'none';
      row.classList.remove('highlight');
    }
  }
}

// API call to retrieve 
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    // Hide the preloader overlay
    document.getElementById('overlay').style.display = 'none';

    // Render the initial table data
    renderTable(data);

    //  input event listener to the search box
    searchBox.addEventListener('input', () => {
      filterTableRows(searchBox.value);
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });
