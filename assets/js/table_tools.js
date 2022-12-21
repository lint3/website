
const table = document.querySelector('.ttools');

const headers = table.querySelectorAll('th');
const tableBody = table.querySelector('tbody');
const tableWrapper = document.querySelector('.table-wrapper');
const allTableData = table2data(tableBody);
var lastActiveTableData = structuredClone(allTableData);

var actionData = {lastActiveColumn: 0};

var toolsButton = document.createElement('input');
setAttributes(toolsButton, {'type': 'button', 'value': 'Filter, Sort, Etc.', 'class': 'tools-button'});
toolsButton.addEventListener('click', (event) => { addTools(); });
tableWrapper.appendChild(toolsButton);

function ColumnDataTemplate() {
  this.query = '';
  this.min = null;
  this.max = null;
  this.sorted = false;
  this.sortAsc = true;
  this.dataType = 'alpha';
};

function addTools() {
  
  for (let i = 0; i < headers.length; i++) {
    var data = new ColumnDataTemplate();
    actionData[i] = data;
    actionData[i].dataType = headers[i].getAttribute('datatype');
  }


  // Add tools UI to each header cell
  table.querySelectorAll('th')
    .forEach((element, columnNo) => {
      element.prepend(generateColumnTools(actionData[columnNo].dataType, columnNo));
    });
}

function applyActions(activeColumn) {
  var columnActions = getColumnActions(activeColumn);
  if (activeColumn == actionData.lastActiveColumn) {
    // We don't need to recompute everything, just narrow lastActiveTableData using activeColumn's params
    var activeTableData = structuredClone(lastActiveTableData);
    
    filterTable(activeTableData, activeColumn, columnActions.query);
    clipTable(activeTableData, activeColumn, columnActions.min, columnActions.max);
  } else {
    // We have to recompute everything
    var activeTableData = structuredClone(allTableData);
    filterTable(activeTableData, activeColumn, columnActions.query);
    clipTable(activeTableData, activeColumn, columnActions.min, columnActions.max);
    lastActiveTableData = structuredClone(activeTableData);
  }
  sortTable(activeColumn, false)
  
}

function setAttributes(element, attributes) {
  for (attr in attributes) {
    element.setAttribute(attr, attributes[attr]);
  }
}

function getColumnActions(col) {
  actionData[col].query = headers[col].querySelector('.column-search').value;
  actionData[col] = headers[col].querySelector('.column-min').value;
  actionData[col] = headers[col].querySelector('.column-max').value;
  return actionData[col];
}

function generateColumnTools(type, columnNo) {
  // Create wrapper
  var headerActions = document.createElement('div');
  setAttributes(headerActions, {'class': 'header-actions'});
  
  // Search filter input
  var searchBox = document.createElement('input');
  setAttributes(searchBox, {'type': 'text', 'class': 'column-search', 'placeholder': 'search'});
  searchBox.addEventListener('change', (event) => {
    applyActions(columnNo);
  });
  headerActions.appendChild(searchBox);
  
  // Sort button
  var sortButton = document.createElement('input');
  setAttributes(sortButton, {'type': 'button', 'value': 'sort', 'class': 'column-sort'});
  sortButton.addEventListener('click', (event) => {
    sortTable(columnNo, true);
  });
  headerActions.appendChild(sortButton);
  
  // Min/max inputs
  if (type == 'numeric') {
    var minBox = document.createElement('input');
    setAttributes(minBox, {'type': 'text', 'class': 'column-min', 'placeholder': 'min'});
    minBox.addEventListener('change', (event) => {
      applyActions(columnNo);
    });
    headerActions.appendChild(minBox);
    
    var maxBox = document.createElement('input');
    setAttributes(maxBox, {'type': 'text', 'class': 'column-max', 'placeholder': 'max'});
    maxBox.addEventListener('change', (event) => {
      applyActions(columnNo);
    });
    headerActions.appendChild(maxBox);
  }
  
  return headerActions;
}

function filterTable(col) {
  
}

function clipTable(tableData, col, min, max) {
  var result = [];
  for (let i = 0; i < tableData.length; i++) {
    let value = parseFloat(tableData[i][col]);
    if (value >= min & value <= max) {
      result.push(tableData[i]);
    }
  }
  tableData = result;
}

function sortTable(col, buttAction) {
  // If button clicked and we had already sorted on this column, toggle sort asc/desc
  var sortAsc = actionData[col].sortAsc ^ (buttAction & actionData[col].sorted);
  for (let i = 0; i < headers.length; i++) {
    actionData[i].sorted = false;
  }
  actionData[col].sorted = true;
  actionData[col].sortAsc = sortAsc;
  
  var tableData = table2data(tableBody);

  if (actionData[col].dataType == "numeric") {
    tableData.sort((a, b) => {
      if (parseFloat(a[col]) > parseFloat(b[col]) & sortAsc) {
        return 1;
      }
      if (parseFloat(a[col]) < parseFloat(b[col]) & !sortAsc) {
        return 1;
      }
      return -1;
    });
  } else {
    tableData.sort((a, b) => {
      if (a[col] > b[col] & sortAsc) {
        return 1;
      }
      if (a[col] < b[col] & !sortAsc) {
        return 1;
      }
      return -1;
    });
  }
  
  updateTable(tableData);
}




function table2data(tableBody) {
  const tableData = [];
  tableBody.querySelectorAll('tr')
  .forEach(row => {
    const rowData = [];
    row.querySelectorAll('td')
    .forEach(cell => {
      rowData.push(cell.innerText);
    })
    tableData.push(rowData);
  });
  return tableData;
}

function updateTable(tableData) {
  headers.forEach((cell, i) => {
    if (actionData[i].sorted) {
      cell.className = "sorted";
    } else {
      cell.className = "";
    }
  });
  
  tableBody.querySelectorAll('tr')
  .forEach((row, i) => {
    const rowData = tableData[i];
    row.querySelectorAll('td')
    .forEach((cell, j) => {
      cell.innerText = rowData[j];
      if (actionData[j].sorted) {
        cell.className = "sorted";
      } else {
        cell.className = "";
      }
    })
  });
}
