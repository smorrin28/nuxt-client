<template>
	<div>
    <base-breadcrumb :inputs="breadcrumbs"></base-breadcrumb>
    <section v-if="!relationshipId">
      <h2 class="h2">QR-Code scannen</h2>
      Scanne diesen QR-Code mit deiner Wallet-App auf deinem Smartphone. Schließe
      dort dann die Verbindungsanfrage ab und wenn du dort bestätigt hast, klicke
      hier auf "Verbindung abschließen".
      <div>
        <div v-if="qrcode" class="qrcode">
          <img :src="qrcode" />
        </div>
        <base-button
            v-if="templateID"
            design="success"
            class="w-100"
            :disabled="disabled"
            @click="acceptRequest"
        ><base-icon source="material" icon="check"/>Verbindung
          abschließen</base-button
        >
      </div>
    </section>
		<section v-else>
      <h2 class="h2">Verbindung abgeschlossen!</h2>
      Du hast dein Wallet erfolgreich verbunden. Dokumente kannst du nun problemlos in dieses hochladen und bekommst sie somit automatisch in der entsprechenden App angezeigt.
      <br><br>
      <base-button class="w-100" design="primary outline" to="/wallet/upload">
        <base-icon source="material" icon="ic_default" />Erstes Dokument in Wallet hochladen
      </base-button>
      <base-button design="success" to="/wallet" class="w-100 mt--sm"
      ><base-icon source="material" icon="check" />Zurück zur Übersicht</base-button
      >
    </section>
	</div>
</template>

<script>
export default {
	async asyncData({ store }) {
		const relationshipTemplate = await store.dispatch("wallet/create");

		console.log(relationshipTemplate.templateID);

		return {
			templateID: relationshipTemplate.templateID, // example data: "RLTsml0Y9aSbTRXar37R"
			qrcode: "data:image/png;base64," + relationshipTemplate.qrcode,
		};
	},
	data() {
		return {
			relationshipId: null, // example data: "RELD7ODGMtaz8XW1zbEO"
			message: null,
			file: null,
      disabled: true,
			breadcrumbs: [
				{
					text: "Neues Wallet verbinden",
					to: "/wallet",
					icon: {
						source: "material",
						icon: "uid",
					},
				},
				{
					text: "QR-Code scannen",
					icon: {
						source: "fa",
						icon: "qrcode",
					},
				}
			],
		};
	},
  mounted() {
    setTimeout(() => { this.disabled = false }, 1000*10)
  },
	methods: {
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
					relationshipId: this.relationshipId,
				},
			]);

			console.log(user);

			if (this.relationshipId) {
				console.log(this.relationshipId);

				this.breadcrumbs.push({
          text: "Verbindung abschließen",
          icon: {
            source: "material",
            icon: "check",
          },
        })
			} else {
				console.log("Relationship has to be requested in the IDAS-app!");
				this.$toast.error(
					"Du musst erst in der App die Kontaktanfrage abschließen!"
				);
			}
		},

		saveFile(event) {
			this.file = event.target.files[0];
			console.log(this.file);
		}
	},
	head() {
		return {
			title: "Neues Wallet verbinden",
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.qrcode {
	/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
	padding-top: 30px;
	text-align: center;
}
</style>
