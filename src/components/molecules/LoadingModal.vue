<template>
	<base-modal v-bind="$attrs" v-on="$listeners">
		<template v-slot:body>
			<modal-body-info :title="title" :description="description">
				<template v-slot:icon>
					<base-spinner :color="color" size="large" />
				</template>
			</modal-body-info>
		</template>
		<template v-slot:footer>
			<center-slot class="mb--md">
				<base-button design="primary" @click="$emit('update:active', false)">
					{{ btnText }}
				</base-button>
			</center-slot>
		</template>
	</base-modal>
</template>
<script>
import ModalBodyInfo from "@components/molecules/ModalBodyInfo";
import CenterSlot from "@components/atoms/CenterSlot";
export default {
	components: {
		ModalBodyInfo,
		CenterSlot,
	},
	props: {
		color: {
			type: String,
			default: "var(--color-primary)",
		},
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		btnText: {
			type: String,
			default: function () {
				return this.$t("common.actions.cancel");
			},
		},
	},
	data() {
		// This solely exists to appear in the coverage report
		return {};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
</style>
