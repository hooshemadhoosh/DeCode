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
let emialValidated = false
const orderEmail = document.getElementById('orderEmail')
const formElem = document.querySelector('.order__texts')
const orderErrModal = document.querySelector('.order__err-modal')
const orderSuccessModal = document.querySelector('.order__success-modal')

orderEmail.addEventListener('keyup' , () => {
    let emialValue = orderEmail.value

    if(!emialValue.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
        orderEmail.classList.add('order__texts-subject-input-err')
    } else {
        orderEmail.classList.remove('order__texts-subject-input-err')
        emialValidated = true
    }
    if (emialValue == '') {
        orderEmail.classList.remove('order__texts-subject-input-err')
    }
})

formElem.addEventListener('submit' , (e) => {
    if(!emialValidated) {
        e.preventDefault()
        orderErrModal.classList.add('order__err-modal--shown')
        setTimeout(() => {
            orderErrModal.classList.remove('order__err-modal--shown')
        }, 3000);
    } else {
        orderSuccessModal.classList.add('order__success-modal--shown')
        setTimeout(() => {
            orderSuccessModal.classList.remove('order__success-modal--shown')
        }, 3000);
    }
})


// ----------> Super Mario Animations
let superMarioImage = document.querySelector('.super-mario-image')

// Header Elements
const headerElem = document.querySelector('.header')
const headerLeftElem = document.querySelector('.header__bottom-left-images')

// Templates Elements
const templatesElem = document.querySelector('.templates')
const templatesRightElem = document.querySelector('.templates__bottom-right-images')

window.addEventListener('scroll' , () => {

    // Execute promise
    // let documentScroll = window.scrollY
    // let heightShouldGo = headerElem.clientHeight
    // if(documentScroll < heightShouldGo) {
    //     walking(heightShouldGo, headerLeftElem, templatesRightElem, superMarioImage, '+')
    //     .then( (res) => {
    //         heightShouldGo += templatesElem.clientHeight
    //         walking(heightShouldGo, templatesRightElem, undefined, res, '-')
    //     })
    // } else {

    // }

})

function getStyle(el, styleProp) {
    var value, defaultView = (el.ownerDocument || document).defaultView;
    // W3C standard way:
    if (defaultView && defaultView.getComputedStyle) {
        // sanitize property name to css notation
        // (hypen separated words eg. font-Size)
        styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
        return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
    } else if (el.currentStyle) { // IE
        // sanitize property name to camelCase
        styleProp = styleProp.replace(/\-(\w)/g, function(str, letter) {
            return letter.toUpperCase();
        });
        value = el.currentStyle[styleProp];
        // convert other units to pixels on IE
        if (/^\d+(em|pt|%|ex)?$/i.test(value)) { 
            return (function(value) {
              var oldLeft = el.style.left, oldRsLeft = el.runtimeStyle.left;
              el.runtimeStyle.left = el.currentStyle.left;
              el.style.left = value || 0;
              value = el.style.pixelLeft + "px";
              el.style.left = oldLeft;
              el.runtimeStyle.left = oldRsLeft;
              return value;
            })(value);
        }
        return value;
    }
}

function walking(heightShouldGo, elemWalkingOn, elemJumpingOn, superMario, direction) {

    // Using promises to see when super mario should jump
    return new Promise(resolve => {
        let documentScroll = window.scrollY

        let superMarioPosition = Number(getStyle(superMario, 'left').slice(0, -2))

        heightShouldGo -=  elemWalkingOn.clientHeight

        let widthShouldGo = null

        if(superMarioPosition) {
            widthShouldGo = elemWalkingOn.clientWidth - superMarioPosition
        } else {
            widthShouldGo = elemWalkingOn.clientWidth
        }

        console.log(heightShouldGo, documentScroll);
    
        let widthHeightRatio = widthShouldGo / heightShouldGo
    
        let widthGone = widthHeightRatio * documentScroll
    
        if (documentScroll < heightShouldGo) {
            superMario.style.transform = `translateX(${direction}${widthGone}px)`;
            new Promise((resolve) => {
                superMario.classList.add('super-mario--animation-walking')
                resolve()
            })
            .then(() => {
                setTimeout(() => {
                    superMario.classList.remove('super-mario--animation-walking')
                }, 1000);
            })
        } else {
            new Promise((resolve) => {
                superMario.classList.add('super-mario--animation-jumping')
                resolve()
            })
            .then(() => {
                setTimeout(() => {
                    superMario.remove()
                    elemJumpingOn.insertAdjacentHTML('afterbegin' , `<div class="super-mario-image super-mario-image-reverse"></div>`)
                    superMario = document.querySelector('.super-mario-image')
                    resolve(superMario)
                }, 1500);
            })
        }
    })
}

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