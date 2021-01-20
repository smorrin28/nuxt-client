<template>
	<div>
		<h1 class="mb--md h3">Digitales Wallet</h1>
		<base-button design="primary" @click="connectWallet"
			><base-icon source="material" icon="add" />Wallet verbinden</base-button
		>
		<div v-if="qrcode">
			<img :src="qrcode" class="qrcode" />
		</div>
		<base-button v-if="templateID" design="success" @click="acceptRequest"
			><base-icon source="material" icon="check" />Anfrage annehmen</base-button
		>
		<input v-if="relationshipID" type="file" @change="saveFile" />
		<base-button v-if="file" design="primary outline" @click="uploadDocument"
			><base-icon source="material" icon="ic_default" />Dokument
			hochladen</base-button
		>
	</div>
</template>

<script>
export default {
	async fetch() {},
	data() {
		return {
			templateID: null,
			qrcode: null,
			relationshipID: null,
			message: null,
			file: null,
		};
	},
	methods: {
		async connectWallet() {
			const relationshipTemplate = await this.$store.dispatch("wallet/create");

			this.templateID = relationshipTemplate.templateID;
			this.qrcode = "data:image/png;base64," + relationshipTemplate.qrcode;

			console.log(this.templateID);
		},

		async acceptRequest() {
			this.relationshipID = await this.$store.dispatch("wallet/update", [
				null,
				{
					templateID: this.templateID,
				},
			]);

			console.log(this.relationshipID);
		},

		saveFile(event) {
			this.file = event.target.files[0];
			console.log(this.file);
		},

		async uploadDocument() {
			//TODO: multipart/form-data has to be used
			this.message = await this.$store.dispatch("wallet/patch", [
				null,
				{
					relationshipID: this.relationshipID,
					title: "Sprachzertifikat",
					description: "B1-Zertifikat DAAD",
					file: this.file,
				},
			]);

			console.log(this.message);
		},
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
