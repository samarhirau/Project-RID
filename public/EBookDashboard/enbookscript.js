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

const books = [
    {
        title: "Machine Learning Book by CSE Department, NIIST",
        author: "Shaun Dave",
        publishYear: 1999,
        description: "Machine Learning by Vaibhav Patel, Anurag Shrivastava, Santosh Nagar, and Nitesh Gupta offers a comprehensive guide to core concepts, algorithms, and practical applications. Aligned with RGPV VI Semester CS 601, it includes real-world examples, hands-on exercises, and clear explanations, making it ideal for students and professionals seeking in-depth understanding.",
        coverImage: "./ebook assets/cover book images/ML-12x18-1-scaled.jpg",
        ebookLink: "path/to/ebook",
        pdfLink: "./ebook-assets/pdf/ML.pdf"

    },
    {
        title: "Developing a Hacker's Mindset",
        author: "Steven Levy",
        publishYear: 1999,
        description: "Hackers by Steven Levy is a captivating exploration of the hacker culture, tracing its origins and impact on modern computing.",
        coverImage: "https://m.media-amazon.com/images/I/51oTTzbiVIL.jpg ",
        ebookLink: "path/to/ebook2",
        pdfLink: "path/to/pdf2"
    },
];

document.addEventListener("DOMContentLoaded", function () {
    const viewEbookButton = document.querySelector('.viewEbook');
    const downloadPdfButton = document.querySelector('.downloadPdf');
    
    const book = books[0];

    viewEbookButton.addEventListener('click', function () {
        window.open(book.ebookLink, '_blank');
    });

    downloadPdfButton.addEventListener('click', function () {
        window.location.href = book.pdfLink;
    });

    previewButton.addEventListener('click', function () {
        
        window.open(book.ebookLink, '_blank');
    });
});




document.querySelectorAll('.star').forEach((star) => {
    star.addEventListener('click', () => {
      star.classList.toggle('selected');
    });
  });
