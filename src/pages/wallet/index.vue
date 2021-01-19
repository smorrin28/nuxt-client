<template>
	<div>
		<h1 class="mb--md h3">Digitales Wallet</h1>
		<base-button design="primary" @click="connectWallet"
			><base-icon source="material" icon="add" />Wallet verbinden</base-button
		>
		<div v-if="qrcode">
			<img :src="qrcode" class="qrcode" />
		</div>
    <base-button design="success" @click="acceptRequest"
      ><base-icon source="material" icon="check" />Anfrage annehmen</base-button
    >
    <div v-if="request">
      {{ request }}
    </div>
    <base-button design="primary outline" @click="uploadDocument"
      ><base-icon source="material" icon="ic_default" />Dokument hochladen</base-button
    >
	</div>
</template>

<script>
export default {
	async fetch() {},
	data() {
		return {
			qrcode: null,
      request: null
		};
	},
	methods: {
		async connectWallet() {
			this.qrcode =
				"data:image/png;base64," +
				(await this.$store.dispatch("wallet/create"));
		},

    async acceptRequest() {
		  this.request = await this.$store.dispatch("wallet/update");
    },

    async uploadDocument() {

    }
	},
	head() {
		return {
			title: "Digitales Wallet",
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.qrcode {
	/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
	padding-top: 30px;
}
</style>
