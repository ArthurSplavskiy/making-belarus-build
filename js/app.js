class Split {
    constructor () {
        this.splitText = this.splitText
    }

    splitText (text, type = 'words,chars') {
        return new SplitText(text, { type: type })
    }
}
class Animation {
    constructor () {
        this.animationTextIn = this.animationTextIn
        this.animationTextOut = this.animationTextOut
    }

    animationTextIn (text) {

        gsap.fromTo(text, {
            y: '100%'
        }, {
            duration: 1,
            ease: Power1.easeOut,
            stagger: 0.09,
            y: '0%'
        })
    }

    animationTextOut (text) {

        gsap.fromTo(text, {
            y: '0%'
        }, {
            duration: 1,
            ease: Power1.easeOut,
            stagger: 0.09,
            y: '100%'
        })
    }

    fadeIn (el) {
        gsap.fromTo(el, {
            autoAlpha: 0
        }, {
            autoAlpha: 1
        })
    }

    fadeOut (el) {
        gsap.fromTo(el, {
            autoAlpha: 1
        }, {
            autoAlpha: 0
        })
    }

}

class Cursor {
    constructor() {
        this.element = document.querySelector('.c-cursor')
        this.cursorSlider = this.element.querySelector('.c-cursor__slider')

        this.cursorContainer = document.querySelector('.page-menu .swiper-wrapper')

        this.init()
    }

    initCursor (e) {
        let x = e.clientX;
        let y = e.clientY;
        this.element.style.left = x + 'px';
        this.element.style.top = y + 'px';

        if(this.element.classList.contains('above-slider')) {
            if(x < (window.innerWidth / 2)) {
                if(this.cursorSlider.classList.contains('right')) {
                    this.cursorSlider.classList.remove('right')
                }
            } else {
                if(!this.cursorSlider.classList.contains('right')) {
                    this.cursorSlider.classList.add('right')
                }
            }
        }
    }

    setCursorSwiper () {
        this.element.classList.add('above-slider')
    }

    removeCursorSwiper () {
        this.element.classList.remove('above-slider')
    }

    init () {
        document.addEventListener('mousemove', this.initCursor.bind(this));
        this.cursorContainer.addEventListener('mouseenter', this.setCursorSwiper.bind(this));
        this.cursorContainer.addEventListener('mouseleave', this.removeCursorSwiper.bind(this));
    }
}
class Header {
    constructor () {
        this.element = document.querySelector('.header')
        this.pageMenu = document.querySelector('.page-menu')

        // last
        this.init()
    }

    init () {
        this.menu()
        this.menuSlider()
    }

    menuOpen(event) {
        const { target } = event
        
        if(target.closest('.burger') || target.classList.contains('burger')) {
            this.burger.classList.toggle('_active')
        }

        if(this.burger.classList.contains('_active')) { // menu open
            this.menuTimeline.to(this.pageMenu, {
                y: '0'
            })

            this.menuTimeline.call(_ => {
                this.element.classList.add('menu-open')
            })
        } else { // menu close
            this.element.classList.remove('menu-open')
            
            this.menuTimeline.to(this.pageMenu, {
                y: '-100%'
            })
        }
    }

    menu () {
        this.burger = this.element.querySelector('.burger')

        this.menuTimeline = gsap.timeline()
        gsap.set(this.pageMenu, { y: '-100%' })

        this.burger.onclick = event => this.menuOpen(event)
    }

    menuSlider () {
        this.menuSlider = this.element.querySelector('.swiper')

        const swiper = new Swiper('.swiper', {
            init: true,
            slidesPerView: 4,
            spaceBetween: 40,
            grabCursor: true,

            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            },

            scrollbar: {
              el: '.swiper-scrollbar',
              draggable: true
            },

            breakpoints: {
                320: {
                  slidesPerView: 3,
                  spaceBetween: 20
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 40
                }
            }
        })

        swiper.on('resize', () => {
            if(window.innerWidth <= 520) {
                swiper.disable()
            } else {
                swiper.enable()
            }
        })
        
    }
}
class Preloader {
    constructor () {
        this.element = document.querySelector('.preloader')
        this.elementBg = this.element.querySelector('.preloader__bg')
        this.preloaderCover = document.querySelector('.preloader-cover')

        this.split = new Split()
        this.animation = new Animation()

        // last
        this.init()
    }

