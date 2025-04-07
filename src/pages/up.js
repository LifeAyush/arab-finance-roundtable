const SPREADSHEET_ID = '1ic4QW6FAz-uMb6V92dR9KOXdKUAabfqIoQVKqhtdgus';
const API_KEY = 'AIzaSyAlXocHmaZiOF5QBle6RdWnd3IhOoyb7l0'
const CLIENT_ID = '908508394470-1en9cg7csp91bbgkv7hvqauir87l6ir7.apps.googleusercontent.com'; // Replace with your OAuth client ID
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive';

// Initialize the Google API client
export function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    scope: SCOPES,
    discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4']
  }).then(() => {
    // Enable the upload button after API is initialized
    document.getElementById('uploadButton').disabled = false;
  }).catch(error => {
    console.error('Error initializing Google API client:', error);
  });
}

// Load the Google API client
function loadGapiClient() {
  gapi.load('client:auth2', initClient);
}

// Check if user is authorized and handle authorization if needed
export function handleAuthClick(dataList, category, isPrime) {
  if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
    // User is signed in, proceed with the upload
    appendDataToSheet(dataList, category, isPrime);
  } else {
    // User is not signed in, prompt to sign in
    gapi.auth2.getAuthInstance().signIn().then(() => {
      appendDataToSheet(dataList, category, isPrime);
    });
  }
}

// Main function to append data to Google Sheets
function appendDataToSheet(dataList, category, isPrime) {
  // Convert dataList to array of dictionaries (assuming same format as original code)
  const listOfDict = dataList.map(data => data[0]);

  // Get current date and time in Indian timezone
  const now = new Date();
  const options = { 
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    hour12: false
  };
  
  const formatter = new Intl.DateTimeFormat('en-US', options);
  const parts = formatter.formatToParts(now);
  
  // Build date string in YYYY-MM-DD format
  const year = parts.find(part => part.type === 'year').value;
  const month = parts.find(part => part.type === 'month').value;
  const day = parts.find(part => part.type === 'day').value;
  const today = `${year}-${month}-${day}`;
  
  // Get current hour
  const hour = parseInt(parts.find(part => part.type === 'hour').value);
  
  // Determine sheet name based on time of day
  const primeVal = isPrime === "true" ? "prime" : "non-prime";
  let sheetName = `MIDNIGHT_RUN_${primeVal}_${category}_${today}`;
  
  if (hour > 4) {
    sheetName = `MORNING_RUN_${primeVal}_${category}_${today}`;
  }
  if (hour > 16) {
    sheetName = `EVENING_RUN_${primeVal}_${category}_${today}`;
  }

  // First check if the sheet exists
  gapi.client.sheets.spreadsheets.get({
    spreadsheetId: SPREADSHEET_ID
  }).then(response => {
    const sheets = response.result.sheets;
    const sheetExists = sheets.some(sheet => sheet.properties.title === sheetName);
    
    if (!sheetExists) {
      // Sheet doesn't exist, create it first
      return createNewSheet(sheetName).then(() => {
        // After sheet creation, add headers and then the data
        const headers = Object.keys(listOfDict[0]);
        const headerValues = [headers];
        
        return updateSheetValues(sheetName, headerValues).then(() => {
          // After headers are added, append the data
          return appendValues(sheetName, listOfDict);
        });
      });
    } else {
      // Sheet exists, just append the data
      return appendValues(sheetName, listOfDict);
    }
  }).then(() => {
    console.log(`Data successfully appended to ${sheetName}`);
    document.getElementById('uploadStatus').textContent = `Success! Data appended to ${sheetName}`;
  }).catch(error => {
    console.error('Error processing request:', error);
    document.getElementById('uploadStatus').textContent = 'Error appending data. Check console for details.';
  });
}

// Helper function to create a new sheet
function createNewSheet(sheetName) {
  return gapi.client.sheets.spreadsheets.batchUpdate({
    spreadsheetId: SPREADSHEET_ID,
    resource: {
      requests: [{
        addSheet: {
          properties: {
            title: sheetName
          }
        }
      }]
    }
  });
}

// Helper function to update sheet values (used for adding headers to a new sheet)
function updateSheetValues(sheetName, values) {
  return gapi.client.sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: `${sheetName}!A1`,
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: values
    }
  });
}

// Helper function to append values to the sheet
function appendValues(sheetName, listOfDict) {
  // Convert array of objects to array of arrays for Google Sheets API
  const values = listOfDict.map(dict => Object.values(dict));
  
  return gapi.client.sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${sheetName}!A1`,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      values: values
    }
  });
}

// Example function to be called on button click
function handleUploadButtonClick() {
  // Example data - replace with your actual data
  const exampleData = [
    [{ id: 1, name: 'Product 1', price: 100 }],
    [{ id: 2, name: 'Product 2', price: 200 }]
  ];
  
  const category = document.getElementById('categoryInput').value || 'default';
  const isPrime = document.getElementById('isPrimeCheckbox').checked ? 'true' : 'false';
  
  // Show loading state
  document.getElementById('uploadStatus').textContent = 'Uploading...';
  
  // Handle authorization and upload
  handleAuthClick(exampleData, category, isPrime);
}