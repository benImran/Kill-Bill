const wrapper = document.querySelector('.wrapper');
const body = document.querySelector('body');
const nav = document.querySelector('.nav');
const burger = document.querySelector('.nav__burger');
const list = document.querySelector('.nav__list');
const homeScroller = document.querySelector('.homepage__scroller');
const bar = document.querySelector('.nav__burger');
const movingBlock = document.querySelector('.movingBlock');
const cover = document.querySelector('.overview__albumCover');
const vinyle = document.querySelector('.overview__albumVinyle');
const player = document.querySelector('.player');
const playerInfos = document.querySelector('.player__infos');
const playerCover = document.querySelector('.player__cover');
const trackInfos = document.querySelector('.track__infos');
const mobileNextBtn = document.querySelector('.changeTrack');
const prevTrack = document.querySelector('.changeTrack__prev');
const nextTrack = document.querySelector('.changeTrack__next');
let touchStart = 0;

console.log('dgabnql');

burger.addEventListener('click', () => {
    bar.classList.toggle('nav__burger--active');
    list.classList.toggle('nav__list--active');
    nav.classList.toggle('nav--active');
});

wrapper.addEventListener('touchstart', (evt) => {
    touchStart = evt.touches[0].clientY;
});

body.addEventListener('click', () => {
    "use strict";
    // var require = function (_require) { 
    //     console.log(JSON.parse('./js/content-page.json'));
    //     JSON.parse('./js/content-page.json');
    // };
    // json = JSON.parse(fs.readFileSync('./js/content-page.json'));
    // console.log(json);
    fetch('./content-page.json')
        .then(console.log)
        .then(console.log)
});

nextTrack.addEventListener('click', () => {
    console.log('yee');
});

body.addEventListener('touchend', (evt) => {
    const touchEnd = evt.changedTouches[0].clientY;
    if (touchStart > touchEnd) {
        if (wrapper.classList.contains('wrapper--homepage')) {
            burger.classList.add('nav__burger--visible');
            homeScroller.classList.add('homepage__scroller--hidden');
            cover.classList.add('overview__albumCover--move');
            vinyle.classList.add('overview__albumVinyle--move');
            movingBlock.classList.add('movingBlock--move');
            setTimeout(() => {
                wrapper.classList.add('wrapper--trackInfosVisible');
                wrapper.classList.add('wrapper--trackInfosHidden');
                movingBlock.classList.add('movingBlock--fixed');
            }, 1200);
        }

        if (wrapper.classList.contains('wrapper--trackInfosVisible')) {
            console.log('uyt');
            wrapper.classList.add('wrapper--playerHidden');
            movingBlock.classList.add('movingBlock--hidden');
            trackInfos.classList.add('track__infos--move');
            playerInfos.classList.add('player__infos--hidden');
            playerCover.classList.add('player__cover--active');
            setTimeout(() => {
                wrapper.classList.remove('wrapper--trackInfosHidden');
                wrapper.classList.add('wrapper--trackInfosVisible');
                wrapper.classList.add('wrapper--playerVisible');
                burger.classList.add('nav__burger--visible');
                homeScroller.classList.add('homepage__scroller--hidden');
                player.classList.add('player--active');
                cover.classList.add('overview__albumCover--move');
                vinyle.classList.add('overview__albumVinyle--move');
                movingBlock.classList.add('movingBlock--move');
                movingBlock.classList.add('movingBlock--fixed');
            }, 100);
        }
        if (wrapper.classList.contains('wrapper--playerVisible')) {
            wrapper.classList.remove('wrapper--changeTrackHidden');
            trackInfos.classList.add('track__infos--visible');
            player.classList.add('player--hidden');
            setTimeout(() => {
                wrapper.classList.remove('wrapper--trackInfosHidden');
                wrapper.classList.add('wrapper--changeTrackHidden');
                wrapper.classList.add('wrapper--changeTrackMove');
                wrapper.classList.add('wrapper--playerVisible');
                wrapper.classList.remove('wrapper--trackInfos');
                trackInfos.classList.add('track__infos--move');
                player.classList.add('player--active');
                playerInfos.classList.add('player__infos--hidden');
                playerCover.classList.add('player__cover--active');
                mobileNextBtn.classList.add('changeTrack__btn--move');
            }, 100);
        }
        if (wrapper.classList.contains('wrapper--changeTrackMove')) {
            mobileNextBtn.classList.add('changeTrack__btn--visible');
            setTimeout(() => {
                wrapper.classList.remove('wrapper--changeTrackHidden');
                wrapper.classList.add('wrapper--changeTrackVisible');
            }, 100);
        }
    }
    if (touchStart < touchEnd) {
        if (wrapper.classList.contains('wrapper--trackInfosHidden')) {

        }
        if (wrapper.classList.contains('wrapper--trackInfos')) {
            trackInfos.classList.remove('track__infos--visible');
            trackInfos.classList.remove('track__infos--move');
            player.classList.remove('player--active');
            playerInfos.classList.remove('player__infos--hidden');
            playerCover.classList.remove('player__cover--active');
            setTimeout(() => {
                wrapper.classList.remove('wrapper--playerVisible');
                wrapper.classList.add('wrapper--trackInfosHidden');
            }, 100);
        }
        if (wrapper.classList.contains('wrapper--playerHidden')) {
            setTimeout(() => {
                wrapper.classList.add('wrapper--trackInfos');
            }, 1000);
        }
        if (wrapper.classList.contains('wrapper--changeTrackHidden')) {
            wrapper.classList.remove('wrapper--changeTrackMove');
            trackInfos.classList.remove('track__infos--visible');
            player.classList.remove('player--hidden');
            player.classList.add('player--disactive');
            mobileNextBtn.classList.remove('changeTrack__btn--move');
            setTimeout(() => {
                wrapper.classList.add('wrapper--playerHidden');
            }, 100);
        }
        if (wrapper.classList.contains('wrapper--changeTrackVisible')) {
            mobileNextBtn.classList.remove('changeTrack__btn--visible');
            setTimeout(() => {
                wrapper.classList.add('wrapper--changeTrackHidden');
            }, 100);
        }
    }
});