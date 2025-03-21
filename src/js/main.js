document.addEventListener("DOMContentLoaded", () => {
	init();
	setSize();
	map();
	about();
});
function setSize() {
	const windowWidth = window.innerWidth;

	if (windowWidth > 999) return;

	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty(`--vh`, `${vh}px`);
}

async function init() {
	if (document.querySelector(".nav-lang-dropdown")) {
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

	if (document.querySelector(".nav__btn")) {
		const menuBtn = document.querySelector(".nav__btn");
		const navMenu = document.querySelector(".nav__bottom");

		const body = document.querySelector("body");

		if (menuBtn && navMenu) {
			menuBtn.addEventListener("click", (e) => {
				e.preventDefault();
				body.classList.toggle("open");
				menuBtn.classList.toggle("open");
				if (navMenu) navMenu.classList.toggle("open");
			});

			window.addEventListener("resize", () => {
				if (window.innerWidth > 999) {
					menuBtn.classList.remove("open");
					body.classList.remove("open");
					if (navMenu) navMenu.classList.remove("open");
				}
			});
		}
	}
}
function map() {
	const pins = document.querySelectorAll(".pin");
	pins.forEach((pin) => {
		pin.addEventListener("mouseover", () => {
			const pinId = pin.getAttribute("data-pin");
			const desc = document.querySelector(`.desc.${pinId}`);
			const slice = document.querySelectorAll(`.map-slice.${pinId}`);
			console.log(slice);
			if (desc) {
				desc.classList.add("active");
				slice.forEach((item) => item.classList.add("active"));
			}
		});

		pin.addEventListener("mouseout", () => {
			const pinId = pin.getAttribute("data-pin");
			const desc = document.querySelector(`.desc.${pinId}`);
			const slice = document.querySelectorAll(`.map-slice.${pinId}`);
			if (desc) {
				desc.classList.remove("active");
				slice.forEach((item) => item.classList.remove("active"));
			}
		});
	});
}

function about() {
	document.querySelectorAll(".about__card").forEach((card, index) => {
		setTimeout(() => {
			card.classList.add("active");
		}, index * 150);
	});
}
