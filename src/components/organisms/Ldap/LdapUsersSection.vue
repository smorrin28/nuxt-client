<template>
	<div class="users-container">
		<h3 class="title-class">
			{{ $t("pages.administration.ldap.users.title") }}
		</h3>
		<p>
			{{ $t("pages.administration.ldap.users.title.info") }}
		</p>

		<base-input
			data-testid="ldapDataUsersUserPfad"
			:vmodel="value.userPfad"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.users.pfad.title')"
			:placeholder="$t('pages.administration.ldap.users.pfad.title')"
			:info="$t('pages.administration.ldap.classes.pfad.info')"
			@update:vmodel="$emit('input', { ...value, userPfad: $event })"
		/>
		<p class="pfad-hint">
			{{ $t("pages.administration.ldap.users.hint") }}
		</p>
		<base-input
			data-testid="ldapDataUsersFirstName"
			:vmodel="value.firstName"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.users.pfad.firstname')"
			@update:vmodel="$emit('input', { ...value, firstName: $event })"
		/>
		<base-input
			data-testid="ldapDataUsersFamilyName"
			:vmodel="value.familyName"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.users.pfad.lastname')"
			@update:vmodel="$emit('input', { ...value, familyName: $event })"
		/>
		<base-input
			data-testid="ldapDataUsersEmail"
			:vmodel="value.email"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.users.pfad.email')"
			@update:vmodel="$emit('input', { ...value, email: $event })"
		/>
		<base-input
			data-testid="ldapDataUsersUid"
			:vmodel="value.uid"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.users.uid.title')"
			:info="$t('pages.administration.ldap.users.uid.info')"
			@update:vmodel="$emit('input', { ...value, uid: $event })"
		/>
		<base-input
			data-testid="ldapDataUsersUuid"
			:vmodel="value.uuid"
			type="text"
			class="mt--xl"
			:label="$t('pages.administration.ldap.users.uuid.title')"
			:info="$t('pages.administration.ldap.users.uuid.info')"
			@update:vmodel="$emit('input', { ...value, uuid: $event })"
		/>
	</div>
</template>

<script>
export default {
	// eslint-disable-next-line vue/require-prop-types
	props: ["value"],
	data() {
		return {};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.pfad-hint {
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