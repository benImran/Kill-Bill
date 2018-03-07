const wrapper = document.querySelector('.wrapper'),
    body = document.querySelector('body'),
    nav = document.querySelector('.nav'),
    burger = document.querySelector('.nav__burger'),
    list = document.querySelector('.nav__list'),
    homeScroller = document.querySelector('.homepage__scroller'),
    bar = document.querySelector('.nav__burger'),
    movingBlock = document.querySelector('.movingBlock'),
    cover = document.querySelector('.overview__albumCover'),
    vinyle = document.querySelector('.overview__albumVinyle'),
    player = document.querySelector('.player'),
    playerInfos = document.querySelector('.player__infos'),
    playerCover = document.querySelector('.player__cover'),
    playerKillBill = document.querySelector('.player__killbill'),
    trackCoverAlbum = document.querySelector('.player__coverAlbum'),
    trackInfos = document.querySelector('.track__infos'),
    mobileNextBtn = document.querySelector('.changeTrack'),
    trackPlay = document.querySelector('.track__play'),
    prevTrack = document.querySelector('.changeTrack__prev'),
    nextTrack = document.querySelector('.changeTrack__next'),
    trackPlayer = document.querySelector('.trackPlayer'),
    trackListPage = document.querySelector('.tracklist-page'),
    tracklist = document.querySelector('.tracklist'),
    indexList = document.querySelector('.nav__index'),
    trackTitle = document.querySelector('.player__title'),
    trackArtist = document.querySelector('.player__artist'),
    trackRank = document.querySelector('.player__rankPosition'),
    trackText = document.querySelector('.track__infosText'),
    prevBtnRank = document.querySelector('.btnInfos__rank--yellow'),
    nextBtnRank = document.querySelector('.btnInfos__rank--white'),
    prevTrackTitle = document.querySelector('.btnInfos__trackTitle--prev'),
    nextTrackTitle = document.querySelector('.btnInfos__trackTitle--next'),
    prevTrackArtist = document.querySelector('.btnInfos__trackArtist--prev'),
    nextTrackArtist = document.querySelector('.btnInfos__trackArtist--next');

let touchStart = 0,
    allow = true,
    indic = 11;

burger.addEventListener('click', () => {
    bar.classList.toggle('nav__burger--active');
    list.classList.toggle('nav__list--active');
    nav.classList.toggle('nav--active');
});

wrapper.addEventListener('touchstart', (evt) => {
    touchStart = evt.touches[0].clientY;
});

body.addEventListener('mousewheel', ({deltaY}) => {
    !nav.classList.contains('nav--active') && setTimeout(() => {
        deltaY > 0 && moveDown();
        deltaY < 0 && moveUp();
    }, 200);
});

trackPlay.addEventListener('click', () => {
    if(trackPlay.classList.contains('track__play--pause')){
        console.log('ee');
        trackPlayer.pause();
        trackPlay.src = 'img/play.svg';
    }else{
        trackPlayer.play();
        trackPlay.src = 'img/pause.svg';
    }
    trackPlay.classList.toggle('track__play--pause');
});

indexList.addEventListener('click', () => {
    const tracks = JSON.parse(contentPage).tracks;
    if(!indexList.classList.contains('tracklist--create')){
        tracks.map(({titre, artiste, rank}) => {
            const track = document.createElement('div'),
                trackLink = document.createElement('a'),
                trackTitle = document.createElement('h2'),
                trackArtist = document.createElement('p'),
                trackRank = document.createElement('p');

            track.classList.add('track-item');
            tracklist.appendChild(track);
            trackLink.href = '#';
            track.appendChild(trackLink);
            trackTitle.classList.add('track-item__name','track-item__name--special-width');
            trackTitle.innerHTML = titre;
            trackLink.appendChild(trackTitle);
            trackArtist.classList.add('track-item__artist');
            trackArtist.innerHTML = artiste;
            trackLink.appendChild(trackArtist);
            trackRank.classList.add('track-item__number');
            trackRank.innerHTML = rank;
            trackLink.appendChild(trackRank);
        });
        !indexList.classList.add('tracklist--create');
    }
    trackListPage.classList.add('tracklist-page--active');
});



trackListPage.addEventListener('click', () => {
    trackListPage.classList.remove('tracklist-page--active');
    body.style.overflow = 'hidden';
    resetPage();
});

