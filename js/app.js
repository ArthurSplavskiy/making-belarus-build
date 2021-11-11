
/*
 * Replace all SVG images with inline SVG
 */
function svgInline(){
    const svgImages = document.querySelectorAll('img[src*="svg"]')

    for(let i = 0; i < svgImages.length; i++) {
      const img = svgImages[i]
      const imgClass = img.getAttribute('class')
      const imgID = img.getAttribute('id')
      const imgURL = img.getAttribute('src')

      fetch(imgURL)
        .then((response) => {
          return response;
        })
        .then((data) => {
          console.log(data.body.getReader());
      });
    }
    


    // $('img[src*="svg"]').not('.preloader__img').each(function () {
    //   let $img = $(this),
    //     imgID = $img.attr('id'),
    //     imgClass = $img.attr('class'),
    //     imgURL = $img.attr('src');
  
    //   $.get(imgURL, function (data) {
    //     // Get the SVG tag, ignore the rest
    //     let $svg = $(data).find('svg');
    //         if ($svg) {
    //             $svg.find('path').removeAttr('style');
    //             // Remove any invalid XML tags as per http://validator.w3.org
    //             $svg.removeAttr('id x y version xmlns xml:space xmlns:a');
    //             $svg.find("style").detach();
    //             // Add replaced image ID to the new SVG
    //             if (imgID !== undefined) $svg.attr('id', imgID);
    //             // Add replaced image classes to the new SVG
    //             if (imgClass !== undefined) $svg.attr('class', 'replaced__svg ' + imgClass);
    //             else $svg.attr('class', 'replaced__svg');
    //             // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
    //             /*if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
    //             $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
    //             }*/
    //             // Replace image with new SVG
    //             $img.replaceWith($svg);
    //         }
    //     }, 'xml');
    // });
}
//svgInline();

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

class HeroSection {
    constructor () {
        this.element = document.querySelector('.hero-section')
        this.heroComposition = this.element.querySelector('.hero-composition')

        this.timelineSection = document.querySelector('.timeline-section')

        this.heroFirstLines = this.heroComposition.querySelectorAll('.hero-composition__title')
        this.heroFirstDescriptions = this.heroComposition.querySelectorAll('.hero-composition__description')
        this.heroMap = this.heroComposition.querySelector('.hero-composition__map')

        this.init()
    }

    init () {
        this.timelineAnimation()
    }

    timelineAnimation() {
        this.timeline = gsap.timeline()

        ScrollTrigger.create({
            trigger: this.element,
            animation: this.timeline,

            start: "top top",
            end: '+=8000',

            pin: true,
            scrub: 1,
        });

        

        this.timeline.fromTo(this.heroFirstDescriptions, {
            autoAlpha: 1
        }, {
            duration: 1,
            autoAlpha: 0
        })

        this.timeline.to(this.heroFirstLines[0], {
            x: - (((window.innerWidth - (this.heroFirstLines[1].clientWidth / 2)) / 2) + (this.heroFirstLines[1].clientWidth /2 )),
            ease: Power1.easeIn,
            duration: 2
        }, '>')
        this.timeline.to(this.heroFirstLines[1], {
            x: ((window.innerWidth - this.heroFirstLines[1].clientWidth) / 2) + this.heroFirstLines[1].clientWidth,
            ease: Power1.easeIn,
            duration: 2
        }, '<')
        this.timeline.to(this.heroFirstLines[2], {
            x: - (((window.innerWidth - this.heroFirstLines[1].clientWidth) / 2) + this.heroFirstLines[1].clientWidth),
            ease: Power1.easeIn,
            duration: 2
        }, '<')

        this.timeline.fromTo(this.heroMap.children[0], {
            scale: 0,
            autoAlpha: 0.1
        }, {
            scale: 18,
            autoAlpha: 1,
            ease: Power4.easeIn,
            duration: 2.5
        }, '=-1.5')

        this.timeline.to(this.element, {
            y: - (window.innerHeight)
        })

        this.timeline.fromTo(this.timelineSection, {
            filter: 'brightness(0)'
        }, {
            filter: 'brightness(1)'
        }, '<')

    }
}
class TimelineSection {
    constructor () {
        this.element = document.querySelector('.timeline-section')
        this.elementWrapper = this.element.querySelector('.timeline-section__wrapper')
        this.elementScroll = this.element.querySelector('.scroll-container')

        this.init()
    }

    init () {
        this.scroll()
    }

    scroll () {
        this.scrollTimeline = gsap.timeline({ defaults: {ease: 'none'} })

        ScrollTrigger.create({
            trigger: this.elementWrapper,
            animation: this.scrollTimeline,

            start: "+=8000",
            end: '20000px 100%',

            markers: true,
            scrub: 1,
        });
        
        this.scrollTimeline.fromTo(this.elementScroll, {
            x: 0,
        }, {
            x: - (this.elementScroll.scrollWidth - window.innerWidth),
        })
        
        // this.scrollTimeline.call(_ => {
        //     console.log('end')
        // })

    }
}

class App {
    constructor () {
        this.addEventListeners()
        this.onResize()
    }

    init () {
        this.header = new Header()
        this.preloader = new Preloader()
        this.animation = new Animation()
        this.cursor = new Cursor()

        // SECTIONS
        this.heroSection = new HeroSection()
        this.timelineSection = new TimelineSection()
    }

    pageLoad () {
        
        // preloader cover
        const preloaderCoverTimeline = gsap.timeline()
        preloaderCoverTimeline.fromTo(this.preloader.preloaderCover, { autoAlpha: 1 }, { autoAlpha: 0 })
        preloaderCoverTimeline.call(_ => this.preloader.preloaderCover.remove())
    }

    contentDomLoad () {
        this.init()

        this.removeEventListeners()
    }

    onResize () {
    }

    addEventListeners () {
        window.addEventListener('load', this.pageLoad.bind(this))
        window.addEventListener('resize', this.onResize.bind(this))
        document.addEventListener('DOMContentLoaded', this.contentDomLoad.bind(this))
    }

    removeEventListeners () {
        window.removeEventListener('load', this.pageLoad.bind(this))
        document.removeEventListener('DOMContentLoaded', this.contentDomLoad.bind(this))
    }
}

new App()