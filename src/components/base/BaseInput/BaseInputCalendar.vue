<template>
	<base-input-default
		v-bind="$attrs"
		:type="false"
		:vmodel="vmodel"
		class="calendar-input"
	>
		<flat-pickr
			:value="vmodel"
			v-bind="$attrs"
			:config="config"
			:wrap="true"
			class="input"
			v-on="$listeners"
			@input="$emit('input_change', $event)"
		/>
	</base-input-default>
</template>
<script>
import BaseInputDefault from "./BaseInputDefault";
import FlatPickr from "vue-flatpickr-component";
import { German } from "flatpickr/dist/l10n/de.js";

export const supportedTypes = ["date", "time"];

export default {
	components: { BaseInputDefault, FlatPickr },
	model: {
		prop: "vmodel",
		event: "input",
	},
	props: {
		vmodel: {
			type: String,
			default: "",
		},
		type: {
			type: String,
			required: true,
			validator: (type) => {
				return supportedTypes.includes(type);
			},
		},
	},
	data() {
		return {
			// Get more form https://chmln.github.io/flatpickr/options/
			configDate: {
				allowInput: true,
				altFormat: "d.m.Y",
				altInput: true,
				dateFormat: "Y-m-d",
				locale: German,
			},
			configTime: {
				allowInput: true,
				enableTime: true,
				noCalendar: true,
				dateFormat: "H:i",
				time_24hr: true,
				locale: German,
			},
		};
	},
	computed: {
		config() {
			return {
				date: this.configDate,
				time: this.configTime,
			}[this.type];
		},
	},
};
</script>

<style src="flatpickr/dist/flatpickr.css"></style>
<style lang="scss" scoped>
@import "@styles";

.calendar-input /deep/ {
	.flatpickr-input,
	input {
		display: block;
		width: 100%;
		border: 0;
		border-bottom-right-radius: calc(
			var(--border-radius) - var(--border-width)
		);
		border-bottom-left-radius: calc(var(--border-radius) - var(--border-width));
		&::placeholder {
			color: var(--color-gray);
		}
		&:focus {
			outline: none;
		}
	}
}
</style>
