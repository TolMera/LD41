// Controller logic
class gameController extends gameModel {
	/**
	 *	Initialisations function - loads the game if this is a saved game.
	 */
	constructor() {
		super();
		if (getCookie('savedGame') != false) {
			// There is a saved game, show load window
			swal({
				title: 'Load Saved Game',
				text: 'Would you like to load your last game or start a new game?',
				confirmButtonText: 'Load',
				cancelButtonText: 'New',
				showConfirmButton: true,
				showCancelButton: true
			}).then(function (button) {
				if (button.value == true) {
					// Load game
				} else if (button.dismiss == "cancel") {
					// New Game
				}
			});
		};

		// // Events to listen for
		$('body').on('newCard', function (cardName) {
			// If we need to do anything with the new card in the controller (trigger a new card animation?)
		});

		$('body').on('delCard', function (cardName) {
			// If we need to do anything when a card is removed
		});
		
		$('body').on('attachActions', (event, dom, actions) => {
			this.attachActions(dom, actions);
		});
	}
	
	attachActions(dom, actions) {
		for (let action in actions) {
			$(dom).on(action, () => {
				let act = actions[action];
				if (act.done == false) {
					act.done = true;
					
					$('body').trigger('delCard', [action]);
					
					if (act.outcome) {
						$('body').trigger('textbox', [act.outcome]);
					}
					
					if (act.newCard) {
						$('body').trigger('newCard', [act.newCard]);
					}
					
					if (act.dialogue) {
						$('body').trigger('textbox', [act.dialogue]);
					}
					
					if (act.requires) {
						$('body').trigger('delCard', [act.requires]);
					}
					
					if (act.callback) {
						act.callback(dom, act);
					}
					
				} else {
					$('body').trigger('textbox', ["I've done that already"]);
				}
			});
		}
	}
};