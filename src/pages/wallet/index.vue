<template>
	<div>
		<h2 class="h2">Digitales Wallet</h2>
		Verbinde jetzt dein kompatibles Wallet mit deinem Account und lege fest,
		welche Daten du sicher und langfristig speichern möchtest.<br /><br />
		Noch kein Wallet: Hier findest du eine Liste von Anbietern.
		<div class="selection">
			<base-input
				type="checkbox"
				label="Manuelles Teilen von Daten"
			/>
			<base-input
				type="checkbox"
				label="Lernportfolio: Speicher dein Lernportfolio automatisch in deiner Wallet."
			/>
			<base-input type="checkbox" label="Zeugnisse und Zertifikate" />
			<base-input
				type="checkbox"
				label="Learning Analytics: Speicher dir Daten über deine Nutzung von Bildungsmedien."
			/>
		</div>
    <base-button design="primary" to="/wallet/new"
    ><base-icon source="material" icon="add" />Wallet verbinden</base-button
    >
	</div>
</template>

<script>
export default {
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
	margin-top: var(--space-xl);
}
</style>
