window.addEventListener("load", function () {
	window.addEventListener('resize', () => {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	});

	// Swiper
	function swiperBild() {
		const swiper = new Swiper(".fullscreen__swiper", {
			effect: 'fade',
			autoplay: {
				delay: 5000,
			},
		});
		fullscreenImage.removeClass("first");
	}
	setTimeout(swiperBild, 2000)



	// IMAGELOADED 
	var fullscreenBadge = $('.fullscreen-badge');
	var fullscreenSmallBadge = $('.show');
	var fullscreenBadgeOverlay = $('.fullscreen-badge-overlay');
	var clouds = $('.clouds');
	var fullscreenImage = $('.fullscreen__image');
	function addShow() {
		if (fullscreenBadgeOverlay.hasClass("show")) {
			console.log('has class');
		} else {
			clouds.addClass('show')
			fullscreenImage.addClass('show')
		}
	}
	function removeBigBadge() {
		fullscreenBadge.removeClass("show");
		fullscreenBadgeOverlay.removeClass("show");
		setTimeout(addShow, 1000);
	}

	function removeSmallBadge() {
		if (fullscreenBadgeOverlay.hasClass("show")) {

		} else {
			fullscreenSmallBadge.removeClass("show");
		}
	}
	removeSmallBadge();

	// body_lock_add();

	body_lock();


	var header = $('.header')
	function headerAnimate() {
		header.addClass('show')
	}
	setTimeout(headerAnimate, 10000)
	// headerAnimate();
	$('.loaded-container').imagesLoaded()
		.always(function (_instance) { })
		.done(function (_instance) {

			setTimeout(removeBigBadge, 10000)

			$(window).bind('wheel', function () {
				removeBigBadge();
				setTimeout(headerAnimate, 1000)
				if ($(window).width() > 992) {
					setTimeout(body_lock_remove, 4000)

				}

			});
			if ($(window).width() < 992) {
				document.addEventListener('touchstart', function () {
					removeBigBadge();
					setTimeout(headerAnimate, 1000)
					setTimeout(body_lock_remove, 2000)

				});
			}
		})
		.fail(function () { })
		.progress(function (_instance, _image) { });

	// STICKY HEADER
	if ($(window).width() > 992) {
		var stickyHeader = $('.sticky-header'),
			scrollPrev = 0;
		$(window).scroll(function () {
			var scrolled = $(window).scrollTop();

			if (scrolled < $(".header").height()) {
				stickyHeader.removeClass('out');

			}
			else {
				if (scrolled > 100 && scrolled > scrollPrev) {

					stickyHeader.removeClass('out');
				} else {
					stickyHeader.addClass('out');

				}
				scrollPrev = scrolled;

			}



		});

	}

	// BACKTOP BTN 
	const backTopBtn = document.querySelector('#backtop');
	backTopBtn.style.opacity = 0;
	document.addEventListener('scroll', function () {

		if (window.pageYOffset > 250) {

			backTopBtn.style.opacity = 1;


		} else {
			backTopBtn.style.opacity = 0;

		}
	})


	// SELECTION 
	var filterAll = $('.filter-all'),
		boxs = $('.box'),
		length = boxs.length;
	filterAll.text(length);
	var count_box;

	var filter = filter = new RegExp($(":checkbox:checked")
		.map(function () {
			return this.value;
		}).get().join("|"));

	$('input:checkbox').on('load change', function () {



		filter = new RegExp($(":checkbox:checked")
			.map(function () {
				return this.value;
			}).get().join("|"));

		$(".box").each(function () {
			var $this = $(this);

			if (filter.test($this.attr("class"))) {
				// $this.show();
				$this.fadeIn();
			} else {
				// $this.hide();
				$this.fadeOut();
			}
			if (filter.source == "") {
				$this["show"];
			}
		});

		var values = [];
		values[0] = $(".noUi-handle.noUi-handle-lower").attr("aria-valuetext");
		values[1] = $(".noUi-handle.noUi-handle-upper").attr("aria-valuetext");
		range_change(values);

		count_box();
	});

	// Range Slider
	var range = document.getElementById('range'),
		t = [],
		maximum = parseInt(range.attributes.max.value, 10),
		minimum = parseInt(range.attributes.min.value, 10),
		delta = (maximum - minimum) / 4,
		options = {
			min: [minimum],
			max: [maximum]
		};


	t.push(parseInt(range.attributes.min.value, 10)),
		t.push(parseInt(range.attributes.max.value, 10));
	var n = parseInt(range.attributes.max.value, 10);


	noUiSlider.create(
		range,
		{
			range: options,
			start: t,
			connect: !0,
			pips: {
				mode: "range",
				density: 2
			}
		}
	);
	var marginMin = document.getElementById('slider-margin-value-min'),
		marginMax = document.getElementById('slider-margin-value-max');

	range.noUiSlider.on('update', function (values, handle) {
		if (handle) {
			marginMax.innerHTML = values[handle];
		} else {
			marginMin.innerHTML = values[handle];
		}
	});

	$(".noUi-value-horizontal").each(function () {
		var range = $(this).text().split("").slice(0, -6).join("");
		$(this).html(range);
	});

	function range_change(values, handle) {
		$(".box").each(function () {
			var $this = $(this);
			price = $this.data('price');

			var val1 = values[0];
			var val2 = values[1];


			if (price <= val2 && price >= val1 && filter.test($this.attr("class"))) {
				$this.fadeIn();
			} else {
				$this.fadeOut();
			}

		});
	}
	range.noUiSlider.on('change', function (values, handle) {
		range_change(values, handle);
		count_box();
	});

	function count_box() {
		countbox = $('.content').find(".box:visible").length;
		$(".filter-slect").text(countbox);
	}

	// SELECTION SWIPER 
	const swiper = new Swiper(".selection__swiper", {
		direction: 'horizontal',
		slidesPerView: 4,
		spaceBetween: 25,
		grabCursor: true,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		breakpoints: {
			320: {
				slidesPerView: 1.2,
			},
			576: {
				slidesPerView: 2,
			},
			992: {
				slidesPerView: 3,
			},
			1200: {
				slidesPerView: 4,
			}
		}
	});

	// if ($("#mapComercial").length > 0) {

	// 	ymaps.ready(function () {
	// 		var myMap = new ymaps.Map('mapComercial', {
	// 			center: [43.495298, 39.911510],
	// 			zoom: 13,
	// 			//zoom: mapZoom,
	// 			//controls: [zoom]
	// 		}, {
	// 			searchControlProvider: 'yandex#search'
	// 		}),

	// 			// Создаём макет содержимого.
	// 			MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
	// 				'<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
	// 			),

	// 			myPlacemark1 = new ymaps.Placemark([43.495298, 39.911510], {
	// 				hintContent: '',
	// 			}, {
	// 				iconLayout: 'default#image',
	// 				iconImageHref: '/local/templates/sm_sochi/images/letniy.png?v=2',
	// 				iconImageSize: [60, 60],
	// 				iconImageOffset: [-30, -30]
	// 			});

	// 		myMap.geoObjects.add(myPlacemark1);
	// 		myMap.behaviors.disable('drag');
	// 	})
	// }

	class LiteYTEmbed extends HTMLElement {
		connectedCallback() {
			this.videoId = this.getAttribute("videoid");

			let playBtnEl = this.querySelector(".lty-playbtn");
			// A label for the button takes priority over a [playlabel] attribute on the custom-element
			this.playLabel =
				(playBtnEl && playBtnEl.textContent.trim()) ||
				this.getAttribute("playlabel") ||
				"Play";

			if (!this.style.backgroundImage) {
				this.style.backgroundImage = `url("https://i.ytimg.com/vi/${this.videoId}/hqdefault.jpg")`;
			}

			// Set up play button, and its visually hidden label
			if (!playBtnEl) {
				playBtnEl = document.createElement("button");
				playBtnEl.type = "button";
				playBtnEl.classList.add("lty-playbtn");
				this.append(playBtnEl);
			}
			if (!playBtnEl.textContent) {
				const playBtnLabelEl = document.createElement("span");
				playBtnLabelEl.className = "lyt-visually-hidden";
				playBtnLabelEl.textContent = this.playLabel;
				playBtnEl.append(playBtnLabelEl);
			}

			// On hover (or tap), warm up the TCP connections we're (likely) about to use.
			this.addEventListener("pointerover", LiteYTEmbed.warmConnections, {
				once: true,
			});

			// Once the user clicks, add the real iframe and drop our play button
			// TODO: In the future we could be like amp-youtube and silently swap in the iframe during idle time
			//   We'd want to only do this for in-viewport or near-viewport ones: https://github.com/ampproject/amphtml/pull/5003
			this.addEventListener("click", this.addIframe);
		}

		// // TODO: Support the the user changing the [videoid] attribute
		// attributeChangedCallback() {
		// }

		/**
		 * Add a <link rel={preload | preconnect} ...> to the head
		 */
		static addPrefetch(kind, url, as) {
			const linkEl = document.createElement("link");
			linkEl.rel = kind;
			linkEl.href = url;
			if (as) {
				linkEl.as = as;
			}
			document.head.append(linkEl);
		}

		static warmConnections() {
			if (LiteYTEmbed.preconnected) return;

			// The iframe document and most of its subresources come right off youtube.com
			LiteYTEmbed.addPrefetch("preconnect", "https://www.youtube-nocookie.com");
			// The botguard script is fetched off from google.com
			LiteYTEmbed.addPrefetch("preconnect", "https://www.google.com");

			// Not certain if these ad related domains are in the critical path. Could verify with domain-specific throttling.
			LiteYTEmbed.addPrefetch(
				"preconnect",
				"https://googleads.g.doubleclick.net"
			);
			LiteYTEmbed.addPrefetch("preconnect", "https://static.doubleclick.net");

			LiteYTEmbed.preconnected = true;
		}

		addIframe() {
			if (this.classList.contains("lyt-activated")) return;
			this.classList.add("lyt-activated");

			const params = new URLSearchParams(this.getAttribute("params") || []);
			params.append("autoplay", "1");

			const iframeEl = document.createElement("iframe");
			iframeEl.width = 560;
			iframeEl.height = 315;
			// No encoding necessary as [title] is safe. https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html#:~:text=Safe%20HTML%20Attributes%20include
			iframeEl.title = this.playLabel;
			iframeEl.allow =
				"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
			iframeEl.allowFullscreen = true;
			// AFAIK, the encoding here isn't necessary for XSS, but we'll do it only because this is a URL
			// https://stackoverflow.com/q/64959723/89484
			iframeEl.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(
				this.videoId
			)}?${params.toString()}`;
			this.append(iframeEl);

			// Set focus for a11y
			iframeEl.focus();
		}
	}
	// Register custom element
	customElements.define("lite-youtube", LiteYTEmbed);

});