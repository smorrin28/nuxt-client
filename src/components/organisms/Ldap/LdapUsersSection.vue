<template>
	<div class="users-container">
		<h3 class="title-class">
			{{ $t("pages.administration.ldap.users.title") }}
		</h3>
		<p>
			{{ $t("pages.administration.ldap.users.title.info") }}
		</p>

		<base-input
			data-testid="ldapDataUsersUserPathAdditions"
			:vmodel="value.userPathAdditions"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.users.path.title')"
			:placeholder="$t('pages.administration.ldap.users.path.title')"
			:info="$t('pages.administration.ldap.classes.path.info')"
			:validation-model="$v.value.userPathAdditions"
			:validation-messages="userPathAdditionsValidationMessage"
			datatest-id="ldapDataUsersUserPathAdditions"
			@update:vmodel="$emit('input', { ...value, userPathAdditions: $event })"
		/>
		<p class="path-hint">
			{{ $t("pages.administration.ldap.users.hint") }}
		</p>
		<base-input
			data-testid="ldapDataUsersGivenName"
			:vmodel="value.givenName"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.users.path.firstname')"
			:validation-model="$v.value.givenName"
			:validation-messages="usersValidationMessage"
			datatest-id="ldapDataUsersGivenName"
			@update:vmodel="$emit('input', { ...value, givenName: $event })"
		/>
		<base-input
			data-testid="ldapDataUsersSn"
			:vmodel="value.sn"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.users.path.lastname')"
			:validation-model="$v.value.sn"
			:validation-messages="usersValidationMessage"
			datatest-id="ldapDataUsersSn"
			@update:vmodel="$emit('input', { ...value, sn: $event })"
		/>
		<base-input
			data-testid="ldapDataUsersMail"
			:vmodel="value.mail"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.users.path.email')"
			:validation-model="$v.value.mail"
			:validation-messages="mailValidationMessages"
			datatest-id="ldapDataUsersMail"
			@update:vmodel="$emit('input', { ...value, mail: $event })"
		/>
		<base-input
			data-testid="ldapDataUsersUid"
			:vmodel="value.uid"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.users.uid.title')"
			:info="$t('pages.administration.ldap.users.uid.info')"
			:validation-model="$v.value.uid"
			:validation-messages="usersValidationMessage"
			datatest-id="ldapDataUsersUid"
			@update:vmodel="$emit('input', { ...value, uid: $event })"
		/>
		<base-input
			data-testid="ldapDataUsersUuid"
			:vmodel="value.uuid"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.users.uuid.title')"
			:info="$t('pages.administration.ldap.users.uuid.info')"
			:validation-model="$v.value.uuid"
			:validation-messages="usersValidationMessage"
			datatest-id="ldapDataUsersUuid"
			@update:vmodel="$emit('input', { ...value, uuid: $event })"
		/>
	</div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
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
			usersValidationMessage: [
				{ key: "required", message: this.$t("common.validation.required") },
			],
			userPathAdditionsValidationMessage: [
				{
					key: "ldapPathValidationRegex",
					message: this.$t("pages.administration.ldapEdit.validation.path"),
				},
				{ key: "required", message: this.$t("common.validation.required") },
			],
			mailValidationMessages: [
				{ key: "required", message: this.$t("common.validation.required") },
				{ key: "email", message: this.$t("common.validation.email") },
			],
		};
	},
	watch: {
		validate: function () {
			this.$v.$touch();
			this.$emit("update:errors", this.$v.$invalid, "users");
		},
	},
	validations() {
		return {
			value: {
				userPathAdditions: { required, ldapPathValidationRegex },
				givenName: { required },
				sn: { required },
				mail: { required, email },
				uid: { required },
				uuid: { required },
			},
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.path-hint {
	margin-top: var(--space-xl-3);
	margin-bottom: var(--space-xl-2);
}
.users-container {
	margin-bottom: var(--space-xl-4);
}
.title-class {
	margin-bottom: var(--space-xl-2);
}
</style>
