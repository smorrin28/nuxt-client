import { storiesOf } from "@storybook/vue";
import { text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import InputRadio from "./Radio";

storiesOf("6 Organisms/DataFilter/Inputs", module)
	.addParameters({
		notes: `
			# DataFilter/Inputs

			additional props can be passed to the inputs using the "attributes" config key. Check [the docs](http://docs.vue-filter-ui.surge.sh/Customize/5-Input.html#interface) for more details.
		`,
	})
	.add("Radio", () => {
		return {
			components: { InputRadio },
			template: `
			<div>
				<InputRadio
					v-model="value"
					:options="[
						{ value: 'A', label: 'Radio 1' },
						{ value: 'B', label: 'Radio 2' },
						{ value: 'C', label: 'Radio 3' },
					]"
					@input="onInput"
				/>
				value: {{ value }}
			</div>
			`,
			data: () => ({
				value: text("value", "A"),
			}),
			methods: {
				onInput: action("@input"),
				onRemove: action("@remove"),
			},
		};
	});
