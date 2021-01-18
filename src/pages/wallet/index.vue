<template>
	<div>
		<h1 class="mb--md h3">Digitales Wallet</h1>
		<base-button design="primary" @click="connectWallet"
			><base-icon source="material" icon="add" />Wallet verbinden</base-button
		>
		<div v-if="qrcode">
			<img :src="qrcode" />
		</div>
	</div>
</template>

<script>
export default {
	async fetch() {},
	data() {
		return {
			qrcode: null,
		};
	},
	methods: {
		async connectWallet() {
			this.qrcode =
				"data:image/png;base64," +
				(await this.$store.dispatch("wallet/create"));
		},
	},
	head() {
		return {
			title: "Digitales Wallet",
		};
	},
};
</script>
