
const navbarToggler = document.querySelector('.navbar-toggler')
const navbarPresto = document.querySelector('.navbar-presto')
let counters = document.querySelectorAll('.counter')




// EVENTO SU BUTTON NAVBAR
// effetto dropdown lingua
navbarToggler.addEventListener('click', () =>{
    navbarToggler.children[0].classList.toggle('fa-rotate-90')
})

// EVENTO NAVBAR TOP EXPANDE

document.addEventListener('scroll' , () =>{
    let windowHeight = window.innerHeight
    let scroll = window.pageYOffset

    if(scroll > windowHeight + 100){
        navbarPresto.classList.add('mx-0')
        navbarPresto.classList.add('px-5')
    }else{
        navbarPresto.classList.remove('mx-0')
        navbarPresto.classList.remove('px-0')
    }
})

// EVENTO COUNTER I NOSTRI NUMERI

counters.forEach(counter =>{
    let limit = counter.getAttribute('data-counter')
    let count = 0
    let time = 5000 / limit

    let interval = setInterval(() =>{
        if(count <= limit){
            counter.innerHTML = count;
            count ++
        }else{
            clearInterval(interval)
        }
    } , time)
})

// SWIPER.JS

const swiper = new Swiper('.swiper', {
    // Optional parameters
    // direction: 'vertical',
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,
    centeredSlides: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter : true,
      },

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints: {
        540: {
          slidesPerView: 2,
          spaceBetween: 50,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 50,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 50,
        },
      },
  });