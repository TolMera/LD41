class campeign extends gameView {
	constructor() {
		// super();
		console.log(this);
	}
	
	start() {
		$('body').trigger('showBackground', ['menu.png']);
		$('body').trigger('showMenu');
		$('body').trigger('showTextbox');
		$('body').trigger('enableGyroBackground');
	}
}