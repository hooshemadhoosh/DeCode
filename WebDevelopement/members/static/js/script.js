// ----------> Show Mobile Menu
const showMenuBtn = document.querySelector('.menu-mobile__btn--show')
const closeMenuBtn = document.querySelector('.menu-mobile__btn--close')
const menuMobileElem = document.querySelector('.menu-mobile__side')
const blackOverlay = document.querySelector('.black-overlay')

showMenuBtn.addEventListener('click' , () => {
    menuMobileElem.classList.add('menu-mobile__side--shown')
    blackOverlay.classList.add('black-overlay--shown')
})

function closeMenu() {
    menuMobileElem.classList.remove('menu-mobile__side--shown')
    blackOverlay.classList.remove('black-overlay--shown')
}

closeMenuBtn.addEventListener('click' , () => {
    closeMenu()
})

blackOverlay.addEventListener('click' , () => {
    closeMenu()
})

// ----------> Email Validation
const formElem = document.getElementById('formOrder')
const orderErrModal = document.querySelector('.order__err-modal')
const orderSuccessModal = document.querySelector('.order__success-modal')
const fileInput = document.getElementById('fileInput')
const nameInput = document.getElementById('nameInput')
const subjectInput = document.getElementById('subjectInput')
const emailInput = document.getElementById('emailInput')
const briefInput = document.getElementById('briefInput')

let emialValidated = false
emailInput.addEventListener('keyup' , () => {
    let emialValue = emailInput.value

    if(!emialValue.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
        emailInput.classList.add('order__texts-subject-input-err')
    } else {
        emailInput.classList.remove('order__texts-subject-input-err')
        emialValidated = true
    }
    if (emialValue == '') {
        emailInput.classList.remove('order__texts-subject-input-err')
    }
})

formElem.addEventListener('submit' , (e) => {
    if(emialValidated && nameInput.value && subjectInput.value && emailInput.value && briefInput.value) {
        orderSuccessModal.classList.add('order__success-modal--shown')
    } else {
        e.preventDefault()
        orderErrModal.classList.add('order__err-modal--shown')
        setTimeout(() => {
            orderErrModal.classList.remove('order__err-modal--shown')
        }, 3000);
    }
})

// Super mario animations
let superMarioImage = document.querySelector('.super-mario-image')
const templatesRightImages = document.querySelector('.templates__bottom-right-images')
const whoareweRightImages = document.querySelector('.whoarewe__bottom-right-images')
const orderBottomImages = document.querySelector('.order__bottom-images')

setTimeout(() => {
    superMarioImage.remove()
    templatesRightImages.insertAdjacentHTML('afterbegin' , `
        <div class="super-mario-image super-mario-image-reverse super-mario--animation-walking2"></div>
    `)
    superMarioImage = document.querySelector('.super-mario-image')
}, 6500);

setTimeout(() => {
    superMarioImage.remove()
    whoareweRightImages.insertAdjacentHTML('afterbegin' , `
        <div class="super-mario-image super-mario-image-reverse super-mario--animation-walking2"></div>
    `)
    superMarioImage = document.querySelector('.super-mario-image')
}, 13000);

setTimeout(() => {
    superMarioImage.remove()
    orderBottomImages.insertAdjacentHTML('afterbegin' , `
        <div class="super-mario-image super-mario--animation-walking3"></div>
    `)
}, 19500);

// Swiper Initialization
const swiper = new Swiper('.swiper', {
    // Parameters
    loop: true,

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
});