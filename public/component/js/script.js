












document.getElementById("profileButton").onclick = function() {
    document.getElementById("profileDrawer").style.width = "250px";
}

document.getElementById("closeDrawer").onclick = function() {
    document.getElementById("profileDrawer").style.width = "0";
}

// Optional: Close the drawer if user clicks outside of it
window.onclick = function(event) {
    if (event.target == document.getElementById("profileDrawer")) {
        document.getElementById("profileDrawer").style.width = "0";
    }
};



document.getElementById('logoutButton').addEventListener('click', function() {
    fetch('/logout', {
        method: 'POST',
        credentials: 'include'
    })
    .then(response => {
        if (response.ok) {
            window.location.href = '/'; // Redirect to home page after logout
        }
    })
    .catch(error => console.error('Error:', error));
});
   
         document.addEventListener("DOMContentLoaded", function() {
            // Function to handle login
            function handleLogin() {
                const loginData = {
                    email: 'user@example.com', // Replace with actual email input value
                    password: 'password123' // Replace with actual password input value
                };

                fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(loginData)
                })
                .then(response => response.json())
                .then(data => {
                    if (data.token) {
                        localStorage.setItem('token', data.token);
                        document.getElementById('userName').innerText = data.user.firstname;
                        // document.getElementById('profile-section').style.display = 'block';
                        console.log('Login successful:', data);
                    } else {
                        console.error('Login failed:', data);
                    }
                })
                .catch(error => {
                    console.error('Error logging in:', error);
                });
            }

            // Mock login event (replace with actual login logic)
            handleLogin();
          });



const para = document.getElementById('para-red');
          para.style.color = 'red';



          // -------------------------


         