<template>
	<div>
		<h1 class="mb--md h3">Digitales Wallet</h1>
		<div>
			{{ res }}
		</div>
	</div>
</template>

<script>
export default {
	async fetch() {
		this.res = await this.$store.dispatch("wallet/find");
	},
	data() {
		return {
			res: null,
		};
	},
	head() {
		return {
			title: "Digitales Wallet",
		};
	},
};
</script>
