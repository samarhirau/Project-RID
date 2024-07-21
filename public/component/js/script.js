document.getElementById("profileButton").onclick = function() {
    // alert('Profile button clicked');
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



