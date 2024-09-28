menuIcon.addEventListener('click', function() {
  console.log("Menu icon clicked"); // Debugging line
  sideBar.classList.toggle('show-sidebar');
});


// Example usage
document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('certificateId', document.getElementById('certificateId').value);
  formData.append('internName', document.getElementById('internName').value);
  formData.append('issueDate', document.getElementById('issueDate').value);
  formData.append('description', document.getElementById('description').value);
  formData.append('certificate', document.getElementById('certificateFile').files[0]);

  try {
    const response = await fetch('/admin/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    if (response.ok) {
      showToast(result.message, 'success');
    } else {
      showToast(result.message || 'Failed to upload certificate', 'error');
    }
  } catch (error) {
    showToast('Failed to upload certificate', 'error');
  }
});



  function uploadcertificate(){
    document.getElementById('mainArea1').style.display = 'flex';
    document.getElementById('mainArea').style.display = 'none';
    document.getElementById('dashboardbtn').style.backgroundColor = 'white';
    document.getElementById('dashboardbtn').style.color = 'black';
     document.getElementById('uploadCerti').className = 'active';
    document.getElementById('table-list').style.display = 'none';
    document.getElementById('changeRole').style.display = 'none';
    if (window.innerWidth <= 768) {
      const sidebar = document.getElementById('sidebar');
      sidebar.style.display = 'none'; 
  }
  }

  // function showTotalList() {
  //   document.getElementById('mainArea').style.display = 'none';
  //   document.getElementById('table-list').style.display = 'initial';
  //   document.getElementById('mainArea1').style.display = 'none';
  //   document.getElementById('showTotal').className = 'active';
  //   document.getElementById('dashboardbtn').style.backgroundColor = 'white';
  //   document.getElementById('dashboardbtn').style.color = 'black';
  //   document.getElementById('changeRole').style.display = 'none';
  //   document.getElementById('allAdmins').style.display = 'none';
  //   document.getElementById('sidebar').style.display = 'none';


  // }

//   function showTotalList() {
//     document.getElementById('mainArea').style.display = 'none';
//     document.getElementById('table-list').style.display = 'initial';
//     document.getElementById('mainArea1').style.display = 'none';
//     document.getElementById('showTotal').className = 'active';
//     document.getElementById('dashboardbtn').style.backgroundColor = 'white';
//     document.getElementById('dashboardbtn').style.color = 'black';
//     document.getElementById('changeRole').style.display = 'none';
//     document.getElementById('allAdmins').style.display = 'none';
    
//     // Hide the sidebar by adding a class
//     const sidebar = document.getElementById('sidebar');
//     sidebar.style.display = 'none'; // Set display to 'none' when showTotalList is called
// }
function showTotalList() {
  document.getElementById('mainArea').style.display = 'none';
  document.getElementById('table-list').style.display = 'initial';
  document.getElementById('mainArea1').style.display = 'none';
  document.getElementById('showTotal').className = 'active';
  document.getElementById('dashboardbtn').style.backgroundColor = 'white';
  document.getElementById('dashboardbtn').style.color = 'black';
  document.getElementById('changeRole').style.display = 'none';
  document.getElementById('allAdmins').style.display = 'none';

  if (window.innerWidth <= 768) {
      const sidebar = document.getElementById('sidebar');
      sidebar.style.display = 'none'; 
  }
}




  function showChangeRole() {
    document.getElementById('mainArea').style.display = 'none';
    document.getElementById('changeRole').style.display = 'initial';
    document.getElementById('mainArea1').style.display = 'none';
    document.getElementById('showTotal').className = 'active';
    document.getElementById('dashboardbtn').style.backgroundColor = 'white';
    document.getElementById('dashboardbtn').style.color = 'black';
    document.getElementById('table-list').style.display = 'none';
    if (window.innerWidth <= 768) {
      const sidebar = document.getElementById('sidebar');
      sidebar.style.display = 'none'; 
  }
  }
  function showAdminList() {
    document.getElementById('mainArea').style.display = 'none';
    document.getElementById('allAdmins').style.display = 'initial';
    document.getElementById('mainArea1').style.display = 'none';
    document.getElementById('showTotal').className = 'active';
    document.getElementById('dashboardbtn').style.backgroundColor = 'white';
    document.getElementById('dashboardbtn').style.color = 'black';
    document.getElementById('table-list').style.display = 'none';
    document.getElementById('changeRole').style.display = 'none';
    if (window.innerWidth <= 768) {
      const sidebar = document.getElementById('sidebar');
      sidebar.style.display = 'none'; 
  }
  }

  // Wait until the DOM is fully loaded
// document.addEventListener('DOMContentLoaded', (event) => {
//   // Get the dashboard button by its ID
//   const dashboardBtn = document.getElementById('dashboardbtn');
  
