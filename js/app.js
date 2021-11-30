let unlock = true;

function body_lock(delay) {
	let body = document.querySelector("body");
	if (body.classList.contains('_lock')) {
		body_lock_remove(delay);
	} else {
		body_lock_add(delay);
	}
}
function body_lock_remove(delay, mod = '') {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			
			if (mod) {
				body.classList.remove(`${mod}-lock`);
				if (body.classList.contains('_lock')) {
					body.classList.remove("_lock");
				}
			} else {
				body.classList.remove("_lock");
			}

		}, delay);

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
function body_lock_add(delay, mod = '') {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

		if (mod) {
			body.classList.add(`${mod}-lock`);
		} else {
			body.classList.add("_lock");
		}

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}

body_lock(0)
gsap.to(window, { scrollTo: {y: 0} })

function testWebP(callback) { 
    var webP = new Image(); 
    webP.onload = webP.onerror = function () { 
        callback(webP.height == 2); 
    }; 
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA"; 
} 
testWebP(function (support) { 
    if (support == true) { 
        document.querySelector('body').classList.add('_webp'); 
    } else { 
        document.querySelector('body').classList.add('_no-webp'); 
    } 
});

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
class AsyncLoad {
    constructor (element) {
        this.element = element

        //this.createObserver()
    }

    createObserver () {
        this.observer = new window.IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!this.element.src) {
                        this.element.src = this.element.getAttribute('data-src')
                        this.element.onload = _ => {
                            this.element.classList.add('loaded')
                        }
                    }
                }
            })
        })

        this.observer.observe(this.element)
    }
}

