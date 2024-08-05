var notImpContent = document.getElementById("notImp");
var borderRem = document.getElementById("borderRem");
var headerBTN = document.getElementById("headerBTN");

function btnClose(){
    borderRem.style.display = "none";  
}
function btnOpen(){
    borderRem.style.display = "flex";  
}

function headerhide() {
    headerBTN.innerHTML = "check_box_outline_blank";
    notImpContent.style.display = "block";
    borderRem.style.borderTop = "1px solid #ddd";  
}
function headershow() {
    headerBTN.innerHTML = "check_box";
    notImpContent.style.display = "none";
    borderRem.style.border = "none";
    borderRem.style.padding = "16px 0"; 
}

function awakeAction(){
    if (headerBTN.innerHTML === "check_box"){
        headerhide();
    }else{
        headershow();
    }
}