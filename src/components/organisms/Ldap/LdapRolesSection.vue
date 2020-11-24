<template>
	<div>
		<h1 class="mb--md h4">
			{{ this.$t("pages.administration.ldapEdit.roles.headLines.title") }}
		</h1>
		<p class="description-section">
			{{
				this.$t(
					"pages.administration.ldapEdit.roles.headLines.sectionDescription"
				)
			}}
		</p>
		<div role="group" class="section-sub-header">
			<base-input
				:vmodel="value.roleType"
				type="radio"
				:label="
					this.$t('pages.administration.ldapEdit.roles.labels.radio.ldapGroup')
				"
				name="group"
				style="margin-right: var(--space-sm);"
				value="ldap_group"
				@update:vmodel="$emit('input', { ...value, roleType: $event })"
			/>
			<base-input
				:vmodel="value.roleType"
				type="radio"
				:label="
					this.$t(
						'pages.administration.ldapEdit.roles.labels.radio.userAttribute'
					)
				"
				name="group"
				value="user_attribute"
				@update:vmodel="$emit('input', { ...value, roleType: $event })"
			/>
			<p class="text-sm" style="margin-top: var(--space-xs);">
				{{
					this.$t(
						"pages.administration.ldapEdit.roles.labels.radio.description"
					)
				}}
			</p>
		</div>
		<base-input
			:vmodel="value.role"
			:disabled="value.roleType === 'ldap_group'"
			type="text"
			:label="this.$t('pages.administration.ldapEdit.roles.labels.role')"
			:placeholder="
				this.$t('pages.administration.ldapEdit.roles.placeholder.role')
			"
			style="margin-bottom: var(--space-xl);"
			:validation-model="$v.value.role"
			:validation-messages="roleValidationMessages"
			data-testid="ldapDataRolesRole"
			@update:vmodel="$emit('input', { ...value, role: $event })"
		/>
		<base-input
			:vmodel="value.roleStudent"
			type="text"
			v-bind="$attrs"
			:label="this.$t('pages.administration.ldapEdit.roles.labels.student')"
			:placeholder="
				this.$t('pages.administration.ldapEdit.roles.placeholder.student')
			"
			:info="this.$t('pages.administration.ldapEdit.roles.info.student')"
			:validation-model="$v.value.roleStudent"
			:validation-messages="rolesValidationMessages"
			data-testid="ldapDataRolesRoleStudent"
			@update:vmodel="$emit('input', { ...value, roleStudent: $event })"
		/>
		<base-input
			:vmodel="value.roleTeacher"
			type="text"
			:label="this.$t('pages.administration.ldapEdit.roles.labels.teacher')"
			:placeholder="
				this.$t('pages.administration.ldapEdit.roles.placeholder.teacher')
			"
			:info="this.$t('pages.administration.ldapEdit.roles.info.teacher')"
			:validation-model="$v.value.roleTeacher"
			:validation-messages="rolesValidationMessages"
			data-testid="ldapDataRolesRoleTeacher"
			@update:vmodel="$emit('input', { ...value, roleTeacher: $event })"
		/>
		<base-input
			:vmodel="value.roleAdmin"
			type="text"
			:label="this.$t('pages.administration.ldapEdit.roles.labels.admin')"
			:placeholder="
				this.$t('pages.administration.ldapEdit.roles.placeholder.admin')
			"
			:info="this.$t('pages.administration.ldapEdit.roles.info.admin')"
			:validation-model="$v.value.roleAdmin"
			:validation-messages="rolesValidationMessages"
			data-testid="ldapDataRolesRoleAdmin"
			@update:vmodel="$emit('input', { ...value, roleAdmin: $event })"
		/>
		<base-input
			:vmodel="value.roleNoSc"
			type="text"
			:label="this.$t('pages.administration.ldapEdit.roles.labels.user')"
			:placeholder="
				this.$t('pages.administration.ldapEdit.roles.placeholder.user')
			"
			:info="this.$t('pages.administration.ldapEdit.roles.info.user')"
			:validation-model="$v.value.roleNoSc"
			:validation-messages="rolesValidationMessages"
			data-testid="ldapDataRolesRoleSc"
			@update:vmodel="$emit('input', { ...value, roleNoSc: $event })"
		/>
	</div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { ldapPathValidationRegex } from "@utils/ldapValidationRegex";

export default {
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
			roleValidationMessages: [
				{ key: "required", message: this.$t("common.validation.required") },
			],
			rolesValidationMessages: [
				{
					key: "ldapPathValidationRegex",
					message: this.$t("pages.administration.ldapEdit.validation.path"),
				},
			],
		};
	},
	computed: {
		roleType() {
			return this.value.roleType;
		},
	},
	watch: {
		validate: function () {
			this.$v.$touch();
			this.$emit("update:errors", this.$v.$invalid, "roles");
		},
		roleType: function () {
			this.$emit("update:errors", this.$v.$invalid, "roles");
		},
	},
	validations() {
		if (this.value.roleType !== "ldap_group") {
			return {
				value: {
					role: { required },
					roleStudent: { ldapPathValidationRegex },
					roleTeacher: { ldapPathValidationRegex },
					roleAdmin: { ldapPathValidationRegex },
					roleNoSc: { ldapPathValidationRegex },
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

.section-sub-header {
	margin-bottom: var(--space-xs);
}

.description-section {
	margin-bottom: var(--space-xl);
}
</style>
