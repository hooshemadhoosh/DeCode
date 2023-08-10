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
const orderUncompleteModal = document.querySelector('.order__uncomplete-modal')
const orderSendingModal = document.querySelector('.order__sending-modal')
const orderServerModal = document.querySelector('.order__servermessage-modal')
const fileInput = document.getElementById('fileInput')
const fileName = document.getElementById('fileName')
const nameInput = document.getElementById('nameInput')
const subjectInput = document.getElementById('subjectInput')
const emailInput = document.getElementById('emailInput')
const briefInput = document.getElementById('briefInput')


const csrf = document.getElementsByName('csrfmiddlewaretoken')
let imgData = null

fileInput.addEventListener('change' , () => {
    imgData = fileInput.files[0]
    fileName.innerHTML = imgData.name
    fileInput.previousElementSibling.classList.add('order__texts-left-file-input-label--attached')
})

let emialValidated = false
emailInput.addEventListener('keyup' , (e) => {
    let emialValue = emailInput.value

    if(emialValue.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
        emailInput.classList.remove('order__texts-subject-input-err')
        emialValidated = true
    } else {
        emialValidated = false
        emailInput.classList.add('order__texts-subject-input-err')
    }
    if (emialValue == '') {
        emailInput.classList.remove('order__texts-subject-input-err')
    }
})

formElem.addEventListener('submit' , (e) => {
    e.preventDefault()

    if(emialValidated && nameInput.value && subjectInput.value && emailInput.value && briefInput.value) {
        let fd = new FormData()
        fd.append('csrfmiddlewaretoken', csrf[0].value)
        fd.append('image', imgData)
        fd.append('bname', nameInput.value)
        fd.append('bsubject', subjectInput.value)
        fd.append('email', emailInput.value)
        fd.append('brief', briefInput.value)

        orderSendingModal.classList.add('order__sending-modal--shown')

        fetch(formElem.action , {
            method: 'POST',
            body: fd
        })
        .then(res => {
            orderSendingModal.classList.remove('order__sending-modal--shown')
            if(res.status == 200) {
                orderServerModal.innerHTML = 'Message Successfully Sent!'
                orderServerModal.classList.add('order__servermessage-modal--success')
                setTimeout(() => {
                    orderServerModal.classList.remove('order__servermessage-modal--success')
                }, 3000);
            } else {
                orderServerModal.innerHTML = 'Error While Sending Message!'
                orderServerModal.classList.add('order__servermessage-modal--error')
                setTimeout(() => {
                    orderServerModal.classList.remove('order__servermessage-modal--error')
                }, 3000);
            }
        })
        .catch(err => console.log(err))
    } else {
        orderUncompleteModal.classList.add('order__uncomplete-modal--shown')
        setTimeout(() => {
            orderUncompleteModal.classList.remove('order__uncomplete-modal--shown')
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