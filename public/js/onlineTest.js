// Qiuz test


const startbtn = document.querySelector('.start-Btn');
const popupInfo = document.querySelector('.popup-info');
const closeBtn = document.querySelector('.cancel-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');

startbtn.addEventListener('click', () => {  
    // alert('Quiz Started');
    popupInfo.classList.add('active');
    main.classList.add('active');
}
);

closeBtn.addEventListener('click', () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}
);

continueBtn.addEventListener('click', () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
   
}
);