import mergeDeep from "@utils/merge-deep";
import serviceTemplate from "@utils/service-template";
const base = serviceTemplate("wallet");

const module = mergeDeep(base, {
	actions: {
		async exampleFunction() {
			return "some data";
		},
	},
});

export default module;
