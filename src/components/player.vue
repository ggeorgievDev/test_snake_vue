<template>
	<div id="player">
		<div 
			class="player-block" 
			v-for="block in length" 
			:style="{
				position : 'absolute',
				top : calculatePosition( block, 'y' ) + 'px',
				left : calculatePosition( block, 'x' ) + 'px',
				width : blocksize + 'px',
				height : blocksize + 'px',
				background : '#00ff01',
				zIndex : '-' + block,
			}"
		></div>
	</div>
</template>

<script>

import { find } from 'lodash';

export default {

	name : 'player',

	props : [ 'baseColsize', 'maxHeight', 'maxWidth', 'apple' ],

	data() {
		return this.setup();
	},

	methods : {
		setup() {
			return {
				justSwitched : false,
				boundries : {
					x : this.maxWidth,
					y : this.maxHeight,
				},
				position : [
					{
						x : this.baseColsize,
						y : this.baseColsize,
					}
				],
				length : 5,
				direction : {
					x : 1,
					y : 0,
				},
				speed : this.baseColsize,
				blocksize : this.baseColsize,
				controls : {
					37 : {
						x : -1,
						y : 0,
					},
					38 : {
						x : 0,
						y : -1,
					},
					39 : {
						x : 1,
						y : 0,
					},
					40 : {
						x : 0,
						y : 1,
					},
				},
			};
		},

		changeDirection( event ) {
			if ( this.justSwitched ) {
				return;
			}

			let code = String( event.keyCode );

			if ( Object.keys( this.controls ).indexOf( code ) < 0 ) {
				return;
			}

			let isOpposite = ( 
				this.direction.x === ( this.controls[ code ].x * -1 )
			) || ( this.direction.y === ( this.controls[ code ].y * -1 )
			)

			if ( isOpposite ) {
				return;
			}

			this.justSwitched = true;
			this.direction = this.controls[ code ];
		},

		initPlayer() {
			setInterval( () => {
				let newPosition = {
					x : this.calcNextPosition( 'x' ),
					y : this.calcNextPosition( 'y' ),
				};

				if ( this.hasDied( newPosition ) ) {
					this.$emit( 'gameOver' );
					return;
				}

				this.hasEaten( newPosition );

				this.position.unshift( newPosition );

				if ( this.justSwitched ) {
					this.justSwitched = false;
				}

				if ( this.position.length > this.length ) {
					this.position.pop();
				}
			}, 1000 / 10 );
		},

		calcNextPosition( orientation ) {
			let nextPosition = this.position[0][ orientation ] + this.direction[ orientation ] * this.speed;

			if ( ( nextPosition + this.speed ) > this.boundries[ orientation ] ) {
				nextPosition = 0
			}

			if ( nextPosition < 0 ) {
				nextPosition = this.boundries[ orientation ] - this.speed;
			}

			return nextPosition;
		},

		calculatePosition( index, orientation ) {
			if ( orientation !== 'x' && orientation !== 'y' ) {
				return 0;
			}

			let blockIndex = index - 1;
			
			if ( typeof this.position[ blockIndex ] === 'undefined' ) {
				return this.baseColsize;
			}

			return this.position[ blockIndex ][ orientation ];
		},

		hasEaten( newPosition ) {
			let eaten = newPosition.x === this.apple.x && newPosition.y === this.apple.y;

			if ( eaten ) {
				this.length++;
				this.$emit( 'eaten' );
			}
		},

		hasDied( newPosition ) {
			let died = find( this.position, position => {
				return position.x === newPosition.x 
				&& position.y === newPosition.y 
			} );

			return typeof died !== 'undefined';
		},

		restart() {
			let baseData = this.setup();
			this.$data.position = baseData.position;
			this.$data.length = baseData.length;
		}
	},

	mounted() {
		document.addEventListener( 'keydown', this.changeDirection );

		this.initPlayer();
	},
}	

</script>

<style>

#player {}
#player:after { content: ''; display: table; clear: both; width: 100%; }

#player .player-block { border: 1px solid #00ff01;}
	
</style>