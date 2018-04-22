class campeign extends gameView {
	constructor() {
		super();

		this.attachDialogue();
	}

	start() {
		this.newCard(["search", "search", "open"]);
		$('body').trigger('showMenu');
		$('body').trigger('showTextbox');

		$('body').trigger('enableGyroBackground');

		this.hallway();
	}

	hallway() {
		this.newSetting();
		let setting = "hallway";
		$('body').trigger('showBackground', setting + '.png');

		if (this.hallway.init == undefined) {
			this.hallway.init = true;

			this.hallway.intro = "I really feel like I'm going mad, I should leave the house for a while.  Some fresh air would really help clear my head.  I'll take his letters with me so I can read them again.";

			this.hallway.objects = [
				{
					name: 'Writing Desk',
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					actions: {
						open: {
							done: false,
							outcome: "I open the writing desk, it's got exactly what I expect to find envelopes, pens and paper."
						},
						search: {
							done: false,
							outcome: "I ruffle through the envelopes hoping to find a letter from him but I cant find any."
						}
					}
				},
				{
					name: 'Painting of a Cheshire Cat',
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					actions: {
						search: {
							done: false,
							outcome: "I pull the painting away from the wall.  It's obvious from the dust that this painting been hanging here for a long time.  Tucked into the back of the frame I've found some cards.",
							newCard: ['kitchen']
						},
						bookAlice: {
							done: false,
							outcome: `Theres a card being used as a bookmark in this book!  It marking the passage: "Have I gone mad? I'm afraid so. You're entirely Bonkers. But I will tell you a secret, All the best people are."`,
							newCard: ['bedroom']
						}
					}
				}
			];
			this.hallway.objects = this.attachGateways('hallway', this.hallway.objects);
		}

		this.attachObjects(this.hallway.objects);

		$('body').trigger('textbox', [this.hallway.intro]);
	}

	kitchen() {
		this.newSetting();
		let setting = "kitchen";
		$('body').trigger('showBackground', setting + '.png');

		if (this.kitchen.init == undefined) {
			this.kitchen.init = true;

			this.kitchen.intro = "I'm sure I imagined it, but.. did a white rabbit just jump into the rubbish bin?";

			this.kitchen.objects = [
				{
					name: 'Fridge',
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					actions: {
						open: {
							done: false,
							outcome: "The house is too warm, if I open the fridge things will cool down."
						},
						search: {
							done: false,
							outcome: "I really need to do some shopping."
						}
					}
				},
				{
					name: 'Cupboard',
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					actions: {
						open: {
							done: false,
							outcome: "I'm sure there's a card here somewhere"
						},
						search: {
							done: false,
							outcome: "This is where I keep my Plates and Bowls"
						}
					}
				},
				{
					name: 'Cupboard',
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					actions: {
						open: {
							done: false,
							outcome: "I'm sure there's a card here somewhere"
						},
						search: {
							done: false,
							outcome: "This is where I keep Pots and Pans"
						}
					}
				},
				{
					name: 'Cupboard',
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					actions: {
						open: {
							done: false,
							outcome: "I'm sure there's a card here somewhere"
						},
						search: {
							done: false,
							outcome: "This is where I keep Cutlery"
						}
					}
				},
				{
					name: 'Cupboard',
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					actions: {
						open: {
							done: false,
							outcome: "I'm sure there's a card here somewhere"
						},
						search: {
							done: false,
							outcome: "This is where I keep Cups and Glasses"
						}
					}
				},
				{
					name: 'Cupboard',
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					actions: {
						open: {
							done: false,
							outcome: "I'm sure there's a card here somewhere"
						},
						search: {
							done: false,
							outcome: "This is where I keep things I never use...  Everyone has a draw like this in their house."
						}
					}
				},
				{
					name: 'Bowl of Fruit',
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					actions: {
						search: {
							done: false,
							outcome: "Theres a Catipillar eating this Apple!  I should throw it away",
							newCard: ['badApple']
						}
					}
				},
				{
					name: 'Rubbish bin',
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					actions: {
						open: {
							done: false,
							outcome: "There's something strange about this bin, it's.... really deep.",
						},
						badApple: {
							done: false,
							outcome: "I dropped the apple in the bin, but it just keeps falling and falling?  how deep is this bin?"
						},
						search: {
							done: false,
							outcome: "Oh! I found one of the missing letters...  And why is this card in the rubbish bin? I'll need this.",
							newCard: ['missingLetter1', 'door']
						}
					}
				},
				{
					name: 'Window',
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					actions: {
						open: {
							done: false,
							outcome: "That's better, some fresh air."
						},
						use: {
							done: false,
							outcome: "It looks really beautiful outside!"
						},
						push: {
							done: false,
							outcome: "I.... I.. I pushed him out the window?  bu...but I didn't hear him hit the ground? I really have gone mad...",
							callback: function () {
								this.finishGame('push');
							}
						}
					}
				}
			];
			this.kitchen.objects = this.attachGateways('kitchen', this.kitchen.objects);
		}

		this.attachObjects(this.kitchen.objects);

		$('body').trigger('textbox', [this.kitchen.intro]);
	}

	smallKitchen() {
		this.newSetting();
		let setting = "smallKitchen";
		$('body').trigger('showBackground', setting + '.png');

		if (this.smallKitchen.init == undefined) {
			this.smallKitchen.init = true;

			this.smallKitchen.intro = "I'm sure I imagined it, but.. did a white rabbit just jump into the rubbish bin?";

			this.smallKitchen.objects = [
				{
					name: 'Fridge',
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					actions: {
						search: {
							done: false,
							outcome: `I found a pack of "Push" cards!`,
							newCard: ['push']
						}
					}
				}
			];
			this.smallKitchen.objects = this.attachGateways('smallKitchen', this.smallKitchen.objects);
		}

		this.attachObjects(this.smallKitchen.objects);

		$('body').trigger('textbox', [this.smallKitchen.intro]);
	}

	bedroom() {
		this.newSetting();
		let setting = "bedroom";
		$('body').trigger('showBackground', setting + '.png');

		if (this.bedroom.init == undefined) {
			this.bedroom.init = true;

			this.bedroom.intro = "Mad, quite mad!  I simply must lay down.";

			this.bedroom.objects = [
				{
					name: 'Bed',
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					actions: {
						use: {
							done: false,
							outcome: "I lay down for a while, but I just can't fall asleep"
						},
						search: {
							done: false,
							outcome: "Well now the beds a mess and I didn't find anything."
						}
					}
				},
				{
					name: 'Dresser',
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					actions: {
						open: {
							done: false,
							outcome: "My dresser has a secret cubbyhole in the top"
						},
						search: {
							done: false,
							outcome: `I don't remember these?  A bottle with a tag "Drink Me" and a cake with icing that says "Eat Me"`,
							newCard: ['shrink', 'grow']
						}
					}
				}
			];
			this.bedroom.objects = this.attachGateways('bedroom', this.bedroom.objects);
		}

		this.attachObjects(this.bedroom.objects);

		$('body').trigger('textbox', [this.bedroom.intro]);
	}

	door() {
		this.newSetting();
		let setting = "door";
		$('body').trigger('showBackground', setting + '.png');

		if (this.door.init == undefined) {
			this.door.init = true;

			this.door.intro = "I'm sure I imagined it, but.. did a white rabbit just jump into the rubbish bin?";

			this.door.objects = [
				{
					name: 'Bookshelf',
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					actions: {
						use: {
							done: false,
							outcome: "I've found another one of the letters he wrote me, I'll take this with me as well.",
							newCard: ['missingLetter2']
						},
						search: {
							done: false,
							outcome: "This is my favourite book, it's Alice in Wonderland.  I've always loved the Cheshire Cat!",
							newCard: ['bookAlice']
						}
					}
				},
				{
					name: 'Door',
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					actions: {
						open: {
							done: false,
							outcome: "The door is locked (from the inside)."
						},
						glassKey: {
							done: false,
							outcome: "I've unlocked the door",
							callback: function () {
								this.finishGame('glassKey');
								// outcome: "I walk outside with the letters, breath deeply the fresh air.  I've been inside that house for too long.  The fog in my head is lifting already and the world is normal again.",
							}
						}
					}
				},
				{
					name: 'Bowl of keys',
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					actions: {
						search: {
							done: false,
							outcome: "The keys not here.  It's an old glass key"
						}
					}
				}
			];
			this.door.objects = this.attachGateways('door', this.door.objects);
		}

		this.attachObjects(this.door.objects);

		$('body').trigger('textbox', [this.door.intro]);
	}

	smallDoor() {
		this.newSetting();
		let setting = "smallDoor";
		$('body').trigger('showBackground', setting + '.png');

		if (this.smallDoor.init == undefined) {
			this.smallDoor.init = true;

			this.smallDoor.intro = "I'm sure I imagined it, but.. did a white rabbit just jump into the rubbish bin?";

			this.smallDoor.objects = [
				{
					name: 'Bookshelf',
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					actions: {
						search: {
							done: false,
							outcome: "There's something sparkling under the bookshelf.  I hope it's not too dusty under there",
							newCard: ['glassKey']
						},
					}
				}
			];
			this.smallDoor.objects = this.attachGateways('smallDoor', this.smallDoor.objects);
		}

		this.attachObjects(this.smallDoor.objects);

		$('body').trigger('textbox', [this.smallDoor.intro]);
	}

	attachDialogue() {
		this.dialogues = {
			scene1dialogue1: "Growing up I always loved the Chesire cat, I guess it's because of this painting."
		};
	}

	attachGateways(room, objects) {
		let push = {};
		switch (room) {
			case 'hallway':
				push = {
					name: 'gateway',
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					actions: {
					}
				};
				push = this.attachGatewayNormal(push);
				objects.push(push);
				break;
			case 'kitchen':
				push = {
					name: 'gateway',
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					actions: {
						shrink: {
							done: false,
							outcome: "I took a sip from the bottle and suddenly I'm no more than the height of a shoe?",
							callback(dom, act) {
								// reset this's done flag
								act.done = false;
								window.game.kitchen();

							}
						}
					}
				}
				push = this.attachGatewayNormal(push);
				objects.push(push);
				break;
			case 'bedroom':
				push = {
					name: 'gateway',
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					actions: {
					}
				};
				push = this.attachGatewayNormal(push);
				objects.push(push);
				break;
			case 'door':
				push = {
					name: 'gateway',
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					actions: {
						shrink: {
							done: false,
							outcome: "I took a sip from the bottle and suddenly I'm no more than the height of a shoe?",
							callback(dom, act) {
								// reset this's done flag
								act.done = false;
								window.game.kitchen();

							}
						}
					}
				}
				push = this.attachGatewayNormal(push);
				objects.push(push);
				break;
			case 'smallDoor':
				push = {
					name: 'gateway',
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					actions: {
						grow: {
							done: false,
							outcome: "I took a couple of bits of the cake and all of a sudden I'm tall again?!? Seriously fattening cake!",
							callback(dom, act) {
								// reset this's done flag
								act.done = false;
								window.game.door();
							}
						},
					}
				}
				objects.push(push);
				break;
			case 'smallKitchen':
				push = {
					name: 'gateway',
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					actions: {
						grow: {
							done: false,
							outcome: "I took a couple of bits of the cake and all of a sudden I'm tall again?!? Seriously fattening cake!",
							callback(dom, act) {
								// reset this's done flag
								act.done = false;
								window.game.kitchen();

							}
						}
					}
				}
				objects.push(push);
				break;
		}
		
		console.log(objects);

		return objects;
	}

	attachGatewayNormal(push) {
		push.actions.hallway = {
			done: false,
			callback(dom, act) {
				act.done = false;
				window.game.hallway();
			}
		}
		push.actions.kitchen = {
			done: false,
			callback(dom, act) {
				act.done = false;
				window.game.kitchen();
			}
		}
		push.actions.bedroom = {
			done: false,
			callback(dom, act) {
				act.done = false;
				window.game.bedroom();
			}
		}
		push.actions.door = {
			done: false,
			callback(dom, act) {
				act.done = false;
				window.game.door();
			}
		}
		return push;
	}
}