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
    document.getElementById('allAdmins'). style.display ='none'

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
    document.getElementById('allAdmins'). style.display ='none'
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
  }+

  // Wait until th DOM is fully loaded
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






  


     

