
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

class Observer {
    constructor (element, animationIn, animationOut, options = {}) {
        this.element = element
        this.animationIn = animationIn
        this.animationOut = animationOut
        this.options = options

        this.createObserver()
    }

    createObserver () {

        this.observer = new window.IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animationIn(entry.target)
                } else {
                    this.animationOut(entry.target)
                }
            })
        }, this.options)

        if(this.element instanceof NodeList) {
            this.element.forEach(el => {
                this.observer.observe(el)
            })
        } else {
            this.observer.observe(this.element)
        }
        
    }
    
}
class Split {
    constructor () {
        this.splitText = this.splitText
    }

    splitText (text, options = {}) {
        return new SplitText(text, options)
    }
}
class Animation {
    constructor () {
        this.animationTextIn = this.animationTextIn
        this.animationTextOut = this.animationTextOut
        // this.fadeIn = this.fadeIn
        // this.fadeOut = this.fadeOut
    }

    animationTextIn (text) {

        gsap.fromTo(text, {
            y: '100%',
            opacity: 0
        }, {
            duration: 1,
            ease: Power1.easeOut,
            stagger: 0.09,
            y: '0%',
            opacity: 1
        })
    }

    animationTextOut (text) {

        gsap.fromTo(text, {
            y: '0%',
            opacity: 1
        }, {
            duration: 1,
            ease: Power1.easeOut,
            stagger: 0.09,
            y: '100%',
            opacity: 0
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

        this.cards = this.pageMenu.querySelectorAll('.page-menu__card')
        this.cardsTitle = this.pageMenu.querySelectorAll('.page-menu__card-title')
        this.slider = this.pageMenu.querySelector('.page-menu__slider')

        this.split = new Split()

        // last
        this.init()
    }

    init () {

        this.splitCardsTitle()
        this.menu()
        this.menuSlider()
    }

    menuOpen(event) {
        const { target } = event
        
        if(target.closest('.burger') || target.classList.contains('burger')) {
            this.burger.classList.toggle('_active')
        }

        if(this.burger.classList.contains('_active')) { // menu open
            
            this.menuTimeline.play()
            
            this.menuTimeline.call(_ => {
                this.element.classList.add('menu-open')
            })

            this.addEventListeners()
        } else { // menu close

            this.closeMenu()
        }
    }

    menu () {
        this.burger = this.element.querySelector('.burger')

        this.menuTimeline = gsap.timeline()

        this.menuTimeline.to(this.pageMenu, {
            y: '0'
        })
        this.menuTimeline.to(this.slider, {
            duration: 0.5,
            autoAlpha: 1
        })
        this.menuTimeline.fromTo(this.titleLines.lines, {
            y: '100%',
            opacity: 0
        }, {
            duration: 1,
            ease: Power1.easeOut,
            stagger: 0.09,
            y: '0%',
            opacity: 1
        }, '-=0.5')
        this.menuTimeline.pause()

        gsap.set(this.pageMenu, { y: '-100%' })
        gsap.set(this.slider, { autoAlpha: 0 })

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

    splitCardsTitle () {
        this.titleLines = this.split.splitText(this.cardsTitle, {
            type: "lines",
            linesClass: "split-child"
        })
        this.split.splitText(this.cardsTitle, {
            type: "lines",
            linesClass: "split-parent"
        })
    }

    anchorsTransition (e) {
        //console.log(e.target)
        //gsap.to(window, {duration: 2, scrollTo:"#someID"});
        gsap.to(window, { duration: 2, scrollTo: {y: 60000} });

        this.closeMenu()
    }

    addEventListeners () {
        this.cards.forEach(card => {
            card.addEventListener('click', this.anchorsTransition.bind(this))
        })
    }

    removeEventListeners () {
        this.cards.forEach(card => {
            card.removeEventListener('click', this.anchorsTransition.bind(this))
        })
    }

    closeMenu () {
        this.burger.classList.remove('_active')
        this.menuTimeline.reverse()
        this.element.classList.remove('menu-open')
        this.removeEventListeners()
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
        

        this.close()
        this.slider()
        this.timer()
    }

    slider () {
        this.sliderEl = this.element.querySelector('.preloader__slider')
        const slides = this.sliderEl.querySelectorAll('.preloader__slide')
        const delay = 4000
        const steps = slides.length
        let round = 0

        this.lastSlideTimeline = gsap.timeline({ defaults: { stagger: 0.1} })
        gsap.set(this.closeTitleLines.lines, {
            y: '100%',
            opacity: 0
        })
        this.lastSlideTimeline.to(this.closeTitleLines.lines, {
            y: '10%',
            opacity: 1
        })
        this.lastSlideTimeline.pause()

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
                this.lastSlideTimeline.play()
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

        this.closeTitleLines = this.split.splitText(closeTitle, { type: "lines,words" })

        gsap.set(this.element, { transformOrigin: '100% 100%' })

        this.timelineClose = gsap.timeline()

        const clickHandler = () => {
            this.lastSlideTimeline.reverse()

            this.timelineClose.to(this.element, {
                yPercent: -100
            }, '+=1')

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

        this.pinSpacer = this.element.parentElement

        this.timelineSection = document.querySelector('.timeline-section')

        this.heroFirstLines = this.heroComposition.querySelectorAll('.hero-composition__title')
        this.heroFirstDescriptions = this.heroComposition.querySelectorAll('.hero-composition__description')
        this.heroMap = this.heroComposition.querySelector('.hero-composition__map')

        this.init()
    }

    init () {
        this.timelineAnimation()
        this.normalize()
    }

    timelineAnimation() {
        this.timeline = gsap.timeline()

        ScrollTrigger.create({
            trigger: this.element,
            animation: this.timeline,
            start: "top top",
            end: () => this.element.offsetHeight * 10, // '+=8000' 
            pin: true,
            pinSpacing: "margin",
            scrub: 1
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
            duration: 2,
            y: - (window.innerHeight)
        })

        this.timeline.fromTo(this.timelineSection, {
            filter: 'brightness(0)'
        }, {
            filter: 'brightness(1)'
        }, '<')

        this.pinSpacer = this.element.parentElement
        let pinSpacerZindex = this.pinSpacer.style.zIndex

        this.timeline.to('.pin-spacer', {
            duration: 0,
            zIndex: pinSpacerZindex
        })

        this.timeline.call(_ => {
            this.pinSpacer.style.zIndex = -1;
        })

    }

    normalize () {
        //console.log(this.element.offsetHeight * 10 + 'px!important')
        this.pinSpacer.style.height = this.element.offsetHeight * 10 + 'px!important'
    }

}
class TimelineSection {
    constructor () {
        this.element = document.querySelector('.timeline-section')
        this.elementWrapper = this.element.querySelector('.timeline-section__wrapper')
        this.elementScroll = this.element.querySelector('.scroll-container')
        this.elementScrollBg = this.element.querySelector('.scroll-container__bg')
        this.images = this.element.querySelectorAll('.parallax-item__img')
        this.text = this.element.querySelectorAll('.parallax-item_text p')
        
        this.split = new Split()

        this.init()
    }

    init () {
        this.scroll()
        this.Animation()
        //this.textSplit()
    }

    scroll () {

        ScrollTrigger.matchMedia({

            "(max-width: 768px)": function() {
                const timeline = gsap.timeline({ defaults: {ease: 'none'} })
                const rootElement = document.querySelector('.timeline-section')

                ScrollTrigger.create({
                    trigger: rootElement,
                    animation: timeline,
                    start: self => self.previous().end, // "+=8000"
                    end: '30000px 100%',
                    pin: true, // add
                    scrub: 1,
                });

                timeline.to(rootElement, {
                    duration: 0.1,
                    y: - (rootElement.scrollHeight + 100)
                })
            },

            "(min-width: 769px)": function() {
                const timeline = gsap.timeline({ defaults: {ease: 'none'} })
                const rootElement = document.querySelector('.timeline-section')
                const scrollWrapper = document.querySelector('.timeline-section__wrapper')
                const scrollContainer = document.querySelector('.scroll-container')
                const scrollContainerBG = document.querySelector('.scroll-container__bg')

                const historySection = document.querySelector('.history-section')

                //console.log(30000 - rootElement.offsetHeight + "px 100%")

                ScrollTrigger.create({
                    trigger: rootElement,
                    animation: timeline,
                    start: self => self.previous().end,//"+=8000",
                    end: '30000px 100%',
                    pin: true, // add
                    pinSpacing: "margin",
                    scrub: 1
                });
                
                timeline.fromTo(scrollContainer, {
                    x: 0,
                }, {
                    x: - (scrollContainer.scrollWidth - window.innerWidth),
                })
        
                timeline.fromTo(scrollContainerBG, {
                    xPercent: 0,
                    ease: Power3.easeIn,
                }, {
                    xPercent: 20,
                }, '<')

                timeline.to(rootElement, {
                    duration: 0.1,
                    yPercent: -100
                })

                timeline.fromTo(historySection, {
                    duration: 0.05,
                    filter: 'brightness(0)'
                }, {
                    duration: 0.05,
                    filter: 'brightness(1)'
                }, '<')

            }

        })
       
        
        // tim.call(_ => {
        //     console.log('end')
        // })

    }

    Animation () {
        this.observer = new Observer(this.images, this.imageAnimationIn, this.imageAnimationOut)
        this.observerText = new Observer(this.text, this.textAnimationIn, this.textAnimationOut)
    }

    imageAnimationIn (el) {
        if(!el.classList.contains('_reveal')) {
            el.classList.add('_reveal')
        }
    }

    imageAnimationOut (el) {
        el.classList.remove('_reveal')
    }

    textSplit () {
    
        const animationLines = this.split.splitText(this.text, {
            type: "lines",
            linesClass: "split-child"
        });
        this.split.splitText(this.text, {
            linesClass: "split-parent"
        });

        // stagger
        this.text.forEach((textBox, index) => {
            const list = textBox.querySelectorAll('.split-parent')

            list.forEach((el, idx) => {
                const listChilds = el.querySelectorAll('.split-child')

                listChilds.forEach(line => {
                    if(idx > 0) {
                        let animationTime = idx

                        if(animationTime < 10) {
                            line.style.transitionDelay = `0.${animationTime}s`
                        } else {
                            line.style.transitionDelay = `${animationTime}s`
                        }
                        //console.log(animationTime)
                    }
                })

            })
        })

    }

    textAnimationIn (el) {
        if(!el.classList.contains('is-view')) {
            el.classList.add('is-view')
        }
    }

    textAnimationOut (el) {
        el.classList.remove('is-view')
    }

}
class HistorySection {
    constructor () {
        this.element = document.querySelector('.history-section')

        this.toLeftLine = this.element.querySelectorAll('.line-container:nth-child(odd) .line')
        this.toRightLine = this.element.querySelectorAll('.line-container:nth-child(even) .line')

        this.toStrokeStar = this.element.querySelectorAll('.line .stroke img')
        this.toFillStar = this.element.querySelectorAll('.line .fill img')

        this.moveBg = this.element.querySelector('.move-bg')

        this.content = this.element.querySelector('.content')
        this.textItems = this.content.querySelectorAll('.text-item')

        this.init()
    }

    init () {

        this.scroll()
    }

    scroll() {
        this.timeline = gsap.timeline({ defaults: {ease: 'none' } })

        //console.log(50000 - this.element.offsetHeight + "px 100%")

        ScrollTrigger.create({
            trigger: this.element,
            animation: this.timeline,

            start: self => self.previous().end, //"+=29500", // 26100 
            end: '50000px 100%',
            pin: true,
            pinSpacing: "margin",

            scrub: 1,
            //onUpdate: self => console.log("progress:", self.progress)
        });

        gsap.set(this.toLeftLine, {
            xPercent: 10
        })

        gsap.set(this.toRightLine, {
            xPercent: -10
        })

        gsap.set(this.moveBg, {
            scale: 0.5
        })

        gsap.set(this.content, {
            yPercent: -200
        })

        gsap.set(this.textItems, {
            display: 'none',
            autoAlpha: 0,
        })

        this.timeline.to(this.toLeftLine, {
            duration: 7,
            xPercent: -100
        })

        this.timeline.to(this.toRightLine, {
            duration: 8,
            xPercent: 100
        }, '<')

        this.timeline.to(this.toFillStar, {
            duration: 5,
            rotate: '1000deg'
        }, '<')

        this.timeline.to(this.toStrokeStar, {
            duration: 3,
            rotate: '-1000deg'
        }, '<')

        this.timeline.to(this.moveBg, {
            duration: 2,
            yPercent: -100
        }, '-=7')

        this.timeline.to(this.moveBg, {
            duration: 5,
            scale: 1
        }, '-=5')

        this.timeline.fromTo(this.moveBg, {
            filter: 'brightness(1)'
        }, {
            filter: 'brightness(0.5)'
        })

        gsap.utils.toArray(this.textItems).forEach(item => {
            this.timeline.to(item, {
                display: 'block',
                duration: 1,
                autoAlpha: 1
            })
            this.timeline.to(item, {
                display: 'none',
                duration: 1,
                autoAlpha: 0
            })
        })

        this.timeline.to(this.element, {
            duration: 3,
            yPercent: -100
        })

        /*
            z-index
        */
        this.pinSpacer = this.element.parentElement
        let pinSpacerZindex = this.pinSpacer.style.zIndex
        this.timeline.to(this.pinSpacer, {
            duration: 0,
            zIndex: pinSpacerZindex
        })
        this.timeline.call(_ => {
            this.pinSpacer.style.zIndex = -1;
        })
        //

    }
}
class IncidentSection {
    constructor () {
        this.element = document.querySelector('.incident-section')
        this.scrollContainer = this.element.querySelector('.scroll-container')
        this.scrollContainerBG = this.element.querySelector('.incident-section__bg')

        this.cards = this.element.querySelectorAll('.incident-item')
        this.cardLine = this.element.querySelectorAll('.incident-item .line')
        this.cardDescr = this.element.querySelectorAll('.incident-item__descr')
        this.cardsHover = this.element.querySelectorAll('.incident-item__hover')

        this.scrollIndicator = document.querySelector('.scroll-indicator')

        this.split = new Split()

        this.init()
    }

    init () {
        //console.log(this.scrollContainerBG)

        this.scroll()
        this.onScreen()
        this.splitDescr()
        //this.hoverInitial()
        //this.addEventListeners()
    }

    scroll () {

        this.timeline = gsap.timeline({ defaults: {ease: 'none' } })

        ScrollTrigger.create({
            trigger: this.element,
            animation: this.timeline,
            start: self => self.previous().end,
            end: '55000px 100%',
            pin: true, 
            pinSpacing: "margin",
            scrub: 1
        });

        if(this.scrollContainer.scrollWidth > window.innerWidth) {
            this.timeline.fromTo(this.scrollContainer, {
                x: 0,
            }, {
                x: - (this.scrollContainer.scrollWidth - window.innerWidth),
            })
        }

        this.timeline.fromTo(this.scrollContainerBG, {
            xPercent: 0,
            ease: Power3.easeIn,
        }, {
            xPercent: -20,
        }, '<')

        this.timeline.to(this.element, {
            yPercent: -100
        })

        this.timeline.to(this.scrollIndicator, {
            autoAlpha: 0
        }, '<')

        /*
            z-index
        */
        this.pinSpacer = this.element.parentElement
        let pinSpacerZindex = this.pinSpacer.style.zIndex
        this.timeline.to(this.pinSpacer, {
            duration: 0,
            zIndex: pinSpacerZindex
        })
        this.timeline.call(_ => {
            this.pinSpacer.style.zIndex = -1;
        })
        
        //
        // timeline.fromTo(historySection, {
        //     duration: 0.05,
        //     filter: 'brightness(0)'
        // }, {
        //     duration: 0.05,
        //     filter: 'brightness(1)'
        // }, '<')

    }

    splitDescr() {
        this.splitDescription = this.split.splitText(this.cardDescr, { type: "lines" })
    }

    onScreen () {
        this.observerLine = new Observer(this.cardLine, this.cardAnimationIn, this.cardAnimationOut)
        this.observerDescr = new Observer(this.cardDescr, this.cardAnimationIn, this.cardAnimationOut)
    }

    cardAnimationIn (el) {
        if(!el.classList.contains('is-view')) {
            el.classList.add('is-view')
        }
    }

    cardAnimationOut (el) {
        el.classList.remove('is-view')
    }

}
class BlogSection {
    constructor () {
        this.element = document.querySelector('.blog-section')
        this.elementWrapper = document.querySelector('.blog-section__wrapper')
        this.scrollContainerBG = this.element.querySelector('.blog-section__bg')

        this.images = this.element.querySelectorAll('.blog-item img')
        this.descriptions = [...this.element.querySelectorAll('.media-column p'), ...this.element.querySelectorAll('.blog-item_bg .content p')]
        this.dots = this.element.querySelectorAll('.dots')

        this.header = document.querySelector('.header')

        this.footer = document.querySelector('.footer')
        this.footerLinks = this.footer.querySelectorAll('.social-link')

        this.split = new Split()
        this.animation = new Animation()

        this.init()
    }

    init () {

        this.scroll()
        this.onScreen()
        this.descrAnimation()
        this.footerLinksSplit()
    }

    scroll () {
        this.timeline = gsap.timeline({ defaults: {ease: 'none'} })

        ScrollTrigger.create({
            trigger: this.element,
            animation: this.timeline,
            start: self => self.previous().end,
            end: () => 60000 + this.element.scrollHeight + "px 100%", //'60000px 100%'
            pin: true, // add
            pinSpacing: "margin",
            scrub: 1,

            onEnter: () => {

                this.headerClassToggle()
            },
            onEnterBack: () => {
                this.footerClassToggle()
                this.elementClassToggle()

                this.headerClassToggle()
            },
            onLeave: () => {
                this.footerClassToggle()
                this.elementClassToggle()

                this.headerClassToggle()
            },
            onLeaveBack: () => {

                this.headerClassToggle()
            }
        });

        this.scrollerSecion = this.timeline.to(this.element, {
            y: - (this.element.scrollHeight) // - window.innerHeight
        })

        this.timeline.fromTo(this.scrollContainerBG, {
            yPercent: 0,
            ease: Power3.easeIn,
        }, {
            yPercent: 10,
        }, '<')

        /* 
          * z-index
        */
        this.pinSpacer = this.element.parentElement
        let pinSpacerZindex = this.pinSpacer.style.zIndex
        this.timeline.to(this.pinSpacer, {
            duration: 0,
            zIndex: pinSpacerZindex
        })
        this.timeline.call(_ => {
            this.pinSpacer.style.zIndex = -1;
        })

    }

    onScreen () {
        this.observerImages = new Observer(this.images, this.imgAnimationIn, this.imgAnimationOut, { threshold: 0.5 })
        this.observerDots = new Observer(this.dots, this.imgAnimationIn, this.imgAnimationOut, { threshold: 0.5 })
    }

    imgAnimationIn (el) {
        if(!el.classList.contains('is-view')) {
            el.classList.add('is-view')
        }
    }

    imgAnimationOut (el) {
        el.classList.remove('is-view')
    }

    descrAnimation() {

        this.split.splitText(this.descriptions, {
            type: "lines,words,chars",
            linesClass: "split-child"
        })
        this.split.splitText(this.descriptions, {
            linesClass: "split-parent"
        })

        this.observer = new window.IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animation.animationTextIn(entry.target.querySelectorAll('.split-child'))
                } else {
                    this.animation.animationTextOut(entry.target.querySelectorAll('.split-child'))
                }
            })
        }, { threshold: 1 })

