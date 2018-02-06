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
// const tracks = JSON.parse(contentPage).tracks;
let touchStart = 0;
let indic = 0;

burger.addEventListener('click', () => {
    bar.classList.toggle('nav__burger--active');
    list.classList.toggle('nav__list--active');
    nav.classList.toggle('nav--active');
});

wrapper.addEventListener('touchstart', (evt) => {
    touchStart = evt.touches[0].clientY;
});

const trackTitle = document.querySelector('.player__title');
const trackArtist = document.querySelector('.player__artist');
const trackRank = document.querySelector('.player__rankPosition');
const trackText = document.querySelector('.track__infosText');
const nextBtnRank = document.querySelector('.btnInfos__rank--white');
const prevBtnRank = document.querySelector('.btnInfos__rank--yellow');

prevTrack.addEventListener('click', () => {
    const tracks = JSON.parse(contentPage).tracks;
    
    if(indic === 0){
        indic = 12;
    }
    tracks.map((track, key) => {
        if (key === indic - 1) {
            trackTitle.innerHTML = track.titre;
            trackArtist.innerHTML = track.artiste;
            trackRank.innerHTML = track.rank;
            trackText.innerHTML = track.description;
            nextBtnRank.innerHTML = '0' + (indic + 3);
            if(indic = 0){
                nextBtnRank.innerHTML = 12;
            }
            console.log(indic);
        }
    });
    indic--;
    resetPage();   
});

nextTrack.addEventListener('click', () => {
    console.log('ree');
    const tracks = JSON.parse(contentPage).tracks;
    
    if(indic === 11){
        indic = -1;
    }
    tracks.map((track, key) => {
        if (key === indic + 1) {
            console.log(trackText, track.description);
            trackTitle.innerHTML = track.titre;
            trackArtist.innerHTML = track.artiste;
            trackRank.innerHTML = track.rank;
            trackText.innerHTML = track.description;
            nextBtnRank.innerHTML = '0' + (indic + 3);
        }
    });
    indic++;
    resetPage();
});

