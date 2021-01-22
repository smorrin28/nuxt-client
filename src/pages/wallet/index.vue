<template>
	<div>
		<h2 class="h2">Digitales Wallet</h2>
    Verbinde jetzt dein kompatibles Wallet mit deinem Account und lege fest, welche Daten du sicher und langfristig speichern möchtest.<br/><br/>
    Noch kein Wallet: Hier findest du eine Liste von Anbietern.
    <div class="selection">
      <base-input
          type="checkbox"
          label="Manuelles Teilen von Daten Lehrkräfte und die Schul/Cloud selbst können dir Dateien an Deine Wallet senden. Du kannst diese Dateien dann jeweils einzeln speichern oder verwerfen."/>
      <base-input
          type="checkbox"
          label="Lernportfolio: Speicher dein Lernportfolio automatisch in deiner Wallet."/>
      <base-input
          type="checkbox"
          label="Zeugnisse und Zertifikate"/>
      <base-input
          type="checkbox"
          label="Learning Analytics: Speicher dir Daten über deine Nutzung von Bildungsmedien."/>
    </div>
    <div>
      <base-button design="primary" @click="connectWallet"
        ><base-icon source="material" icon="add" />Wallet verbinden</base-button
      >
      <div v-if="qrcode">
        <img :src="qrcode" class="qrcode" />
      </div>
      <base-button v-if="templateID" design="success" @click="acceptRequest"
        ><base-icon source="material" icon="check" />Anfrage annehmen</base-button
      >
      <div v-if="relationshipId">
        <input type="file" @change="saveFile" />
      </div>
      <base-button v-if="file" design="primary outline" @click="uploadDocument"
        ><base-icon source="material" icon="ic_default" />Dokument
        hochladen</base-button
      >
    </div>
	</div>
</template>

<script>
export default {
	async fetch() {},
	data() {
		return {
			templateID: "RLTsml0Y9aSbTRXar37R", // example data
			qrcode: null,
			relationshipId: "RELD7ODGMtaz8XW1zbEO", // example data
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
			this.relationshipId = await this.$store.dispatch("wallet/update", [
				null,
				{
					templateID: this.templateID,
				},
			]);

			const user = await this.$store.dispatch("users/patch", [
			    this.$user._id,
        {
          relationshipId: this.relationshipId
        }
      ]);

      console.log(user)

			if (this.relationshipId) {
				console.log(this.relationshipId);
			} else {
				console.log("Relationship has to be requested in the IDAS-app!");
        this.$toast.error('Du musst erst in der App die Kontaktanfrage abschließen!');
      }
		},

		saveFile(event) {
			this.file = event.target.files[0];
			console.log(this.file);
		},

		async uploadDocument() {
			this.message = await this.$store.dispatch("wallet/sendFile", {
				title: "Sprachzertifikat",
				description: "B1-Zertifikat DAAD",
				file: this.file,
			});

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

.selection {
  margin-top: var(--space-xl)
}

.qrcode {
	/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
	padding-top: 30px;
}
</style>
