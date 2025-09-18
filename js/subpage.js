const transitionOverlay = document.getElementById('transition-overlay');

const NAVIGATION_MAP = {
    '1': '/music-page.html',
    '2': '/movie/index.html',
    '3': '/painting/index.html',
    '4': '/photo/index.html',
    '5': '/idea/index.html',
    '6': '/words/index.html',
    '7': '/money/index.html',
    '8': '/game/index.html',
    '9': '/links/index.html'
};

window.addEventListener('load', () => {
    if (transitionOverlay) {
        setTimeout(() => {
            transitionOverlay.classList.remove('active');
        }, 200);
    }
});

const homeMandala = document.querySelector('.home-mandala');
const homeLabel = document.querySelector('.home-label');

if (homeMandala) {
    homeMandala.addEventListener('mouseenter', () => {
        const cells = document.querySelectorAll('.mandala-cell');
        cells.forEach((cell, index) => {
            setTimeout(() => {
                cell.style.transform = 'scale(1.05)';
            }, index * 40);
        });
    });

    homeMandala.addEventListener('mouseleave', () => {
        const cells = document.querySelectorAll('.mandala-cell');
        cells.forEach((cell, index) => {
            setTimeout(() => {
                cell.style.transform = 'scale(1)';
            }, index * 30);
        });
    });

    homeMandala.addEventListener('click', (event) => {
        if (event.target && event.target.closest('.mandala-cell[data-link]')) {
            return;
        }
        const target = homeMandala.getAttribute('data-target') || '../index.html';
        navigateWithFade(target);
    });
}

function navigateWithFade(targetHref) {
    const targetUrl = new URL(targetHref, window.location.origin);
    if (transitionOverlay) {
        transitionOverlay.classList.add('active');
        setTimeout(() => {
            window.location.href = targetUrl.href;
        }, 200);
    } else {
        window.location.href = targetUrl.href;
    }
}

const navCells = document.querySelectorAll('.mandala-cell[data-link]');
navCells.forEach((cell) => {
    cell.setAttribute('role', 'button');
    cell.setAttribute('tabindex', '0');

    const handleNavigation = () => {
        const key = cell.getAttribute('data-link');
        const destination = key ? NAVIGATION_MAP[key] : null;
        if (!destination) {
            return;
        }
        navigateWithFade(destination);
    };

    cell.addEventListener('click', (event) => {
        event.stopPropagation();
        handleNavigation();
    });

    cell.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleNavigation();
        }
    });
});

if (homeLabel) {
    homeLabel.addEventListener('click', (event) => {
        event.stopPropagation();
        const target = homeLabel.getAttribute('data-target') || '../index.html';
        navigateWithFade(target);
    });

    homeLabel.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            const target = homeLabel.getAttribute('data-target') || '../index.html';
            navigateWithFade(target);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const centerCell = document.querySelector('.mandala-cell.center');
    if (!centerCell) {
        return;
    }

    setInterval(() => {
        centerCell.style.transform = 'scale(1.15)';
        setTimeout(() => {
            centerCell.style.transform = 'scale(1)';
        }, 1500);
    }, 4000);
});