body.addEventListener('scroll', (evt) => {
    
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

function resetPage() {
    trackInfos.classList.remove('track__infos--visible');
    trackInfos.classList.remove('track__infos--move');
    player.classList.remove('player--active');
    playerInfos.classList.remove('player__infos--hidden');
    playerCover.classList.remove('player__cover--active');
    setTimeout(() => {
        wrapper.classList.remove('wrapper--playerVisible');
        wrapper.classList.add('wrapper--trackInfosHidden');
    }, 100);
    setTimeout(() => {
        wrapper.classList.add('wrapper--trackInfos');
    }, 1000);
    wrapper.classList.remove('wrapper--changeTrackMove');
    trackInfos.classList.remove('track__infos--visible');
    player.classList.remove('player--hidden');
    player.classList.add('player--disactive');
    mobileNextBtn.classList.remove('changeTrack__btn--move');
    setTimeout(() => {
        wrapper.classList.add('wrapper--playerHidden');
    }, 100);
    mobileNextBtn.classList.remove('changeTrack__btn--visible');
    setTimeout(() => {
        wrapper.classList.add('wrapper--changeTrackHidden');
    }, 100);
};

function movePage() {
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
}

const contentPage = `{
	"tracks": [{
			"titre": "Bang bang My Baby shut me down",
			"artiste": "Nancy Sinatra",
			"image": "nom/chemin de l'image", 
            "description" : "Alors que la Mamba Negra - héroïne du film - est allongée sur le sol et terrifiée, un homme lui demande « do you find me sadistic ». Il lui essuie le sang coulant sur son visage d’un mouchoir brodé au nom de Bill avant de  tirer une balle dans la tête de la jeune femme, Bang bang. ",
            "rank": "01",
            "music": ""
		},
		{
			"titre": "That Certain Female",
			"artiste": "Charlie Feathers",
            "image": "nom/chemin de l'image",
            "description" : "Un Shérif arrive sur les lieux d’une scène de crime en écoutant That Certain female.  Il ne s’attend pas à découvrir un tel carnage. Sur place il trouve une scène de mariage macabre où les neufs participants ont été abattu par des coups de feu. En s’approchant de la mariée enceinte, Mamba Negra il découvre qu’elle est encore en vie.",
            "rank": "02",
            "music": "music/.mp3"
		},
		{
			"titre": "Twistes Nerve",
			"artiste": "Bernard Hermann",
            "image": "nom/chemin de l'image",
            "description" : "Miss Driver tout de blanc vêtue marche fièrement dans un hôpital perchée sur ses talons tenant à la main un parapluie rouge tout en sifflant cette douce mélodie. C’est alors qu’elle entre dans la pièce de la jeune héroïne, armée d’une seringue, afin de l’empoisonner. Elle est alors interrompue par Bill qui lui demande d’annuler l’opération. ",
            "rank": "03",
            "music": ""
        },
        {
			"titre": "7 notes in Negro",
			"artiste": "Bixio & Frizzi & Tempera",
            "image": "nom/chemin de l'image",
            "description" : "Alors qu’un homme rentre sa langue dans sa bouche la pensant dans le coma, elle lui mord jusqu’à la sectionner le laissant inconscient. Elle décide alors dans découdre avec l’infirmier à l’origine de ce trafic qui refait surface dans la pièce, pensant que son ami avait terminé son affaire. Le plantant d’un coup de couteau, elle lui demande où est bill avant de l’abattre à son tour. ",
            "rank": "04",
            "music": ""
        },
        {
			"titre": "Main Title",
			"artiste": "Isaac Hayes",
            "image": "nom/chemin de l'image",
            "description" : "Habillé des vêtements de l’infirmier, elle s’échappe de l’hôpital en fauteuil roulant ne pouvant plus marcher après 4 ans dans le coma. Une fois dans le parking elle cherche la voiture de l’infirmier Buck qu’elle vient de laisser pour mort. Elle s’arrête alors à la vue d’un véhicule arborant pour nom sur la carrosserie « Pussy Wagon. »",
            "rank": "05",
            "music": ""
        },
        {
			"titre": "The Grand Duel",
			"artiste": "Parte Prima",
            "image": "nom/chemin de l'image",
            "description" : "Essayant de redonner vie à ses membres allongée sur la banquette arrière de la voiture de Buck. Elle se rappelle alors les personnes qui lui ont affligés tout ça: le groupe des vipères assassines. On apprend alors l’existence d’Oren Ishii, une ennemie redoutable qu’elle va affronter dans ce tout premier volume de Kill Bill.",
            "rank": "06",
            "music": ""
        },
        {
			"titre": "Run Fay Run",
			"artiste": "Isaac Hayes",
            "image": "nom/chemin de l'image",
            "description" : "Retour sur l’enfance d’Oren Ishii. Née sur une base américaine à Tokyo, elle assiste à 9 ans à l’assassinat violent de ses deux parents. Cachée sous le lit, cet événement va marquer son parcours. A l’âge de 20 ans elle devient l’une des plus grandes tueuses du monde. En combinaison rouge sur le toit d’un immeuble, elle tient un sniper et abat un homme a distance.",
            "rank": "07",
            "music": ""
        },
        {
			"titre": "The lonely Shepherd",
			"artiste": "Zamfir",
            "image": "nom/chemin de l'image",
            "description" : "Mamba Negra se rend à Okinawa à la recherche d’un homme. Cet homme se trouve être celui qui a formé Bill son ennemi juré. Hattori Hanzo créa le sabre avec lequel se bat l’héroïne. Il avait promis de ne plus fabriquer d’objet de mort, mais à rompu sa promesse lorsqu’il a compris face à qui devrait se battre Black Mamba.",
            "rank": "08",
            "music": ""
        },
        {
			"titre": "Who Hoo",
			"artiste": "The 5.6.7.8's",
            "image": "nom/chemin de l'image",
            "description" : "Dans une salle festive un groupe joue Who Hoo. C’est dans ce même endroit festif que Mamba Negra s’apprête à affronter son ennemi Oren Ishii. Cette musique nous berce, alors que le pire est à venir. Tandis que Sophie, l’avocate et bras droit de Oren descends les escaliers pour se rendre aux toilettes a son tour où l’héroïne l’attend secrètement.",
            "rank": "09",
            "music": ""
        },
        {
			"titre": "Ironside - Excerpt",
			"artiste": "Quicy Jones",
            "image": "nom/chemin de l'image",
            "description" : "L’heure de l’affrontement arrive. Mamba Negra prend en otage Sophie et demande à Oren de descendre l’affronter. Lorsque son visage se dévoile enfin, elle lui coupe le bras droit d’un geste sec - symbolisant sa position vis-à-vis d’Oren Ishii. La salle s’échappe en courant alors que   l‘héroïne s’approche doucement d’Oren Ishii avec un regard sournois.",
            "rank": "10",
            "music": ""
        },
        {
			"titre": "Don't Let Me Be Minsunderstood",
			"artiste": "Santa Esmeralda",
            "image": "nom/chemin de l'image",
            "description" : "Après avoir affronté les 88 Fous, les deux femmes Mamba Negra et Oren Ishii s’affrontent dans un jardin enneigé, armées toutes deux de leurs sabres. Elle se regardent fixement, s’apprêtant à vivre un combat long et douloureux. Mamba Negra prend le premier coup de sabre du combat dans le dos, mais se relève bien décidée à en découdre.",
            "rank": "11",
            "music": ""
        },
        {
			"titre": "The Flowers of Carnage ",
			"artiste": "Meiko Kaji",
            "image": "nom/chemin de l'image",
            "description" : "Après avoir combattu longtemps avec son ennemi, Mamba Negra aura le dernier coup face à son adversaire Oren, d’un coup de sabre elle décape le haut de son crâne qui vol alors dans les airs. L’héroïne s’assoit sur un banc apaisée par sa vengeance. Elle peut ainsi rayer de sa liste à abattre le nom de Oren Ishii et s’intéresser aux prochains de la liste…",
            "rank": "12",
            "music": ""
		}
	]
}`;