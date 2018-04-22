// Compound object - Should include 'services'
class game extends campeign {
	constructor(iWantToPlay) {
		super();

		// $('body').trigger('showBackground', ['menu.png']);
		// $('body').trigger('showMenu');
		// $('body').trigger('showTextbox');
		// $('body').trigger('enableGyroBackground');

		// this.menu = {};
		// this.menu.background = "menu.png";

		// this.menu.show = function () {
		// 	swal({
		// 		title: 'Menu',
		// 		html: `<div id="menu">
		// 						Welcome to the Rose Guarden<br />
		// 						<button class="btn btn-info col unitMargin">New Game</button><br />
		// 						<button class="btn btn-info col unitMargin">Load Game</button><br />
		// 						<button class="btn btn-info col unitMargin">Settings</button><br />
		// 						<button class="btn btn-info col unitMargin">Credits</button>
		// 					</div>`,
		// 		showConfirmButton: false
		// 	});
		// };

		// $('body').on('click', '#menu > button', (event) => {
		// 	this.menu[$(event.target).text().replace(/\s/g, '')]();
		// });

		// this.menu.NewGame = function (event) {
		// 	console.log("New Game", event);
		// }
		// this.menu.LoadGame = function (event) {
		// 	console.log("Load Game", event);
		// }
		// this.menu.Settings = function (event) {
		// 	console.log("Settings", event);
		// }
		// this.menu.Credits = function (event) {
		// 	console.log("Credits", event);
		// }

		this.start();
	}
};