document.addEventListener("DOMContentLoaded", () => {
	init();
	setSize();
	map();
	about();
	project();
	network();
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
		const navList = document.querySelectorAll(".nav__bottom-list li a");

		if (navList) {
			navList.forEach((e) =>
				e.addEventListener("click", (e) => {
					body.classList.toggle("open");
					navMenu.classList.toggle("open");
				})
			);
		}

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

function network() {
	gsap.registerPlugin(ScrollTrigger);
	const cards = gsap.utils.toArray(".network__card");
	const networkSection = document.querySelector(".network");
	if (window.innerWidth <= 999) {
		return;
	}
	ScrollTrigger.create({
		trigger: networkSection,
		start: "top top",
		end: "bottom bottom",
		pin: true,
		invalidateOnRefresh: true,
	});

	cards.forEach((card, index) => {
		gsap.set(card, { zIndex: cards.length });

		gsap.to(card, {
			y: index * -200,
			ease: "power1.out",
			scrollTrigger: {
				trigger: card,
				start: "top center+=100",
				end: "top top+=100",
				scrub: 0.3,
				invalidateOnRefresh: true,
			},
		});
	});
}

function project() {
	const tabs = document.querySelectorAll(".projects__tabs .btn");
	const tabsInner = document.querySelector(".projects__tabs-inner");
	const tabsContentRU = {
		1: `<div class="projects__tabs-card">
			<picture>
				<source srcset="./images/project-1.avif" />
				<img src="./images/project-1.png" alt="Project 1" />
			</picture>
			<h1>Запуск приложения для доставки продуктов (релиз в 2025 году)</h1>
		</div>
		<div class="projects__tabs-card">
			<picture>
				<source srcset="./images/project-2.avif" />
				<img src="./images/project-2.png" alt="Project 1" />
			</picture>
			<h1>Открытие гипермаркета в городе Асан с площадью 1000 м²</h1>
		</div>`,
		2: `<div class="projects__tabs-card">
			<picture>
				<source srcset="./images/project-2.avif" />
				<img src="./images/project-2.png" alt="Project 1" />
			</picture>
			<h1>Tab-2 title</h1>
		</div>
		<div class="projects__tabs-card">
			<picture>
				<source srcset="./images/project-1.avif" />
				<img src="./images/project-1.png" alt="Project 1" />
			</picture>
			<h1>Tab-2 title</h1>
		</div>`,
	};
	const tabsContentKR = {
		1: `<div class="projects__tabs-card">
							<picture>
								<source srcset="./images/project-1.avif" />
								<img src="./images/project-1.png" alt="Project 1" />
							</picture>
							<h1>식료품 배달 앱 출시 (2025년 출시 예정)</h1>
						</div>
						<div class="projects__tabs-card">
							<picture>
								<source srcset="./images/project-2.avif" />
								<img src="./images/project-2.png" alt="Project 1" />
							</picture>
							<h1>아산시에서 면적 1000제곱미터 규모의 백화점 개점 계획</h1>
						</div>`,
		2: `<div class="projects__tabs-card">
							<picture>
								<source srcset="./images/project-1.avif" />
								<img src="./images/project-1.png" alt="Project 1" />
							</picture>
							<h1>식료품 배달 앱 출시 (2025년 출시 예정)</h1>
						</div>
						<div class="projects__tabs-card">
							<picture>
								<source srcset="./images/project-2.avif" />
								<img src="./images/project-2.png" alt="Project 1" />
							</picture>
							<h1>아산시에서 면적 1000제곱미터 규모의 백화점 개점 계획</h1>
						</div>`,
	};
	const tabsContentEN = {
		1: `<div class="projects__tabs-card">
			<picture>
				<source srcset="./images/project-1.avif" />
				<img src="./images/project-1.png" alt="Project 1" />
			</picture>
			<h1>Запуск приложения для доставки продуктов (релиз в 2025 году)</h1>
		</div>
		<div class="projects__tabs-card">
			<picture>
				<source srcset="./images/project-2.avif" />
				<img src="./images/project-2.png" alt="Project 1" />
			</picture>
			<h1>Открытие гипермаркета в городе Асан с площадью 1000 м²</h1>
		</div>`,
		2: `<div class="projects__tabs-card">
			<picture>
				<source srcset="./images/project-2.avif" />
				<img src="./images/project-2.png" alt="Project 1" />
			</picture>
			<h1>Tab-2 title</h1>
		</div>
		<div class="projects__tabs-card">
			<picture>
				<source srcset="./images/project-1.avif" />
				<img src="./images/project-1.png" alt="Project 1" />
			</picture>
			<h1>Tab-2 title</h1>
		</div>`,
	};
	const currentLang = document.location.pathname.split("-")[1]?.split(".")[0];
	tabs.forEach((tab) => {
		tab.addEventListener("click", () => {
			const target = tab.dataset.tab;
			tabs.forEach((t) => t.classList.remove("active"));
			tab.classList.add("active");
			tabsInner.innerHTML =
				currentLang === "kr"
					? tabsContentKR[target]
					: currentLang === "en"
					? tabsContentEN[target]
					: tabsContentRU[target] || "Пусто";
		});
	});
}
