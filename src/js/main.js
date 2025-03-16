document.addEventListener("DOMContentLoaded", () => {
	init();
	setSize();
});

function setSize() {
	const windowWidth = window.innerWidth;

	if (windowWidth > 999) return;

	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty(`--vh`, `${vh}px`);
}


async function init() {
	if (document.querySelector('.nav-lang-dropdown')) {
		window.addEventListener(`click`, (e) => {
			if (document.querySelector(`details[open]`)) {
				let target = e.target.closest(`details[open]`);

				if (!target && e.target.tagName !== `BUTTON`) {
					document.querySelectorAll(`details[open]`).forEach((item) => {
						item.removeAttribute(`open`);
					});
				}
			}
		});
	}

	if (document.querySelector('.nav__btn')) {
		const menuBtn = document.querySelector('.nav__btn');
		const navMenu = document.querySelector('.nav__bottom');

		const body = document.querySelector('body');

		if (menuBtn && navMenu) {
			menuBtn.addEventListener('click', (e) => {

				e.preventDefault();
				body.classList.toggle('open');
				menuBtn.classList.toggle('open');
				if (navMenu) navMenu.classList.toggle('open');
			});

			window.addEventListener('resize', () => {
				if (window.innerWidth > 999) {
					menuBtn.classList.remove('open');
					body.classList.remove('open');
					if (navMenu) navMenu.classList.remove('open');
				}
			});
		}
	}
};
