<template>
	<div>
		<h1 class="mb--md h3">Schüler:innen</h1>
		Du kannst hier die Wallets aller Schüler:innen verwalten. Dafür musst du
		einfach nur den entsprechenden Schüler auswählen und kannst dann ein
		Dokument deiner Wahl in das Wallet hochladen.
		<backend-data-table>
			<!-- TODO -->
		</backend-data-table>
	</div>
</template>

<script>
import UserHasPermission from "@mixins/UserHasPermission";

export default {
	layout: "loggedInFull",
	mixins: [UserHasPermission],
	meta: {
		requiredPermissions: ["STUDENT_LIST"],
	},
	head() {
		return {
			title: "Schüler-Wallets",
		};
	},
};
</script>
