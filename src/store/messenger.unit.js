import { getters, actions, mutations } from "./messenger";

describe("store/messenger", () => {
	describe("getters", () => {
		describe("serverName", () => {
			it("returns null if no session present", () => {
				expect(getters.serverName({})).toBeNull();
			});
			it("returns server name", () => {
				expect(
					getters.serverName({
						session: { userId: "dummy-user:dummy-server.name" },
					})
				).toBe("dummy-server.name");
			});
		});
	});
	describe("actions", () => {
		describe("loadMessengerToken", () => {
			it("triggers commit", async () => {
				const dummyReturnObject = { someProperty: "dummy return message" };
				let receivedUrl;
				actions.$axios = {
					$post: (url) => {
						receivedUrl = url;
						return Promise.resolve(dummyReturnObject);
					},
				};
				const spyCommit = jest.fn();

				await actions.loadMessengerToken({ commit: spyCommit });

				expect(receivedUrl).toBe("/messengerToken");
				expect(spyCommit.mock.calls).toHaveLength(1);
				expect(spyCommit.mock.calls[0][0]).toBe("setMessengerToken");
				expect(spyCommit.mock.calls[0][1]).toStrictEqual(dummyReturnObject);
			});
		});
	});
	describe("mutations", () => {
		describe("serverName", () => {
			it("add session to existing state", () => {
				const state = { oldProperty: "some value" };
				mutations.setMessengerToken(state, { newProperty: "another value" });
				expect(state).toStrictEqual({
					oldProperty: "some value",
					session: { newProperty: "another value" },
				});
			});
			it("overwrites session if it exists", () => {
				const state = { session: "some value" };
				mutations.setMessengerToken(state, { newProperty: "another value" });
				expect(state).toStrictEqual({
					session: { newProperty: "another value" },
				});
			});
		});
	});
});
