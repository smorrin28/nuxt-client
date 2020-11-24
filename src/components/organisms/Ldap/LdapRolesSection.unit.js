import { mount } from "@vue/test-utils";
import LdapRolesSection from "./LdapRolesSection";

describe("@components/organisms/LdapRolesSection", () => {
	const ldapConfigData = {
		roleType: "ldap_group",
		role: "description",
		roleStudent: "cn=schueler,ou=rolle",
		roleTeacher: "cn=lehrer,ou=rolle",
		roleAdmin: "cn=admin,ou=rolle",
		roleNoSc: "cn=ehemalige,ou=rolle",
	};
	it(...isValidComponent(LdapRolesSection));

	it("has correct child components", () => {
		const wrapper = mount(LdapRolesSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				value: ldapConfigData,
			},
		});

		expect(wrapper.find(".section-sub-header").exists()).toBe(true);
		expect(wrapper.find("[data-testid=ldapDataRolesRole]").exists()).toBe(true);
		expect(
			wrapper.find("[data-testid=ldapDataRolesRoleStudent]").exists()
		).toBe(true);
		expect(
			wrapper.find("[data-testid=ldapDataRolesRoleTeacher]").exists()
		).toBe(true);
		expect(wrapper.find("[data-testid=ldapDataRolesRoleAdmin]").exists()).toBe(
			true
		);
		expect(wrapper.find("[data-testid=ldapDataRolesRoleSc]").exists()).toBe(
			true
		);
	});

	it("loads the validator", async () => {
		const wrapper = mount(LdapRolesSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				// validations are only active when roleType !== ldap_group
				value: { ...ldapConfigData, roleType: "not LDAP_group" },
			},
		});
		expect(wrapper.vm.$v).not.toBeUndefined();
	});

	it("invalid validation is false when valid values are sent through props", async () => {
		const wrapper = mount(LdapRolesSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				// validations are only active when roleType !== ldap_group
				value: { ...ldapConfigData, roleType: "not LDAP_group" },
			},
		});
		// default props values are valid so expect this assertion to succeed
		expect(wrapper.vm.$v.$invalid).toBe(false);
	});

	it("invalid validation is true when invalid values are sent through props", async () => {
		const wrapper = mount(LdapRolesSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				value: {
					// validations are only active when roleType !== ldap_group
					roleType: "not ldap group",
					role: "",
					roleStudent: "invalid",
					roleTeacher: "invalid",
					roleAdmin: "invalid",
					roleNoSc: "invalid",
				},
			},
		});
		expect(wrapper.vm.$v.$invalid).toBe(true);
	});

	it("invalid validation is true when any of the input values are invalid", async () => {
		const ldapConfigDataTestSpecific = {
			...ldapConfigData,
			// validations are only active when roleType !== ldap_group
			roleType: "not ldap group",
		};
		const wrapper = mount(LdapRolesSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				value: ldapConfigDataTestSpecific,
			},
			listeners: {
				input: (event) => {
					ldapConfigDataTestSpecific.role = event.role;
					ldapConfigDataTestSpecific.roleStudent = event.roleStudent;
					ldapConfigDataTestSpecific.roleTeacher = event.roleTeacher;
					ldapConfigDataTestSpecific.roleAdmin = event.roleAdmin;
					ldapConfigDataTestSpecific.roleNoSc = event.roleNoSc;
				},
			},
		});

		const inputRole = wrapper.find("input[data-testid=ldapDataRolesRole]");
		expect(inputRole.exists()).toBe(true);

		inputRole.setValue("");
		inputRole.trigger("blur");

		expect(inputRole.element.value).toBe("");
		expect(wrapper.vm.$v.$invalid).toBe(true);
		await wrapper.vm.$nextTick();
		const errorMessageComponent = wrapper.find(
			"div[data-testid='ldapDataRolesRole'] .info.error"
		);
		expect(errorMessageComponent.exists()).toBeTrue();
	});

	it("it emits update:errors event when validate prop changes value", async () => {
		const wrapper = mount(LdapRolesSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				value: ldapConfigData,
				validate: false,
			},
		});
		expect(wrapper.emitted("update:errors")).toBeUndefined();

		await wrapper.setProps({
			validate: true,
		});
		expect(wrapper.vm.$props.validate).toBe(true);

		await wrapper.vm.$nextTick();
		expect(wrapper.emitted("update:errors")[0]).toHaveLength(2);
	});

	it("invalid error message is displayed only after the blur event, even if originally invalid props were passed through", async () => {
		const ldapConfigDataTestSpecific = {
			// validations are only active when roleType !== ldap_group
			roleType: "not ldap group",
			role: "",
			roleStudent: "invalid",
			roleTeacher: "invalid",
			roleAdmin: "invalid",
			roleNoSc: "invalid",
		};
		const wrapper = mount(LdapRolesSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				value: ldapConfigDataTestSpecific,
			},
			listeners: {
				input: (event) => {
					ldapConfigDataTestSpecific.role = event.role;
					ldapConfigDataTestSpecific.roleStudent = event.roleStudent;
					ldapConfigDataTestSpecific.roleTeacher = event.roleTeacher;
					ldapConfigDataTestSpecific.roleAdmin = event.roleAdmin;
					ldapConfigDataTestSpecific.roleNoSc = event.roleNoSc;
				},
			},
		});

		let errorMessageComponent = wrapper.find(
			"div[data-testid='ldapDataRolesRole'] .info.error"
		);
		expect(wrapper.vm.$v.$invalid).toBe(true);
		expect(errorMessageComponent.exists()).toBeFalse();

		const inputRole = wrapper.find("input[data-testid=ldapDataRolesRole]");
		expect(inputRole.exists()).toBe(true);
		expect(inputRole.element.value).toBe(ldapConfigDataTestSpecific.role);

		inputRole.trigger("blur"); // without this the error is not displayed

		await wrapper.vm.$nextTick();
		errorMessageComponent = wrapper.find(
			"div[data-testid='ldapDataRolesRole'] .info.error"
		);
		expect(errorMessageComponent.exists()).toBeTrue();
	});
});