prevTrack.addEventListener('click', () => {
    const tracks = JSON.parse(contentPage).tracks;
    if(!indic){
        indic = 12;
    }
    if(indic <= 0) {
        indic = tracks.length;
    }
    tracks.map((track, key) => {
        if (key === indic - 1) {
            trackTitle.innerHTML = track.titre;
            trackArtist.innerHTML = track.artiste;
            trackRank.innerHTML = track.rank;
            trackText.innerHTML = track.description;
            trackCoverAlbum.src = `img/vinyle-${indic}`;
            trackPlayer.src = `music/${track.titre}.mp3`;
            console.log(0 - (tracks.length - (indic + 1)));
            nextTrackTitle.innerHTML = indic < tracks.length - 1 ? tracks[indic + 1].titre : tracks[0 - (tracks.length - (indic + 1))].titre;
            nextTrackArtist.innerHTML = indic < tracks.length - 1 ? tracks[indic + 1].artiste : tracks[0 - (tracks.length - (indic + 1))].artiste;
            nextBtnRank.innerHTML = indic < tracks.length - 1 ? tracks[indic + 1].rank : tracks[0 - (tracks.length - (indic + 1))].rank;
            prevTrackArtist.innerHTML = tracks[indic - 1].artiste;
            prevTrackTitle.innerHTML = tracks[indic - 1].titre;
            prevBtnRank.innerHTML = tracks[indic - 1].rank;
        }
    });
    indic--;
    resetPage();
});

nextTrack.addEventListener('click', () => {
    const tracks = JSON.parse(contentPage).tracks;

    if(!indic){
        indic = 0;
    }
    if(indic > tracks.length - 2){
        indic = 0;
    }
    tracks.map((track, key) => {
        if (key === indic + 1) {
            trackTitle.innerHTML = track.titre;
            trackArtist.innerHTML = track.artiste;
            trackRank.innerHTML = track.rank;
            trackText.innerHTML = track.description;
            trackCoverAlbum.src = `img/vinyle-${key + 1}.png`;
            trackPlayer.src = `music/${track.titre}.mp3`;
            nextTrackTitle.innerHTML = indic < 10 ? tracks[indic + 2].titre : tracks[tracks.length].titre;
            nextTrackArtist.innerHTML = indic < 10 ? tracks[indic + 2].artiste : tracks[tracks.length].artiste;
            nextBtnRank.innerHTML = indic < 10 ? tracks[indic + 2].rank : tracks[0].rank;
            nextBtnRank.innerHTML = indic < 10 ? tracks[indic + 2].rank : tracks[0].rank;
            prevTrackArtist.innerHTML = tracks[indic].artiste;
            prevTrackTitle.innerHTML = tracks[indic].titre;
            prevBtnRank.innerHTML = tracks[indic].rank;
        }
    });
    indic++;
    resetPage();
});


body.addEventListener('touchend', (evt) => {
    const touchEnd = evt.changedTouches[0].clientY;
    touchStart > touchEnd && moveDown();
    touchStart < touchEnd && moveUp();
});

function resetPage() {
    trackPlay.src = 'img/pause.svg';
    trackPlay.classList.add('track__play--pause');
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
        playerKillBill.classList.remove('player__killbill--visible');
        mobileNextBtn.classList.remove('changeTrack__btn--visible');
    }, 100);
    setTimeout(() => {
        wrapper.classList.add('wrapper--changeTrackHidden');
    }, 100);
    setTimeout(() => {
        allow = true;
    }, 1600);
};

function moveDown(){
    allow = false;
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
        wrapper.classList.add('wrapper--playerHidden');
        movingBlock.classList.add('movingBlock--hidden');
        trackInfos.classList.add('track__infos--move');
        playerInfos.classList.add('player__infos--hidden');
        playerCover.classList.add('player__cover--active');
        playerKillBill.classList.add('player__killbill--visible');
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
        }, 1600);
    }
    if (wrapper.classList.contains('wrapper--playerVisible')) {
        wrapper.classList.remove('wrapper--changeTrackHidden');
        trackInfos.classList.add('track__infos--visible');
        player.classList.add('player--hidden');
        playerKillBill.classList.remove('player__killbill--visible');
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
        }, 1600);
    }
    if (wrapper.classList.contains('wrapper--changeTrackMove')) {
        mobileNextBtn.classList.add('changeTrack__btn--visible');
        setTimeout(() => {
            wrapper.classList.remove('wrapper--changeTrackHidden');
            wrapper.classList.add('wrapper--changeTrackVisible');
        }, 1600);
    }
}

