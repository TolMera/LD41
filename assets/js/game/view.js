// View Logic
class gameView extends gameController {
	constructor() {
		super();

		this.assets = "/assets/";
		this.icons = "/icons/";
		this.cards = "/cards/";
		this.background = "/background/";
		this.menuIcon = 'menu.png';

		$('body').on('showBackground', (event, background) => { this.showBackground.call(this, event, background) });
		$('body').on('showMenu', this.showMenu());
		$('body').on('showTextbox', this.showTextbox());

		$('body').on('enableGyroBackground', this.enableGyroBackground(event));

		// $('body').on('click', '.card', this.useCard);

		$('body').on('touchstart mousedown', '.card', function (event) {
			window.cardTouchStart = new Date().getTime();
		});
		$('body').on('touchend mouseup', '.card', (event) => {
			window.cardTouchEnd = new Date().getTime();
			let td = window.cardTouchEnd - window.cardTouchStart;
			if (td > 1000) {
				// This was a tap&hold
			} else {
				// This was a tap
				let tt = window.cardTouchEnd - window.cardLastTap;
				if (tt < 300 && tt > 75) {
					// console.log("double tap");
					this.useCard.call(this, event.target);
				}
			}
			window.cardLastTap = window.cardTouchEnd;
		});

		$('body').on('touchstart mousedown', '.activeCard', function (event) {
			window.activeCardTouchStart = new Date().getTime();
		});
		$('body').on('touchend mouseup', '.activeCard', (event) => {
			window.activeCardTouchEnd = new Date().getTime();
			let td = window.activeCardTouchEnd - window.activeCardTouchStart;
			if (td > 1000) {
				// This was a tap&hold
			} else {
				// This was a tap
				let tt = window.activeCardTouchEnd - window.activeCardLastTap;
				if (tt < 300 && tt > 75) {
					// console.log("double tap");
					this.returnCard.call(this, event.target);
				}
			}
			window.activeCardLastTap = window.activeCardTouchEnd;
		});

		// $('body').on('click', (event) => {
		// 	console.log(event.target.id);
		// 	if (event.target.id == 'hand') {
		// 		// Bring the hand to the front.
		// 		let t = event.target;
		// 		let o = $('#textbox')[0];
		// 		if (t != undefined && o != undefined) {
		// 			$(t).detach();
		// 			$(o).after(t);
		// 		}
		// 	} else if (event.target.id == 'textbox') {
		// 		// Bring the textbox to the front
		// 		let t = event.target;
		// 		let o = $('#hand')[0];
		// 		if (t != undefined && o != undefined) {
		// 			$(t).detach();
		// 			$(o).after(t);
		// 		}
		// 	}
		// });

		$('body').on('textbox', (event, data) => {
			let tb = $('#textbox');
			$(tb).prepend('<p class="noPaddingOrMargin">' + data + '</p>');
			let tbh = $(tb).height();
			let contentH = 0;
			if ($('#textbox p').length > 1) {
				$('#textbox p').each(function () {
					contentH += $(this).height();
				});
				while (contentH > tbh) {
					$('#textbox p').last().remove();

					if ($('#textbox p').length > 1) {
						contentH = 0;
						$('#textbox p').each(function () {
							contentH += $(this).height();
						});
					} else {
						return false;
						console.log("text overflow");
					}
				}
			}

			$('#textbox').click();

			return true;
		});
		
		/**
		 * This section, when the user has active card and they click on something, it firest those cards at that something.
		 * Means someone could open and search with 1 set of clicks...
		 * Even with just 1 card, this is still right for how to interact with this object
		 */
		$('body').on('click', '#background > div', (event) => {
			let t = event.target;
			console.log($(t).attr('name'));
			$('.activeCard').each((event, card) => {
				// console.log(t, $(card).attr('type'));
				$(t).trigger($(card).attr('type'));
			});
			$('.activeCard').fadeOut({
				duration: 500,
				done: function() {
					$('.activeCard').remove();
				}
			});
			if (this.handShowing()) {
				$('#hand').fadeOut({
					duration: 500,
					done: function () {
						$('#hand').remove();
					}
				});
				$('body').trigger('handRemoved');
			}
		});
	}

	useCard(card) {
		let applyCss = {};
		let activeCards = $('.activeCard').length;
		if (activeCards > 0) {
			// this.returnCard($('.activeCard'));
			applyCss.top = 15 * activeCards + 'px';
			// applyCss.right = -10 * activeCards + 'px';
		}
		$(card).hide({
			duration: 500,
			done: function () {
				$(card).detach();

				$(card).removeClass('card').addClass("activeCard").css(applyCss);
				$('body').append(card);
				$(card).fadeIn(500);
			}
		});
	}

	returnCard(card) {
		$(card).fadeOut({
			duration: 500,
			done: function () {
				$(card).detach();

				$(card).removeClass('activeCard').addClass("card").attr('style', '');
				$('#hand').append(card);
				$(card).show(500);
			}
		});
	}

