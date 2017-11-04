<template>
	<div>
		<h1 v-if="!started" @click="startGame()">
			<span class="game-over" v-if="gameOver">
				Game Over
			</span>

			Click to start
		</h1>

		<background
			:baseColsize="baseColsize"
			:maxHeight="maxHeight"
			:maxWidth="maxWidth"
		>
			<apple
				v-show="started"
				ref="apple"
				:baseColsize="baseColsize"
				:maxHeight="maxHeight"
				:maxWidth="maxWidth"
				@positioned="updateApplePosition"
			/>
			<player
				v-show="started"
				ref="player"
				:baseColsize="baseColsize"
				:maxHeight="maxHeight"
				:maxWidth="maxWidth"
				:apple="applePosition"
				@eaten="generateApple"
				@gameOver="stopGame"

			/>
		</background>
	</div>
</template>

<script>

import Background from './components/background';
import Player from './components/player';
import Apple from './components/apple';

export default {
	name : 'game',

	components : {
		Background,
		Player,
		Apple,
	},

	data() {
		return {
			started     : false,
			data        : false,
			gameOver 	: false,
			baseColsize : 30,
			applePosition : {},
		}
	},

	computed : {
		maxHeight() {
			let winHeight = window.innerHeight;

			return winHeight - ( winHeight % this.baseColsize );
		},

		maxWidth() {
			let winWidth = window.innerWidth;

			return winWidth - ( winWidth % this.baseColsize );
		},
	},

	methods : {
		updateApplePosition( applePosition ) {
			this.applePosition = applePosition;
		},

		generateApple() {
			this.$refs.apple.setApplePosition();;
		},

		startGame() {
			this.started = true;

			if ( this.gameOver ) {
				this.$refs.player.restart();
				this.generateApple();
				this.gameOver = false;
			}
		},

		stopGame() {
			this.started = false;
			this.gameOver = true;
		}
	}

}

</script>

<style>

h1 {position: absolute; color: #9c27b0; text-transform: uppercase; left: 50%; top: 40%; transform: translate( -50%, -50%); font-family: monospace; }

.game-over { color: #311b92; display: block; text-align: center; padding-bottom: 20px;}

</style>