function moveUp(){
    if (wrapper.classList.contains('wrapper--trackInfos')) {
        trackInfos.classList.remove('track__infos--visible');
        trackInfos.classList.remove('track__infos--move');
        player.classList.remove('player--active');
        playerInfos.classList.remove('player__infos--hidden');
        playerCover.classList.remove('player__cover--active');
        setTimeout(() => {
            wrapper.classList.remove('wrapper--playerVisible');
            wrapper.classList.add('wrapper--trackInfosHidden');
        }, 1600);
    }
    if (wrapper.classList.contains('wrapper--playerHidden')) {
        setTimeout(() => {
            wrapper.classList.add('wrapper--trackInfos');
            playerKillBill.classList.remove('player__killbill--visible');
        }, 100);
    }
    if (wrapper.classList.contains('wrapper--changeTrackHidden')) {
        wrapper.classList.remove('wrapper--changeTrackMove');
        trackInfos.classList.remove('track__infos--visible');
        player.classList.remove('player--hidden');
        player.classList.add('player--disactive');
        playerKillBill.classList.add('player__killbill--visible');
        mobileNextBtn.classList.remove('changeTrack__btn--move');
        setTimeout(() => {
            wrapper.classList.add('wrapper--playerHidden');
        }, 1600);
    }
    if (wrapper.classList.contains('wrapper--changeTrackVisible')) {
        mobileNextBtn.classList.remove('changeTrack__btn--visible');
        setTimeout(() => {
            wrapper.classList.add('wrapper--changeTrackHidden');
        }, 1600);
    }
}