        this.descriptions.forEach(el => {
            this.observer.observe(el)
        })

    }

    footerLinksSplit() {
        this.split.splitText(this.footerLinks, {
            type: "lines",
            linesClass: "split-child"
        })
        this.split.splitText(this.footerLinks, {
            type: "lines",
            linesClass: "split-parent"
        })
    }

    headerClassToggle () {
        if(!this.header.classList.contains('dark-theme')) {
            this.header.classList.add('dark-theme')
        } else {
            this.header.classList.remove('dark-theme')
        }
    }

    footerClassToggle () {
        if(!this.footer.classList.contains('is-view')) {
            this.footer.classList.add('is-view')
        } else {
            this.footer.classList.remove('is-view')
        }
    }

    elementClassToggle () {
        if(!this.element.classList.contains('leave')) {
            this.element.classList.add('leave')
        } else {
            this.element.classList.remove('leave')
        }
    }
    
}

class App {
    constructor () {
        this.addEventListeners()
        this.onResize()
    }

    init () {
        /*
          * Components
        */
        this.header = new Header()
        this.preloader = new Preloader()
        this.animation = new Animation()
        this.cursor = new Cursor()

        /*
          * Sections
        */
        this.heroSection = new HeroSection()
        this.timelineSection = new TimelineSection()
        this.historySection = new HistorySection()
        this.incidentSection = new IncidentSection()
        this.blogSection = new BlogSection()
    }

    pageLoad () {

        /*
          * Preloader cover
        */
        const preloaderCoverTimeline = gsap.timeline()
        preloaderCoverTimeline.fromTo(this.preloader.preloaderCover, { autoAlpha: 1 }, { autoAlpha: 0 })
        preloaderCoverTimeline.call(_ => this.preloader.preloaderCover.remove())
    }

    contentDomLoad () {
        this.init()

        this.removeEventListeners()
    }

    onResize () {
        ScrollTrigger.refresh()
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