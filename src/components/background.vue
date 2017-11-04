<template>
	<div 
		id="background" 
		:style="backgroundStyles"
	>
		<slot />
	</div>
</template>

<script>

export default {

	name : 'background',

	props : [ 'baseColsize', 'maxHeight', 'maxWidth' ],

	data() {
		return {
			backgroundStyles : {
				position   : 'relative',
				zIndex     : -100,
				background : '#ec87bd',
				height     : this.maxHeight + 'px',
				width      : this.maxWidth + 'px',
				margin     : '0 auto',
			},	
		};
	},

}

</script>