class Cursor {
    constructor() {
        this.element = document.querySelector('.c-cursor')
        this.pageElement = document.querySelector('.page-cursor')
        this.cursorSlider = this.element.querySelector('.c-cursor__slider')

        this.cursorContainer = document.querySelector('.page-menu .swiper-wrapper')

        this.activeCursorLinks = document.querySelectorAll('._cursor-pointer')

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

    setCursorPointer () {
        this.cursorTimeline.play()
    }
    removeCursorPointer () {
        this.cursorTimeline.reverse()
    }

    init () {
        this.cursorTimeline = gsap.timeline()
        this.cursorTimeline.to(this.pageElement, {
            scale: 1.4,
            rotate: '225deg'
        })
        this.cursorTimeline.pause()

        document.addEventListener('mousemove', this.initCursor.bind(this));
        this.cursorContainer.addEventListener('mouseenter', this.setCursorSwiper.bind(this));
        this.cursorContainer.addEventListener('mouseleave', this.removeCursorSwiper.bind(this));

        this.activeCursorLinks.forEach(link => {
            link.addEventListener('mouseenter', this.setCursorPointer.bind(this));
            link.addEventListener('mouseleave', this.removeCursorPointer.bind(this));
        })
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
            body_lock_add(0, 'menu')
            
            this.menuTimeline.play()

            this.element.classList.add('menu-open')

            this.addEventListeners()
        } else { // menu close
            body_lock_remove(0, 'menu')

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

        const swiper = new Swiper('.swiper', {
            init: true,
            slidesPerView: 4,
            spaceBetween: 40,
            grabCursor: true,
            speed: 800,

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
        this.titleParentLines = this.split.splitText(this.cardsTitle, {
            type: "lines",
            linesClass: "split-parent"
        })
    }

    anchorsTransition (e) {
        const timelineSection = 8000
        const historySection = 30000
        const incidentSection = 50000
        const blogSection = 55000

        if(e.target.classList.contains('page-menu__card') || e.target.closest('.page-menu__card')) {
            const el = e.target.closest('.page-menu__card').dataset

            switch(el.link) {
                case 's-timeline': 
                    gsap.to(window, { duration: 1, scrollTo: {y: timelineSection} })
                    break;
                case 's-history': 
                    gsap.to(window, { duration: 1, scrollTo: {y: historySection} })
                    break;
                case 's-incident': 
                    gsap.to(window, { duration: 1, scrollTo: {y: incidentSection} })
                    break;
                case 's-blog': 
                    gsap.to(window, { duration: 1, scrollTo: {y: blogSection} })
                    break;
            }
        }

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
        body_lock_remove(0, 'menu')
    }

    onResize () {
        this.titleLines.revert()
        this.titleParentLines.revert()
    }

}
class Preloader {
    constructor (element) {
        this.element = element
        this.elementBg = this.element.querySelector('.preloader__bg')
        this.preloaderCover = document.querySelector('.preloader-cover')
        this.closeSlide = this.element.querySelector('.preloader__slide:last-child')
        this.closeTitle = this.closeSlide.querySelector('.preloader__title')
        this.closeButton = this.closeSlide.querySelector('.preloader__button')

        this.heroTitles = document.querySelectorAll('.hero-composition__title')
        this.heroDescriptions = document.querySelectorAll('.hero-composition__description')
        this.burger = document.querySelector('.burger')

        this.split = new Split()
        this.animation = new Animation()
    }

    init () {
        
        this.heroTitlesAnimation()
        this.close()
        this.slider()
        this.timer()
    }

    slider () {
        this.sliderEl = this.element.querySelector('.preloader__slider')
        const slides = this.sliderEl.querySelectorAll('.preloader__slide')

        this.lastSlideTimeline = gsap.timeline({ defaults: { stagger: 0.1, duration: 0.6 } })

        gsap.set(this.closeTitleLinesChild.lines, {
            y: '100%',
            opacity: 0
        })
        this.lastSlideTimeline.to(this.closeTitleLinesChild.lines, {
            y: '10%',
            opacity: 1
        })
        
        this.lastSlideTimeline.pause()

        slides[0].classList.add('_active')

        slides[0].style.cssText = `
            animation-name: animationEnd;
            animation-duration: 2s;
            animation-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
            animation-fill-mode: forwards;
            animation-delay: 6s;
        `

        slides[1].style.cssText = `
            animation-name: animationEndSecond;
            animation-duration: 2s;
            animation-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
            animation-fill-mode: forwards;
            animation-delay: 10s;
        `

        /*
          * Slides animation
        */
        const firstSlideDelay = 7000
        const secondSlideDelay = 12000

        let firstSlideAnimation = () => {
            slides[0].classList.remove('_active')
            slides[1].classList.add('_active')

            this.animation.animationTextIn(this.splitDateText.chars)
        }

        let secondSlideAnimation = () => {
            slides[1].classList.remove('_active')
            slides[2].classList.add('_active')

            this.lastSlideTimeline.play()
        } 

        setTimeout(firstSlideAnimation, firstSlideDelay)
        setTimeout(secondSlideAnimation, secondSlideDelay)
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
            outMonth = Math.abs(nowDateMonth - independenceMonth)
            outDay = Math.abs(nowDateDay - independenceDay)
        }

        const setZero = (num) => {
            if(num) {
                return num < 10 ? `0${num}` : num
            } else {
                return '00'
            }
        }

        timerYearField.innerHTML = setZero(outYear)
        timerMonthField.innerHTML = setZero(outMonth)
        timerDayField.innerHTML = setZero(outDay)

        const splitArray = [timerYearField, timerMonthField, timerDayField]
        this.splitDateText = this.split.splitText(splitArray)
    }

    close () {
        this.closeTitleLines = this.split.splitText(this.closeTitle, { type: "lines,words" })
        this.closeTitleLinesChild = this.split.splitText(this.closeTitleLines.lines, {
            linesClass: "split-parent"
        })

        gsap.set(this.element, { transformOrigin: '100% 100%' })

        this.timelineClose = gsap.timeline({ defaults: { duration: 1, ease: Power2.easeIn } })

        const clickHandler = () => {
            this.lastSlideTimeline.reverse()

            this.timelineClose.to(this.element, {
                yPercent: -100,
                onStart: () => this.element.classList.add('wc-transform'),
                onComplete: () => this.element.classList.remove('wc-transform')
            }, '+=1')

            this.timelineClose.call(_ => {
                this.element.remove()

                body_lock_remove(0)

                gsap.to(this.heroTitlesLine.lines, {
                    duration: 1,
                    ease: Power1.easeOut,
                    stagger: 0.09,
                    y: '0%',
                    opacity: 1
                })

                gsap.to(this.heroDescriptions, {
                    duration: 1,
                    ease: Power1.easeOut,
                    opacity: 1,
                    y: 0,
                    scale: 1
                })

                this.burger.classList.remove('disable')
            })
        }

        this.closeButton.onclick = clickHandler
    }

    heroTitlesAnimation () {
        this.heroTitlesLine = this.split.splitText(this.heroTitles, {
            type: "lines,words,chars",
            linesClass: "split-child"
        })
        this.heroTitlesParentLine = this.split.splitText(this.heroTitles, {
            linesClass: "split-parent"
        })

        gsap.set(this.heroTitlesLine.lines, {
            y: '100%',
            opacity: 0
        })
        gsap.set(this.heroDescriptions, {
            opacity: 0
        })
    }

    onResize () {
        this.heroTitlesLine.revert()
        this.heroTitlesParentLine.revert()
        this.closeTitleLines.revert()
        this.splitDateText.revert()

        this.heroTitlesAnimation()
    }

}

class HeroSection {
    constructor (element) {
        this.element = element
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
    }

    timelineAnimation() {
        this.timeline = gsap.timeline()

        ScrollTrigger.create({
            trigger: this.element,
            animation: this.timeline,
            start: "top top",
            end: () => '+=8000',
            pin: true,
            pinSpacing: "margin",
            scrub: 1
        });

        this.timeline.fromTo(this.heroFirstDescriptions, {
            opacity: 1
        }, {
            duration: 1,
            opacity: 0
        })

        this.timeline.to(this.heroFirstLines[0], {
            x: - (((window.innerWidth - (this.heroFirstLines[1].clientWidth / 2)) / 2) + (this.heroFirstLines[1].clientWidth /2 )), 
            ease: Power1.easeIn,
            duration: 2,
            opacity: 0.2,
            onStart: () => this.heroFirstLines[0].classList.add('wc-transform'),
            onComplete: () => this.heroFirstLines[0].classList.remove('wc-transform')
        }, '>')
        this.timeline.to(this.heroFirstLines[1], {
            x: ((window.innerWidth - this.heroFirstLines[1].clientWidth) / 2) + this.heroFirstLines[1].clientWidth,
            ease: Power1.easeIn,
            duration: 2,
            opacity: 0.2,
            onStart: () => this.heroFirstLines[1].classList.add('wc-transform'),
            onComplete: () => this.heroFirstLines[1].classList.remove('wc-transform')
        }, '<')
        this.timeline.to(this.heroFirstLines[2], {
            x: - (((window.innerWidth - this.heroFirstLines[1].clientWidth) / 2) + this.heroFirstLines[1].clientWidth),
            ease: Power1.easeIn,
            duration: 2,
            opacity: 0.2,
            onStart: () => this.heroFirstLines[2].classList.add('wc-transform'),
            onComplete: () => this.heroFirstLines[2].classList.remove('wc-transform')
        }, '<')

        this.timeline.fromTo(this.heroMap, {
            scale: 0,
            opacity: 0.4
        }, {
            scale: 1,
            opacity: 1,
            ease: Power4.easeIn,
            duration: 2.5,
            onStart: () => this.heroMap.classList.add('wc-transform'),
            onComplete: () => this.heroMap.classList.remove('wc-transform')
        }, '=-1.5')

        this.timeline.to(this.element, {
            duration: 2,
            y: - (window.innerHeight),
            onStart: () => this.element.classList.add('wc-transform'),
            onComplete: () => this.element.classList.remove('wc-transform')
        })

        this.timeline.fromTo(this.timelineSection, {
            filter: 'brightness(0)'
        }, {
            filter: 'brightness(1)'
        }, '<')

        /*
          * z-index
        */
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

}
class TimelineSection {
    constructor (element) {
        this.element = element
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
        //this.Animation()
    }

    scroll () {

        ScrollTrigger.matchMedia({

            "(max-width: 768px)": function() {
                const timeline = gsap.timeline({ defaults: {ease: 'none'} })
                const rootElement = document.querySelector('.timeline-section')
                const scrollContainerBG = rootElement.querySelector('.scroll-container__bg')

                ScrollTrigger.create({
                    trigger: rootElement,
                    animation: timeline,
                    start: self => self.previous().end,
                    end: '30000px 100%',
                    pin: true, 
                    scrub: 1,
                });

                gsap.set(scrollContainerBG, {
                    xPercent: -50,
                    yPercent: -50,
                    rotate: '90deg'
                })

                timeline.to(rootElement, {
                    duration: 0.1,
                    y: - (rootElement.scrollHeight + 200),
                    onStart: () => rootElement.classList.add('wc-transform'),
                    onComplete: () => rootElement.classList.remove('wc-transform')
                })

                timeline.to(scrollContainerBG, {
                    duration: 0.1,
                    y: 1000,
                    onStart: () => scrollContainerBG.classList.add('wc-transform'),
                    onComplete: () => scrollContainerBG.classList.remove('wc-transform')
                }, '<')

            },

            "(min-width: 769px)": function() {
                const timeline = gsap.timeline({ defaults: {ease: 'none'} })
                const rootElement = document.querySelector('.timeline-section')
                const scrollContainer = document.querySelector('.scroll-container')
                const scrollContainerBG = document.querySelector('.scroll-container__bg')
                const scrollIndicatorArrow = document.querySelectorAll('.scroll-indicator path, .scroll-indicator rect')
                const parallaxImageText = document.querySelectorAll('.parallax-item__img-text')
                const parallaxImages = document.querySelectorAll('.parallax-item__img')

                ScrollTrigger.create({
                    trigger: rootElement,
                    animation: timeline,
                    start: self => self.previous().end,
                    end: '30000px 100%',
                    pin: true,
                    pinSpacing: "margin",
                    scrub: 1
                });
                
                timeline.to(scrollIndicatorArrow, {
                    duration: 0,
                    fill: '#ffffff'
                })

                timeline.fromTo(scrollContainer, {
                    x: 0,
                }, {
                    x: - (scrollContainer.scrollWidth - window.innerWidth),
                    onStart: () => scrollContainer.classList.add('wc-transform'),
                    onComplete: () => scrollContainer.classList.remove('wc-transform')
                })
        
                timeline.fromTo(scrollContainerBG, {
                    xPercent: 0,
                    ease: Power3.easeIn,
                }, {
                    xPercent: 25,
                    onStart: () => scrollContainerBG.classList.add('wc-transform'),
                    onComplete: () => scrollContainerBG.classList.remove('wc-transform')
                }, '<')

                // timeline.to(parallaxImageText, {
                //     x: 40,
                //     onStart: () => parallaxImageText.classList.add('wc-transform'),
                //     onComplete: () => parallaxImageText.classList.remove('wc-transform')
                // }, '<')
                // timeline.to(parallaxImages, {
                //     x: -40,
                //     onStart: () => parallaxImages.classList.add('wc-transform'),
                //     onComplete: () => parallaxImages.classList.remove('wc-transform')
                // }, '<')

                timeline.to(rootElement, {
                    duration: 0.02,
                })

                timeline.to(rootElement, {
                    duration: 0.1,
                    yPercent: -100,
                    onStart: () => rootElement.classList.add('wc-transform'),
                    onComplete: () => rootElement.classList.remove('wc-transform')
                })

            }

        })

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
    constructor (element) {
        this.element = element

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

        ScrollTrigger.create({
            trigger: this.element,
            animation: this.timeline,
            start: self => self.previous().end, 
            end: '50000px 100%',
            pin: true,
            pinSpacing: "margin",
            scrub: 1
        });

        let maxLeftWidth = Array.from(this.toLeftLine).map(line => line.clientWidth).reduce((p, n) => p > n ? p : n)
        let maxRightWidth = Array.from(this.toRightLine).map(line => line.clientWidth).reduce((p, n) => p > n ? p : n)

        const residualOffsetLeftLine = Math.ceil((maxLeftWidth / 100) * 10)
        const residualOffsetRightLine = Math.ceil((maxRightWidth / 100) * 10)

        gsap.set(this.toLeftLine, {
            xPercent: 10
        })

        gsap.set(this.toRightLine, {
            xPercent: -10
        })

        gsap.set(this.moveBg, {
            scale: 0.5,
            z: '1px'
        })

        gsap.set(this.content, {
            yPercent: -200,
            z: '1px'
        })

        gsap.set(this.textItems, {
            display: 'none',
            opacity: 0,
        })

        this.timeline.to(this.toLeftLine, {
            duration: 2,
            x: - (window.innerWidth + residualOffsetLeftLine),
            opacity: 0.2,
            // onStart: () => this.toLeftLine.classList.add('wc-transform'),
            // onComplete: () => this.toLeftLine.classList.remove('wc-transform')
        })

        this.timeline.to(this.toRightLine, {
            duration: 2,
            x: (window.innerWidth + residualOffsetRightLine),
            opacity: 0.2,
            // onStart: () => this.toRightLine.classList.add('wc-transform'),
            // onComplete: () => this.toRightLine.classList.remove('wc-transform')
        }, '<')

        this.timeline.to(this.toFillStar, {
            duration: 2,
            rotate: '100deg'
        }, '<')

        this.timeline.to(this.toStrokeStar, {
            duration: 2,
            rotate: '-100deg'
        }, '<')

        this.timeline.to(this.moveBg, {
            duration: 1.5,
            yPercent: -100,
            onStart: () => this.moveBg.classList.add('wc-transform')
        }, '-=2')

        this.timeline.to(this.moveBg, {
            duration: 1.1,
            scale: 1,
            onComplete: () => this.moveBg.classList.remove('wc-transform')
        }, '-=0.5')

        this.timeline.fromTo(this.moveBg, {
            filter: 'brightness(1)'
        }, {
            filter: 'brightness(0.5)'
        })

        gsap.utils.toArray(this.textItems).forEach(item => {
            this.timeline.to(item, {
                display: 'block',
                opacity: 1,
                onStart: () => item.classList.add('wc-opacity'),
                onComplete: () => item.classList.remove('wc-opacity')
            })
            this.timeline.to(item, {
                display: 'none',
                opacity: 0,
                onStart: () => item.classList.add('wc-opacity'),
                onComplete: () => item.classList.remove('wc-opacity')
            })
        })

        this.timeline.to(this.element, {
            duration: 1.6,
            yPercent: -100,
            onStart: () => this.element.classList.add('wc-transform'),
            onComplete: () => this.element.classList.remove('wc-transform')
        })

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
}
class IncidentSection {
    constructor (element) {
        this.element = element
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

        this.scroll()
        this.onScreen()
        this.splitDescr()
    }

    scroll () {

        this.timeline = gsap.timeline({ defaults: {ease: 'none' } })

        this.timelineST = ScrollTrigger.create({
            trigger: this.element,
            animation: this.timeline,
            start: self => self.previous().end,
            end: '55000px 100%',
            pin: true, 
            pinSpacing: "margin",
            scrub: 1,
        });

        if(this.scrollContainer.scrollWidth > window.innerWidth) {
            this.timeline.fromTo(this.scrollContainer, {
                x: 0,
            }, {
                x: - (this.scrollContainer.scrollWidth - window.innerWidth),
                onStart: () => this.scrollContainer.classList.add('wc-transform'),
                onComplete: () => this.scrollContainer.classList.remove('wc-transform')
            })
        }

        this.timeline.fromTo(this.scrollContainerBG, {
            xPercent: 0,
            ease: Power3.easeIn,
        }, {
            xPercent: -20,
            onStart: () => this.scrollContainerBG.classList.add('wc-transform'),
            onComplete: () => this.scrollContainerBG.classList.remove('wc-transform')
        }, '<')

        this.timeline.to(this.element, {
            duration: 0.1,
        })

        this.timeline.to(this.element, {
            yPercent: -100,
            onStart: () => this.element.classList.add('wc-transform'),
            onComplete: () => this.element.classList.remove('wc-transform')
        })

        this.timeline.to(this.scrollIndicator, {
            autoAlpha: 0
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

    onResize () {
        this.splitDescription.revert()
    }

}
class BlogSection {
    constructor (element) {
        this.element = element
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
            end: '70000px 100%',
            pin: true,
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
            y: - (this.element.scrollHeight),
            onStart: () => this.element.classList.add('wc-transform'),
            onComplete: () => this.element.classList.remove('wc-transform')
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
        this.observerImages = new Observer(this.images, this.imgAnimationIn, this.imgAnimationOut, { threshold: 0.75 })
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

        this.descriptionsSplitChild = this.split.splitText(this.descriptions, {
            type: "lines,words",
            linesClass: "split-child"
        })
        
        this.descriptionsSplitParent = this.split.splitText(this.descriptions, {
            type: "lines,words",
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
        this.footerLinksSplitChild = this.split.splitText(this.footerLinks, {
            type: "lines",
            linesClass: "split-child"
        })
        this.footerLinksSplitParent = this.split.splitText(this.footerLinks, {
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

    onResize () {
        this.descriptionsSplitParent.revert()
        this.descriptionsSplitChild.revert()

        this.footerLinksSplitChild.revert()
        this.footerLinksSplitParent.revert()

        this.descrAnimation()
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
        this.animation = new Animation()
        this.cursor = new Cursor()

        /*
          * Elements
        */
        this.$heroSection = document.querySelector('.hero-section')
        this.$timelineSection = document.querySelector('.timeline-section')
        this.$histotySection = document.querySelector('.history-section')
        this.$incidentSection = document.querySelector('.incident-section')

        /*
          * Sections
        */
        if (this.$heroSection) {
            this.heroSection = new HeroSection(this.$heroSection)
        }
        if (this.$timelineSection) {
            this.timelineSection = new TimelineSection(this.$timelineSection)
        }
        if (this.$histotySection) {
            this.historySection = new HistorySection(this.$histotySection)
        }
        if (this.$incidentSection) {
            this.incidentSection = new IncidentSection(this.$incidentSection)
        }
        
        /*
          * Functions
        */
       this.asyncLoad()
    }

    pageLoad () {

        /*
          * Elements
        */
        this.$preloader = document.querySelector('.preloader')
        this.$blogSection = document.querySelector('.blog-section')
        this.$preloaderCover = document.querySelector('.preloader-cover')

        /*
          * Preloader cover
        */
        if (this.$preloader) {
            this.preloader = new Preloader(this.$preloader)
        }
        
        const preloaderCoverTimeline = gsap.timeline({ defaults: {delay: 1} })
        preloaderCoverTimeline.fromTo(this.$preloaderCover, { autoAlpha: 1 }, { autoAlpha: 0 })
        preloaderCoverTimeline.call(_ => this.$preloaderCover.remove())

        if (this.$blogSection) {
            this.blogSection = new BlogSection(this.$blogSection)
        }
        
        if (this.preloader) {
            this.preloader.init()
        }
        
    }

    contentDomLoad () {
        this.init()

        this.removeEventListeners()
    }

    onResize () {

        if (this.blogSection) {
            this.blogSection.onResize()
        }
        if (this.incidentSection) {
            this.incidentSection.onResize()
        }
        if (this.header) {
            this.header.onResize()
        }
        if (this.preloader) {
            this.preloader.onResize()
        }
        
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

    asyncLoad () {
        const images = document.querySelectorAll('[data-src]')

        this.preloadImages = Array.from(images).map(image => {
            return new AsyncLoad(image)
        })
    }
}

new App()