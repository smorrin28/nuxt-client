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
		this.res = await fetch(
			"https://daad.idas.solutions/api/v1/RelationshipTemplates",
			{
				mode: "no-cors",
				headers: {
					"X-API-KEY": process.env.IDAS_API_KEY,
				},
			}
		).catch((error) => {
			console.log(error);
		});

		console.log(this.res);
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
