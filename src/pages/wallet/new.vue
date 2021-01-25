<template>
  <div>
    <base-breadcrumb :inputs="breadcrumbs"></base-breadcrumb>
    <h2 class="h2">QR-Code scannen</h2>
    Scanne diesen QR-Code mit deiner Wallet-App auf deinem Smartphone. Schließe dort dann die Verbindungsanfrage ab und wenn du dort bestätigt hast, klicke hier auf "Verbindung abschließen".
    <div>
      <div v-if="qrcode" class="qrcode">
        <img :src="qrcode" />
      </div>
      <base-button v-if="templateID" design="success" class="w-100" @click="acceptRequest"
      ><base-icon source="material" icon="check" />Verbindung abschließen</base-button
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
  async asyncData({ store }) {
    const relationshipTemplate = await store.dispatch("wallet/create");

    console.log(relationshipTemplate.templateID);

    return {
      templateID: relationshipTemplate.templateID, // example data: "RLTsml0Y9aSbTRXar37R"
      qrcode: "data:image/png;base64," + relationshipTemplate.qrcode
    }
  },
  data() {
    return {
      relationshipId: "RELD7ODGMtaz8XW1zbEO", // example data
      message: null,
      file: null,
      breadcrumbs: [
        {
          text: "Neues Wallet verbinden",
          to: "/wallet",
          icon: {
            source: "material",
            icon: "uid"
          }
        },
        {
          text: "QR-Code scannen",
          icon: {
            source: "fa",
            icon: "qrcode"
          }
        },
        {
          text: "Verbindung abschließen",
          icon: {
            source: "material",
            icon: "check"
          }
        }
      ]
    };
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
  head(){
    return {
      title: "Neues Wallet verbinden"
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@styles";

.qrcode {
  /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
  padding-top: 30px;
  text-align: center;
}
</style>
