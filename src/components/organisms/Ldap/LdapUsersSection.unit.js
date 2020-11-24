import { mount } from "@vue/test-utils";
import LdapUsersSection from "./LdapUsersSection";

describe("@components/organisms/LdapUsersSection", () => {
	const ldapConfigData = {
		userPathAdditions: "user=path;;user=p",
		givenName: "givenName",
		sn: "sn",
		mail: "mail@de.de",
		uid: "uid",
		uuid: "uuid",
	};
	it(...isValidComponent(LdapUsersSection));

	it("has correct child components", () => {
		const wrapper = mount(LdapUsersSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				value: ldapConfigData,
			},
		});

		expect(
			wrapper.find("[data-testid=ldapDataUsersUserPathAdditions]").exists()
		).toBe(true);
		expect(wrapper.find("[data-testid=ldapDataUsersGivenName]").exists()).toBe(
			true
		);
		expect(wrapper.find("[data-testid=ldapDataUsersSn]").exists()).toBe(true);
		expect(wrapper.find("[data-testid=ldapDataUsersMail]").exists()).toBe(true);
		expect(wrapper.find("[data-testid=ldapDataUsersUid]").exists()).toBe(true);
		expect(wrapper.find("[data-testid=ldapDataUsersUuid]").exists()).toBe(true);
	});

	it("loads the validator", () => {
		const wrapper = mount(LdapUsersSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				value: ldapConfigData,
			},
		});
		expect(wrapper.vm.$v).not.toBeUndefined();
	});

	it("invalid validation is false when valid values are sent through props", async () => {
		const wrapper = mount(LdapUsersSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				value: ldapConfigData,
			},
		});
		// default props values are valid so expect this assertion to succeed
		expect(wrapper.vm.$v.$invalid).toBe(false);
	});

	it("invalid validation is true when invalid values are sent through props", async () => {
		const wrapper = mount(LdapUsersSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				value: {
					userPathAdditions: "invalid",
					givenName: "",
					sn: "",
					mail: "",
					uid: "",
					uuid: "",
				},
			},
		});
		expect(wrapper.vm.$v.$invalid).toBe(true);
	});

	it("invalid validation is true when any of the input values are invalid", async () => {
		const ldapConfigDataTestSpecific = {
			...ldapConfigData,
		};
		const wrapper = mount(LdapUsersSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				value: ldapConfigDataTestSpecific,
			},
			listeners: {
				input: (event) => {
					ldapConfigDataTestSpecific.userPathAdditions =
						event.userPathAdditions;
					ldapConfigDataTestSpecific.givenName = event.givenName;
					ldapConfigDataTestSpecific.sn = event.sn;
					ldapConfigDataTestSpecific.mail = event.mail;
					ldapConfigDataTestSpecific.uid = event.uid;
					ldapConfigDataTestSpecific.uuid = event.uuid;
				},
			},
		});

		const inputGivenName = wrapper.find(
			"input[data-testid=ldapDataUsersGivenName]"
		);
		expect(inputGivenName.exists()).toBe(true);

		inputGivenName.setValue("");
		inputGivenName.trigger("blur");

		expect(inputGivenName.element.value).toBe("");
		expect(wrapper.vm.$v.$invalid).toBe(true);
		await wrapper.vm.$nextTick();
		const errorMessageComponent = wrapper.find(
			"div[data-testid='ldapDataUsersGivenName'] .info.error"
		);
		expect(errorMessageComponent.exists()).toBeTrue();
	});

	it("it emits update:errors event when validate prop changes value", async () => {
		const wrapper = mount(LdapUsersSection, {
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
			userPathAdditions: "invalid",
			givenName: "",
			sn: "",
			mail: "",
			uid: "",
			uuid: "",
		};
		const wrapper = mount(LdapUsersSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				value: ldapConfigDataTestSpecific,
			},
			listeners: {
				input: (event) => {
					ldapConfigDataTestSpecific.userPathAdditions =
						event.userPathAdditions;
					ldapConfigDataTestSpecific.givenName = event.givenName;
					ldapConfigDataTestSpecific.sn = event.sn;
					ldapConfigDataTestSpecific.mail = event.mail;
					ldapConfigDataTestSpecific.uid = event.uid;
					ldapConfigDataTestSpecific.uuid = event.uuid;
				},
			},
		});

		let errorMessageComponent = wrapper.find(
			"div[data-testid='ldapDataUsersGivenName'] .info.error"
		);
		expect(wrapper.vm.$v.$invalid).toBe(true);
		expect(errorMessageComponent.exists()).toBeFalse();

		const inputGivenName = wrapper.find(
			"input[data-testid=ldapDataUsersGivenName]"
		);
		expect(inputGivenName.exists()).toBe(true);
		expect(inputGivenName.element.value).toBe(
			ldapConfigDataTestSpecific.givenName
		);

		inputGivenName.trigger("blur"); // without this the error is not displayed

		await wrapper.vm.$nextTick();
		errorMessageComponent = wrapper.find(
			"div[data-testid='ldapDataUsersGivenName'] .info.error"
		);
		expect(errorMessageComponent.exists()).toBeTrue();
	});
});
