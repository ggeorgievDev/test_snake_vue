class PlayerControls {

	constructor( elemId ) {
		this.element = document.getElementById( elemId );
		this.direction = '';


		document.addEventListener( 'keydown', this.controlsListener );
	}

	controlsListener( event ) {
		switch( event.key ) {
			case 38 :
				this.direction = 'up'; 
			break;

			case 39 :
				this.direction = 'right'; 
			break;

			case 40 :
				this.direction = 'down'; 
			break;

			case 41 : 
				this.direction = 'left';
			break;
		} 
	}

	get direction() {
		return this.direction;
	}


}

export default PlayerControls;