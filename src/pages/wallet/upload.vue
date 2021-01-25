<template>
  <div>
    <h1 class="mb--md h3">Neue Datei in Wallet hochladen</h1>
    Hier kannst du eine Datei auswählen, welche Datei du in dein Wallet hochladen möchtest. Dazu musst du einen aussagekräftigen Titel angeben, unter welchem die Datei auch in deine Wallet erscheinen wird. Die Kurzbeschreibung soll hierbei wichtige Zusatzinformationen geben.
    <form @submit.prevent="uploadDocument">
      <base-input
          v-model="title"
          type="text"
          label="Titel"
          placeholder="Titel"
          class="mt--md"
          required="true">

        <template v-slot:icon>
          <base-icon
              source="material"
              icon="edit"
          />
        </template>

      </base-input>

      <base-input
          v-model="description"
          type="text"
          label="Beschreibung"
          placeholder="Beschreibung"
          class="mt--md"
          required="true">

        <template v-slot:icon>
          <base-icon
              source="material"
              icon="ic_default"
          />
        </template>

      </base-input>

      <input type="file" @change="saveFile"/>

      <base-button :disabled="!file" type="submit" class="w-100 mt--md" design="primary"
      ><base-icon source="material" icon="ic_default" />Dokument
        hochladen</base-button
      >

      <base-button class="w-100 mt--sm" design="outline" text @click.prevent="$router.go(-1)"
      >Abbrechen</base-button
      >
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: null,
      title: "Sprachzertifikat",
      description: "B1-Zertifikat"
    }
  },
  methods: {
    saveFile(event) {
      this.file = event.target.files[0];
      console.log(this.file);
    },
    async uploadDocument() {
      this.message = await this.$store.dispatch("wallet/sendFile", {
        title: this.title,
        description: this.description,
        file: this.file,
      });

      console.log(this.message);
    }
  },
  head() {
    return {
      title: "Datei in Wallet hochladen"
    }
  }
}
</script>
