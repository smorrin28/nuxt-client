import { storiesOf } from "@storybook/vue";
import { text, select } from "@storybook/addon-knobs";

import notes from "@docs/storybook/misc.md";
import PulsatingDot from "@components/PulsatingDot";
import ProfilePicture from "@components/ProfilePicture";
import ExampleImage from "@assets/avatarExample.svg";
import MenuLink from "@components/MenuLink";
import DropdownMenu from "@components/DropdownMenu";
import BaseButton from "@components/ui/BaseButton";
import Searchbar from "@components/Searchbar";
import PopupIcon from "@components/PopupIcon";
import PopupIconInitials from "@components/PopupIconInitials";

storiesOf("Misc", module)
	.addParameters({
		notes,
	})
	.add("Pulsing Dot", () => ({
		components: { PulsatingDot },
		template: `<PulsatingDot />`,
	}))
	.add("Profile Pic", () => ({
		components: { ProfilePicture },
		data: () => ({ imgsrc: ExampleImage }),
		template: `<div><ProfilePicture :image="imgsrc" size="small"/><ProfilePicture :image="imgsrc" size="medium"/><ProfilePicture :image="imgsrc" size="large"/></div>`,
	}))
	.add("DropdownMenu", () => ({
		components: { DropdownMenu, MenuLink },
		template: `
			<DropdownMenu>
				<template v-slot:header>Dropdown</template>
				<MenuLink to="/">Link 1</MenuLink>
				<MenuLink to="/">Link 2</MenuLink>
				<MenuLink to="/">Link 3</MenuLink>
			</DropdownMenu>
		`,
	}))
	.add("Searchbar", () => ({
		components: { Searchbar },
		data: () => ({
			searchQuery: text("searchQuery", ""),
			placeholder: text("placeholder", "Suche nach..."),
		}),
		template: `<searchbar v-model.lazy="searchQuery" :placeholder="placeholder" />`,
	}))
	.add("Toast", () => ({
		components: { BaseButton },
		data: () => ({
			type: select(
				"type",
				{ show: "show", info: "info", success: "success", error: "error" },
				"show"
			),
			message: text("message", "Toast 🧐"),
		}),
		template: `
			<div>
				<BaseButton @click="$toast[type](message)">Knobs Toast</BaseButton>
				<br>
				<BaseButton @click="$toast.show('Show 🧐')">Default Toast</BaseButton>
				<BaseButton @click="$toast.info('Info 🤓')">Info Toast</BaseButton>
				<BaseButton @click="$toast.success('Success 😊')" class="is-success">Success Toast</BaseButton>
				<BaseButton @click="$toast.error('Error 😥')" class="is-error">Error Toast</BaseButton>
			</div>
		`,
	}))
	.add("Popup Icon", () => ({
		components: { PopupIcon },
		template: `<div>
			<PopupIcon source="fa" icon="solid/address-book"></PopupIcon>
		</div>`,
	}))
	.add("Popup Icon with Initials", () => ({
		components: { PopupIconInitials, MenuLink },
		template: `<div style="text-align: right">
			<PopupIconInitials firstname="Fritz" lastname="Schmidt">
				<div>Fritz Schmidt </div>
				<MenuLink to="/">Link 1</MenuLink>
				<MenuLink to="/">Link 2</MenuLink>
			</PopupIconInitials>
		</div>`,
	}));
