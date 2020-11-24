<template>
	<div>
		<h3 class="title-class">
			{{ $t("pages.administration.ldap.classes.title") }}
		</h3>
		<base-input
			v-model="unchecked"
			type="switch"
			datatest-id="ldapDataClassesCheckbox"
			:label="$t('pages.administration.ldap.classes.sctivate.import')"
		>
		</base-input>
		<p class="title-class">
			{{ $t("pages.administration.ldap.classes.path.subtitle") }}
		</p>
		<base-input
			data-testid="ldapDataClassesPath"
			:vmodel="value.classPathAdditions"
			:disabled="unchecked === false"
			type="text"
			class="mt--xl"
			:placeholder="$t('pages.administration.ldap.classes.path.title')"
			:label="$t('pages.administration.ldap.classes.path.title')"
			:info="$t('pages.administration.ldap.classes.path.info')"
			:validation-model="$v.value.classPathAdditions"
			:validation-messages="classPathAdditionsValidationMessage"
			datatest-id="ldapDataClassesclassPathAdditions"
			@update:vmodel="$emit('input', { ...value, classPathAdditions: $event })"
		/>
		<p class="title-class">
			{{ $t("pages.administration.ldap.users.hint") }}
		</p>
		<base-input
			data-testid="ldapDataClassesDescription"
			:vmodel="value.description"
			:disabled="unchecked === false"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.classes.notice.title')"
			:validation-model="$v.value.description"
			:validation-messages="classesValidationMessage"
			datatest-id="ldapDataClassesDescription"
			@update:vmodel="$emit('input', { ...value, description: $event })"
		/>
		<base-input
			data-testid="ldapDataClassesNameuniqueMember"
			:vmodel="value.uniqueMember"
			:disabled="unchecked === false"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.classes.participant.title')"
			:validation-model="$v.value.description"
			:validation-messages="classesValidationMessage"
			datatest-id="ldapDataClassesParticipantsAttribute"
			@update:vmodel="$emit('input', { ...value, uniqueMember: $event })"
		/>
	</div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { ldapPathValidationRegex } from "@utils/ldapValidationRegex";

export default {
	// eslint-disable-next-line vue/require-prop-types
	props: {
		value: {
			type: Object,
			default() {
				return {};
			},
		},
		validate: {
			type: Boolean,
		},
	},
	data() {
		return {
			unchecked: false,
			classesValidationMessage: [
				{ key: "required", message: this.$t("common.validation.required") },
			],
			classPathAdditionsValidationMessage: [
				{
					key: "ldapPathValidationRegex",
					message: this.$t("pages.administration.ldapEdit.validation.path"),
				},
				{ key: "required", message: this.$t("common.validation.required") },
			],
		};
	},
	watch: {
		validate: function () {
			this.$v.$touch();
			this.$emit("update:errors", this.$v.$invalid, "classes");
		},
		// unchecked: function () {
		// 	this.$emit("update:errors", this.$v.$invalid, "classes");
		// },
	},
	validations() {
		if (this.unchecked === true) {
			return {
				value: {
					classPathAdditions: { required, ldapPathValidationRegex },
					description: { required },
					uniqueMember: { required },
				},
			};
		}
		return {
			value: {},
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.title-class {
	margin-top: var(--space-xl-2);
	margin-bottom: var(--space-xl-2);
}
</style>
