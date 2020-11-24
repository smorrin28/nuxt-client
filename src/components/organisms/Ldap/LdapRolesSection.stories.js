import { storiesOf } from "@storybook/vue";

import LdapRolesSection from "./LdapRolesSection";

storiesOf("6 Organisms/Ldap Page/Ldap Roles Section", module).add(
	"LdapRolesSection",
	() => {
		return {
			components: { LdapRolesSection },
			template: `<ldap-roles-section v-model="ldapConfigData" />`,
			data: () => ({
				ldapConfigData: {
					role: "description",
					roleStudent: "cn=schueler,ou=rolle",
					roleTeacher: "cn=lehrer,ou=rolle",
					roleAdmin: "cn=admin,ou=rolle",
					roleNoSc: "cn=ehemalige,ou=rolle",
				},
			}),
			methods: {},
		};
	}
);