    init () {
        
        this.slider()
        this.timer()
        this.close()
    }

    slider () {
        this.sliderEl = this.element.querySelector('.preloader__slider')
        const slides = this.sliderEl.querySelectorAll('.preloader__slide')
        const delay = 4000
        const steps = slides.length
        let round = 0

        const slideChange = () => {
            round++

            slides.forEach((slide, index) => {
                if(index < 2) {
                    slide.classList.remove('_active')
                }
            })
            const slide = slides[round]

            if(slide) {
                slide.classList.add('_active')
            }

            if(round === steps) {
                clearInterval(interval)
            }

            if(round === 1) {
                this.animation.animationTextIn(this.splitDateText.chars)
            }
            if(round === 2) {
                gsap.fromTo(this.closeTitleLines.words, {
                    y: '100%'
                }, {
                    y: '10%'
                })
            }
        }

        let interval = setInterval(slideChange, delay)
    }

    timer () {
        const timer = this.element.querySelector('.timer')
        const timerYearField = timer.querySelector('[data-independence-year] span')
        const timerMonthField = timer.querySelector('[data-independence-month] span')
        const timerDayField = timer.querySelector('[data-independence-day] span')

        const nowDate = new Date()
        const nowDateYear = nowDate.getFullYear()
        const nowDateMonth = nowDate.getMonth()
        const nowDateDay = nowDate.getUTCDate()

        const independenceYear = 1991
        const independenceMonth = 7
        const independenceDay = 25

        let outYear
        let outDay
        let outMonth

        if(nowDateMonth < independenceMonth) {
            outYear = Math.abs((nowDateYear - independenceYear) - 1)
        } else {
            outYear = Math.abs(nowDateYear - independenceYear)
        }
        if(nowDateDay < independenceDay) {
            outMonth = Math.abs((nowDateMonth - independenceMonth) - 1)
            outDay = Math.abs(nowDateDay + 6)
        } else {
            outDay = Math.abs(nowDateDay - independenceDay)
        }

        const setZero = (num) => {
            return num < 10 ? `0${num}` : num
        }

        timerYearField.innerHTML = setZero(outYear)
        timerMonthField.innerHTML = setZero(outMonth)
        timerDayField.innerHTML = setZero(outDay)

        const splitArray = [timerYearField, timerMonthField, timerDayField]
        this.splitDateText = this.split.splitText(splitArray)
    }

    close () {
        const closeSlide = this.element.querySelector('.preloader__slide:last-child')
        const closeTitle = closeSlide.querySelector('.preloader__title')
        const closeButton = closeSlide.querySelector('.preloader__button')

        this.closeTitleLines = this.split.splitText(closeTitle, "lines,words")

        gsap.set(this.element, { transformOrigin: '100% 100%' })

        this.timelineClose = gsap.timeline(this.element)

        const clickHandler = () => {
            const opacityItems = [this.elementBg, this.sliderEl]
            gsap.fromTo(opacityItems, {
                autoAlpha: '1'
            }, {
                autoAlpha: '0'
            })

            gsap.fromTo(this.closeTitleLines.words, {
                y: '0%'
            }, {
                duration: 1,
                ease: Power1.easeOut,
                y: '100%'
            })

            this.timelineClose.to(this.element, {
                scaleY: '0'
            }, '+=0.7')

            this.timelineClose.call(_ => {
                this.element.remove()
            })
        }

        closeButton.onclick = clickHandler
    }
}

class App {
    constructor () {
        this.init()
        this.addEventListeners()
    }

    init () {
        this.header = new Header()
        this.preloader = new Preloader()
        this.animation = new Animation()
        this.cursor = new Cursor()
    }

    pageLoad () {
        
        // preloader cover
        const preloaderCoverTimeline = gsap.timeline()
        preloaderCoverTimeline.fromTo(this.preloader.preloaderCover, { autoAlpha: 1 }, { autoAlpha: 0 })
        preloaderCoverTimeline.call(_ => this.preloader.preloaderCover.remove())

        this.removeEventListeners()
    }

    addEventListeners () {
        window.addEventListener('load', this.pageLoad.bind(this))
    }

    removeEventListeners () {
        window.removeEventListener('load', this.pageLoad.bind(this))
    }
}

new App()