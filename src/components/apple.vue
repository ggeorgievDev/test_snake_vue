<template>
	<div id="apple" :style="appleStyles"></div>
</template>

<script>

export default {

	name : 'apple',

	props : [ 'baseColsize', 'maxHeight', 'maxWidth' ],

	data() {
		return ( {
			position : null,
			maxCols  : this.maxWidth / this.baseColsize,
			maxRows  : this.maxHeight / this.baseColsize,
		} );
	},

	computed : {
		appleStyles() {
			if ( ! this.position ) {
				return;
			}

			return {
				position : 'absolute',
				zIndex : 100,
				width : this.baseColsize + 'px',
				height : this.baseColsize + 'px',
				top : this.position.y + 'px',
				left : this.position.x + 'px',
				background : '#a60b98'
			}
		}
	},

	methods : {
		setApplePosition() {
			let col = this.getRandom( this.maxCols );

			let row = this.getRandom( this.maxRows );

			this.position = {
				x : col * this.baseColsize,
				y : row * this.baseColsize,
			};

			this.$emit( 'positioned', this.position );
		},

		getRandom( max ) {
			let realMax = max - 1;
			return Math.round( Math.random() * ( realMax - 1 ) + 1 );
		},
	},

	mounted() {
		this.setApplePosition();
	}

}

</script>