// Data storage definitions
class gameModel {
	constructor() {
		this.hand = [];
		$('body').on('newCard', (event, cards) => {
			this.newCard(cards);
		});
		
		$('body').on('delCard', (event, card) => {
			this.delCard(card);
		});
	}

	/**
	 * If we need to create a new card in hand, this is how.
	 */
	newCard(cards) {
		for (let card of cards) {
			console.log(card);
			this.hand.push(card);
		}
	}

	delCard(cardName) {
		let index = this.hand.indexOf(cardName);
		
		this.hand.splice(index, 1);
	}
};