	isMenuButton(button) {
		$(button).on('click', () => {
			// This is the menu button, it should pull up the list of card that you have in your hand.
			if (this.handShowing()) {
				$('#hand').fadeOut({
					duration: 500,
					done: function () {
						$('#hand').remove();
					}
				});
				$('body').trigger('handRemoved');
			} else {
				$('.activeCard').fadeOut({
					duration: 500,
					done: function () {
						$('.activeCard').remove();
					}
				});
				let cards = '';
				for (let item of this.hand) {
					cards += this.cardIcon(item);
				}
				let hand = `<div id="hand">
					${cards}
				</div>`;
				hand = $.parseHTML(hand);
				$(hand).hide();
				$('body').append(hand);
				$(hand).fadeIn(750);
				$('body').trigger('handShown');
			}
		});
	}

	showBackground(event, background) {
		if ($('#background').length == 0) {
			$('body').prepend('<div id="background"></div>');
		}
		
		$('#background').prepend(`<img class="bg" src="${this.assets}${this.background}${background}" />`);
		// $('#background').css({
		// 	'background-image': `url(${this.assets}${this.background}${background})`
		// });
		
	}

	enableGyroBackground() {
		// Javascript gyro API - read twist and apply that to background image.
		if (window.gn == undefined)
		window.gn = new GyroNorm();
		window.gn.init().then(() => {
			this.gyroBackground.call(this, arguments);
		}).catch(function (e) {
			// Catch if the DeviceOrientation or DeviceMotion is not supported by the browser or device
			$.ajax({
				url: '/',
				data: JSON.stringify(e)
			});
		});
	}

	gyroBackground() {
		window.gn.start((data) => {
			window.gyro.alpha += data.dm.alpha;
			window.gyro.beta += data.dm.beta;
			window.gyro.frame += 1;

			if (window.lastFrame + 25 <= Date.now()) {
				let alpha = Math.floor(data.dm.alpha / window.gyro.frame);
				let beta = Math.floor(data.dm.beta / window.gyro.frame);

				window.lastFrame = Date.now();
				window.gyro.alpha = 0;
				window.gyro.beta = 0;
				window.gyro.frame = 0;

				this.gyroBackgroundFrame(alpha, beta);
			}

		});
	}
	
	gyroBackgroundFrame(vert, hori) {
		window.settings = {};
		window.settings.vert = 7;
		window.settings.hori = 7;
		
		vert *= window.settings.vert;
		hori *= window.settings.hori;
		
		$('body').trigger('textbox', `vert: ${vert}, hori: ${hori}`);
		
		let bg = $('#background');
		if ($(bg).length > 0) {
			let top = new Number($(bg).css('top').replace('px', ''));
			// vert = vert.clamp(-12, 12);
			top += vert;

			let left = new Number($(bg).css('left').replace('px', ''));
			// hori = hori.clamp(-12, 12);
			left += hori;

			top = top.clamp(0 - ($(bg).height() - window.innerHeight), 0);
			left = left.clamp(0 - ($(bg).width() - window.innerWidth), 0);

			$(bg).css({
				top: top,
				left: left
			});
		}
	}

	showMenu() {
		let icon = $.parseHTML(`<img id="menuIcon" src="${this.assets}${this.icons}${this.menuIcon}" />`)[0];
		$('body').append(icon);
		this.iconSize(icon);
		this.iconPosition(icon, 'm', 'b')
		this.isMenuButton(icon);
	}

	showTextbox() {
		let textbox = $.parseHTML(`<div id="textbox" class="text-center"></div>`)[0];
		$('body').append(textbox);
	}

	/**
	 * Looks at the view, and returns true/false if the card scroller is showing
	 */
	handShowing() {
		if ($('#hand:visible').length > 0) {
			return true;
		}
		return false;
	}

	cardIcon(cardName) {
		return `<img class="card" type="${cardName}" src="${this.assets}${this.cards}${cardName}.png" />`;
	}

	iconSize(icon) {
		// Can test the button and if it's an important button make it bigger, if it's not important, make it smaller.
		$(icon).css({
			width: 2 + 'cm',
			height: 2 + 'cm'
		});
	}

	iconPosition(icon, h, v) {
		$(icon).css({
			position: 'absolute'
		});
		switch (h) {
			case 'l':
				$(icon).css({
					left: '0%'
				});
				break;
			case 'm':
				let subtract = (($(icon).width() / window.innerWidth) * 100) / 2;
				$(icon).css({
					left: (50 - subtract) + '%',
					// right: '50%'
				});
				break;
			case 'r':
				$(icon).css({
					right: '0%'
				});
				break;
		}
		switch (v) {
			case 't':
				$(icon).css({
					top: '0%'
				});
				break;
			case 'm':
				let subtract = (($(icon).height() / window.innerHeight) * 100) / 2;
				$(icon).css({
					top: (50 - subtract) + '%',
					// bottom: '50%'
				});
				break;
			case 'b':
				$(icon).css({
					bottom: '0%'
				});
				break;
		}

		/*
			want to bind to this so that if orientation or screen size etc change, then this would be re-updated...
		*/
	}
	
	newSetting() {
		$('#background').remove();
	}
	
	attachObjects(objects) {
		for (let obj of objects) {
			let dom = $.parseHTML(`<div name="${obj.name.replace(/\s/g,'')}"></div>`);
			$('#background').append(dom);
			
			$(dom).css({
				position:	'relative',
				top: obj.top,
				bottom: Math.max(obj.bottom, 30),
				left: obj.left,
				right: Math.max(obj.right, 30),
				border: '1px solid black',
				'min-height': '30px',
				'min-width': '30px'
				
			});
			
			$('body').trigger('attachActions', [dom, obj.actions]);
		}
	}
};