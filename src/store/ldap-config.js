export const actions = {
	async verifyData({ commit }, payload) {
		const {
			url,
			rootPath,
			searchUser,
			searchUserPassword,
			userPathAdditions,
			givenName,
			sn,
			mail,
			uid,
			uuid,
			groupOption,
			member,
			student,
			teacher,
			admin,
			user,
			classPath,
			nameAttribute,
			participantAttribute,
		} = payload;

		const data = {
			url,
			rootPath,
			searchUser,
			searchUserPassword,
			providerOptions: {
				userPathAdditionsAdditions: userPathAdditions,
				classPathAdditions: classPath,
				roleType: groupOption,
				userAttributeNameMapping: {
					givenName: givenName,
					sn: sn,
					uuid,
					uid,
					mail: mail,
					role: member,
				},
				roleAttributeNameMapping: {
					roleStudent: student,
					roleTeacher: teacher,
					roleAdmin: admin,
					roleNoSc: user,
				},
				classAttributeNameMapping: {
					description: nameAttribute,
					uniqueMember: participantAttribute,
				},
			},
		};

		try {
			const verification = await this.$axios.$post(
				"/ldap-config?verifyOnly=true",
				data
			);
			if (!verification.ok) {
				verification.errors.forEach((err) => {
					// plaveholders for translations
					this.$toast.error(err);
				});
				return;
			}
			// plaveholders for translations
			this.$toast.success("The verification was succesfull");
			commit("setSystemVerificationData", verification);

			// disabled until page implementation
			// this.$router.push({
			// 	path: `/administration/ldap/ldap-save?id=${id}`,
			// });
		} catch (error) {
			this.$toast.error(error);
		}
	},
};

export const getters = {};

export const mutations = {
	setSystemVerificationData(state, payload) {
		state.systemVerificationData = payload;
	},
};

export const state = () => {
	return {
		systemVerificationData: null,
	};
};