//   // Add a click event listener to the button
//   dashboardBtn.addEventListener('click', () => {
//       // Redirect to the home page
//       window.location.href = 'admin.html'; // Adjust the URL as needed
//   });
// });



  // Wait until the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', (event) => {
    // Get the dashboard button by its ID
    const dashboardBtn = document.getElementById('dashboardbtn');
    
    // Add a click event listener to the button
    dashboardBtn.addEventListener('click', () => {
      // Reload the current page
      window.location.reload();
    });
  });









  document.addEventListener('DOMContentLoaded', () => {
    const dropArea = document.getElementById('dropArea');
    const fileInput = document.getElementById('certificateFile');

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dropArea.addEventListener(eventName, preventDefaults, false);
    });

    // Highlight drop area when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
      dropArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropArea.addEventListener(eventName, unhighlight, false);
    });

    // Handle dropped files
    dropArea.addEventListener('drop', handleDrop, false);

    // Handle click to open file input dialog
    dropArea.addEventListener('click', () => fileInput.click());

    // Handle file input change
    fileInput.addEventListener('change', handleFiles, false);

    function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    }

    function highlight(e) {
      dropArea.classList.add('dragover');
    }

    function unhighlight(e) {
      dropArea.classList.remove('dragover');
    }

    function handleDrop(e) {
      const dt = e.dataTransfer;
      const files = dt.files;
      fileInput.files = files; // Assign files to file input
      handleFiles({ target: { files } });
    }

    function handleFiles(e) {
      const files = e.target.files;
      if (files.length > 0) {
        const filename = files[0].name;
        dropArea.innerHTML = `<p>File uploaded: ${filename}</p>`;
      }
    }
  });



  document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('certificateId', document.getElementById('certificateId').value);
    formData.append('internName', document.getElementById('internName').value);
    formData.append('issueDate', document.getElementById('issueDate').value);
    formData.append('description', document.getElementById('description').value);
    formData.append('certificate', document.getElementById('certificateFile').files[0]);

    try {
      const response = await fetch('/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        showToast(result.message);
      } else {
        showToast(result.message || 'Failed to upload certificate', '#f44336');
      }
    } catch (error) {
      showToast('Failed to upload certificate', '#f44336');
    }
  });


  async function fetchRegistrationsCount() {
    try {
      const response = await fetch('/admin/registrations/count');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      document.getElementById('registrations-count').textContent = ` ${data.count}`;
    } catch (error) {
      document.getElementById('registrations-count').textContent = 'Failed to load number of registrations';
      showToast('Error fetching registrations count', '#f44336');
      console.error('Error fetching registrations count:', error);
    }
  }

  fetchRegistrationsCount();



// logout js
    
// document.getElementById('logOut-btn').addEventListener('click', function() {
// // const confirmation = confirm('Are you sure you want to log out?');
// // if (confirmation) {
// //   sessionStorage.removeItem('loggedIn');
// //   window.location.href = '/'; // Adjust the URL to match your logout route
// // }
// // });


//  const confirmation = confirm('Are you sure you want to log out?');
// if (confirmation) {
//   fetch("/logout", {
//     method: "GET",
//     credentials: "include", // Include cookies in the request
//   })
//   .then(response => response.json())
//   .then(data=>{
//     if(data.message === "success"){
//       sessionStorage.removeItem('loggedIn');
//       window.location.href = '/'; // Adjust the URL to match your logout route
//     }
  
//   })
//   .catch(error=>{
//     console.error('logout error:',error)
//   })
// }
// });



document.getElementById('logout-btn').addEventListener('click', function() {
  const confirmation = confirm('Are you sure you want to log out?');
  
  if (confirmation) {
      // Only proceed with the logout request if the user confirms
      fetch("/auth/logout", {
          method: "GET",
          credentials: "include", // Include cookies in the request
      })
      .then(response => response.json())
      
          // if (data.message === "successfully signed out!") {
              localStorage.removeItem('token');
              window.location.href = '/'; // Adjust the URL to match your homepage
          
        
    
     
    }
    });
// document.getElementById('logout-btn').addEventListener('click',function(){
//   sessionStorage.removeItem('token');
//   window.location.href='/'
// });
  async function fetchRegistrationsCount() {
    try {
      const response = await fetch('/admin/registrations/count');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      document.getElementById('registrations-count').textContent = ` ${data.count}`;
    } catch (error) {
      document.getElementById('registrations-count').textContent = 'Failed to load number of registrations';
      showToast('Error fetching registrations count', '#f44336');
      console.error('Error fetching registrations count:', error);
    }
  }

  fetchRegistrationsCount();






  


     



// show all data in table

const fileInput = document.getElementById('fileInput');

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) {
      return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      // Assume we're working with the first sheet
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // Clear previous table data
      const tableHeaders = document.getElementById('table-headers');
      const tableBody = document.getElementById('data-table').querySelector('tbody');
      tableHeaders.innerHTML = '';
      tableBody.innerHTML = '';

      // Specify the columns you want to display
      const columnsToDisplay = ['Student name', 'Exam points']; // Update this list as needed

      // Find the indices of the columns to display
      const headerRow = jsonData[0];
      const indices = columnsToDisplay.map(column => {
          const index = headerRow.indexOf(column)
          if (index === -1) {
              alert(`Column "${column}" not found!`);
          }
          return index;
      }).filter(index => index !== -1);

      // Create table headers for selected columns
      indices.forEach(index => {
          const th = document.createElement('th');
          th.textContent = headerRow[index];
          tableHeaders.appendChild(th);
      });

      // Store data in an array of objects
      const dataObjects = [];

      // Add data rows for selected columns
      jsonData.slice(1).forEach(row => {
          const tr = document.createElement('tr');
          const dataObject = {};
          indices.forEach(index => {
              const td = document.createElement('td');
              td.textContent = row[index] !== undefined ? row[index] : ''; // Handle undefined cells
              tr.appendChild(td);
              
              // Add to data object
              dataObject[headerRow[index]] = row[index];
          });
          tableBody.appendChild(tr);
          dataObjects.push(dataObject);
      });

      // Output the data objects to console
      console.log('Data Objects:', dataObjects);
  };

  reader.readAsArrayBuffer(file);
});