const contentPage = `{
	"tracks": [{
			"titre": "Bang bang my baby shut me down",
			"artiste": "Nancy Sinatra",
			"image": "nom/chemin de l'image", 
            "description" : "Alors que la Mamba Negra - héroïne du film - est allongée sur le sol et terrifiée, un homme lui demande « do you find me sadistic ». Il lui essuie le sang coulant sur son visage d’un mouchoir brodé au nom de Bill avant de  tirer une balle dans la tête de la jeune femme, Bang bang. ",
            "rank": "01"
		},
		{
			"titre": "That certain female",
			"artiste": "Charlie Feathers",
            "image": "nom/chemin de l'image",
            "description" : "Un Shérif arrive sur les lieux d’une scène de crime en écoutant That Certain female.  Il ne s’attend pas à découvrir un tel carnage. Sur place il trouve une scène de mariage macabre où les neufs participants ont été abattu par des coups de feu. En s’approchant de la mariée enceinte, Mamba Negra il découvre qu’elle est encore en vie.",
            "rank": "02"
		},
		{
			"titre": "Twistes nerve",
			"artiste": "Bernard Hermann",
            "image": "nom/chemin de l'image",
            "description" : "Miss Driver tout de blanc vêtue marche fièrement dans un hôpital perchée sur ses talons tenant à la main un parapluie rouge tout en sifflant cette douce mélodie. C’est alors qu’elle entre dans la pièce de la jeune héroïne, armée d’une seringue, afin de l’empoisonner. Elle est alors interrompue par Bill qui lui demande d’annuler l’opération. ",
            "rank": "03"
        },
        {
			"titre": "7 notes in negro",
			"artiste": "Bixio & Frizzi & Tempera",
            "image": "nom/chemin de l'image",
            "description" : "Alors qu’un homme rentre sa langue dans sa bouche la pensant dans le coma, elle lui mord jusqu’à la sectionner le laissant inconscient. Elle décide alors dans découdre avec l’infirmier à l’origine de ce trafic qui refait surface dans la pièce, pensant que son ami avait terminé son affaire. Le plantant d’un coup de couteau, elle lui demande où est bill avant de l’abattre à son tour. ",
            "rank": "04"
        },
        {
			"titre": "Main title",
			"artiste": "Isaac Hayes",
            "image": "nom/chemin de l'image",
            "description" : "Habillé des vêtements de l’infirmier, elle s’échappe de l’hôpital en fauteuil roulant ne pouvant plus marcher après 4 ans dans le coma. Une fois dans le parking elle cherche la voiture de l’infirmier Buck qu’elle vient de laisser pour mort. Elle s’arrête alors à la vue d’un véhicule arborant pour nom sur la carrosserie « Pussy Wagon. »",
            "rank": "05"
        },
        {
			"titre": "The grand duel",
			"artiste": "Parte Prima",
            "image": "nom/chemin de l'image",
            "description" : "Essayant de redonner vie à ses membres allongée sur la banquette arrière de la voiture de Buck. Elle se rappelle alors les personnes qui lui ont affligés tout ça: le groupe des vipères assassines. On apprend alors l’existence d’Oren Ishii, une ennemie redoutable qu’elle va affronter dans ce tout premier volume de Kill Bill.",
            "rank": "06"
        },
        {
			"titre": "Run Fay run",
			"artiste": "Isaac Hayes",
            "image": "nom/chemin de l'image",
            "description" : "Retour sur l’enfance d’Oren Ishii. Née sur une base américaine à Tokyo, elle assiste à 9 ans à l’assassinat violent de ses deux parents. Cachée sous le lit, cet événement va marquer son parcours. A l’âge de 20 ans elle devient l’une des plus grandes tueuses du monde. En combinaison rouge sur le toit d’un immeuble, elle tient un sniper et abat un homme a distance.",
            "rank": "07"
        },
        {
			"titre": "The lonely Shepherd",
			"artiste": "Zamfir",
            "image": "nom/chemin de l'image",
            "description" : "Mamba Negra se rend à Okinawa à la recherche d’un homme. Cet homme se trouve être celui qui a formé Bill son ennemi juré. Hattori Hanzo créa le sabre avec lequel se bat l’héroïne. Il avait promis de ne plus fabriquer d’objet de mort, mais à rompu sa promesse lorsqu’il a compris face à qui devrait se battre Black Mamba.",
            "rank": "08"
        },
        {
			"titre": "Who hoo",
			"artiste": "The 5.6.7.8's",
            "image": "nom/chemin de l'image",
            "description" : "Dans une salle festive un groupe joue Who Hoo. C’est dans ce même endroit festif que Mamba Negra s’apprête à affronter son ennemi Oren Ishii. Cette musique nous berce, alors que le pire est à venir. Tandis que Sophie, l’avocate et bras droit de Oren descends les escaliers pour se rendre aux toilettes a son tour où l’héroïne l’attend secrètement.",
            "rank": "09"
        },
        {
			"titre": "Ironside - Excerpt",
			"artiste": "Quicy Jones",
            "image": "nom/chemin de l'image",
            "description" : "L’heure de l’affrontement arrive. Mamba Negra prend en otage Sophie et demande à Oren de descendre l’affronter. Lorsque son visage se dévoile enfin, elle lui coupe le bras droit d’un geste sec - symbolisant sa position vis-à-vis d’Oren Ishii. La salle s’échappe en courant alors que   l‘héroïne s’approche doucement d’Oren Ishii avec un regard sournois.",
            "rank": "10"
        },
        {
			"titre": "Don't let me be minsunderstood",
			"artiste": "Santa Esmeralda",
            "image": "nom/chemin de l'image",
            "description" : "Après avoir affronté les 88 Fous, les deux femmes Mamba Negra et Oren Ishii s’affrontent dans un jardin enneigé, armées toutes deux de leurs sabres. Elle se regardent fixement, s’apprêtant à vivre un combat long et douloureux. Mamba Negra prend le premier coup de sabre du combat dans le dos, mais se relève bien décidée à en découdre.",
            "rank": "11"
        },
        {
			"titre": "The flowers of carnage",
			"artiste": "Meiko Kaji",
            "image": "nom/chemin de l'image",
            "description" : "Après avoir combattu longtemps avec son ennemi, Mamba Negra aura le dernier coup face à son adversaire Oren, d’un coup de sabre elle décape le haut de son crâne qui vol alors dans les airs. L’héroïne s’assoit sur un banc apaisée par sa vengeance. Elle peut ainsi rayer de sa liste à abattre le nom de Oren Ishii et s’intéresser aux prochains de la liste…",
            "rank": "12"
		}
	]
}`;