
const PHOTOS_LIST = [
    'images/photo1.jpg',
    'images/photo2.jpg',
    'images/photo3.jpg',
    'images/photo4.jpeg',
    'images/photo5.jpg',
    'images/photo6.jpg'
];

document.addEventListener('DOMContentLoaded', () => {
    const photoSlider = document.getElementById('photo-slider');

    const doubledPhotos = [...PHOTOS_LIST, ...PHOTOS_LIST];

    photoSlider.innerHTML = '';

    doubledPhotos.forEach((src) => {
        const slide = document.createElement('div');
        slide.className = 'slide';

        const img = document.createElement('img');
        img.src = src;
        img.alt = 'Memory Photo';
        img.loading = 'lazy';

        img.addEventListener('error', () => {
            img.style.display = 'none';
            slide.style.backgroundColor = '#eae2d5';
            slide.innerHTML = `<div style="height: 100%; display: flex; align-items: center; justify-content: center; font-size: 11px; color: #8c7e6c; text-align: center; padding: 10px;">Foto tidak ditemukan</div>`;
        });

        slide.appendChild(img);
        photoSlider.appendChild(slide);
    });

    setupButtonEvader();
    setupPageTransitions();
    setupAudioPlayer();
});

function setupButtonEvader() {
    const btnNo = document.getElementById('btn-no');

    function evade(e) {
        
        if (!btnNo.classList.contains('evading')) {
            btnNo.classList.add('evading');
        }

        const btnWidth = btnNo.offsetWidth;
        const btnHeight = btnNo.offsetHeight;

        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;

        const safePadding = 20;
        let randomX = Math.random() * (winWidth - btnWidth - safePadding * 2) + safePadding;
        let randomY = Math.random() * (winHeight - btnHeight - safePadding * 2) + safePadding;

        let cursorX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
        let cursorY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);

        const distanceThreshold = 100; 
        const distance = Math.hypot(randomX - cursorX, randomY - cursorY);

        if (distance < distanceThreshold) {
            randomX = (randomX + distanceThreshold) % (winWidth - btnWidth - safePadding * 2) + safePadding;
            randomY = (randomY + distanceThreshold) % (winHeight - btnHeight - safePadding * 2) + safePadding;
        }

        btnNo.style.left = `${randomX}px`;
        btnNo.style.top = `${randomY}px`;
    }

    btnNo.addEventListener('mouseover', evade);
    btnNo.addEventListener('touchstart', (e) => {
        e.preventDefault(); 
        evade(e);
    });

    btnNo.addEventListener('click', (e) => {
        e.preventDefault();
        evade(e);
    });
}

function setupPageTransitions() {
    const btnYes = document.getElementById('btn-yes');
    const page1 = document.getElementById('page-1');
    const page2 = document.getElementById('page-2');
    const bgMusic = document.getElementById('bg-music');
    const playIcon = document.querySelector('.icon-play');
    const pauseIcon = document.querySelector('.icon-pause');

    btnYes.addEventListener('click', () => {
        
        bgMusic.play()
            .then(() => {
                playIcon.classList.add('hidden');
                pauseIcon.classList.remove('hidden');
            })
            .catch((err) => {
                console.log('Autoplay audio blocked or pending action:', err);
            });

        page1.classList.remove('active');
        page1.classList.add('hidden');

        page2.classList.remove('hidden');
        page2.classList.add('active');
    });
}

function setupAudioPlayer() {
    const audioToggle = document.getElementById('audio-toggle');
    const bgMusic = document.getElementById('bg-music');
    const playIcon = document.querySelector('.icon-play');
    const pauseIcon = document.querySelector('.icon-pause');

    audioToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play()
                .then(() => {
                    playIcon.classList.add('hidden');
                    pauseIcon.classList.remove('hidden');
                })
                .catch((err) => console.log('Audio playback error:', err));
        } else {
            bgMusic.pause();
            playIcon.classList.remove('hidden');
            pauseIcon.classList.add('hidden');
        }
    });
}
