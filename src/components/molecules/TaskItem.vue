<template>
	<div class="card">
		<div class="card-body">
			<img v-if="image" :src="image" class="image" role="presentation" />
			<!-- TODO: this progress ring needs to be replaced with a different progress ring that uses fractions (e.g. 9/12)-->
			<progress-ring
				v-else-if="progress"
				id="progress-ring"
				:percent="progress"
			/>
			<div class="card-heading">
				<div class="subtitle">
					{{ subtitle }}
				</div>
				<div class="title">
					{{ title }}
				</div>
			</div>
		</div>
		<div class="card-action">
			<div class="status">{{ status }}</div>
			<pulsating-dot
				v-if="actionNeeded"
				id="pulsating-dot"
				color="var(--color-secondary)"
			/>
			<span style="position: relative;">
				<base-button
					design="text icon"
					aria-label="menu"
					@click="contextOpen = true"
				>
					<base-icon
						class="footer__content-icon"
						fill="#455B6A"
						source="material"
						icon="more_vert"
					/>
				</base-button>
				<context-menu
					:show.sync="contextOpen"
					anchor="top-right"
					:actions="actions"
				/>
			</span>
		</div>
	</div>
</template>

<script>
import ProgressRing from "@components/atoms/ProgressRing";
import PulsatingDot from "@components/atoms/PulsatingDot";
import BaseButton from "@basecomponents/BaseButton";
import BaseIcon from "@basecomponents/BaseIcon";
import ContextMenu from "@components/molecules/ContextMenu";

export default {
	components: { ProgressRing, PulsatingDot, BaseButton, BaseIcon, ContextMenu },
	props: {
		image: {
			type: String,
			default: "",
		},
		title: {
			type: String,
			required: true,
			default: "",
		},
		subtitle: {
			type: String,
			default: "",
		},
		status: {
			type: String,
			default: "",
		},
		progress: {
			type: Number,
			default: 0,
		},
		actionNeeded: {
			type: Boolean,
		},
		actions: {
			type: Array,
			default: function () {
				return [];
			},
		},
	},
	data: function () {
		return {
			contextOpen: false,
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
$color-dark-gray: #616161; // change to var(--color-gray-medium)

.card {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: auto;
	padding: var(--space-md);
	border-bottom: 1px solid var(--color-gray);
	border-radius: var(--radius-sm);
}

.card-body {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.card-heading {
	overflow: hidden;
}

.title {
	overflow: hidden;
	font-size: var(--text-md);
	line-height: var(--line-height-sm);
	text-overflow: ellipsis;
}

.subtitle {
	overflow: hidden;
	font-size: var(--text-xs);
	line-height: var(--line-height-sm);
	color: $color-dark-gray;
	text-overflow: ellipsis;
	white-space: nowrap;

	.icon {
		margin-left: var(--space-xs-3);
	}
}
.image {
	height: calc(var(--text-md) + var(--text-lg));
	object-fit: contain;
	margin-right: var(--space-sm);
	border-radius: var(--radius-sm);
}

.status {
	align-self: center;
	padding: var(--space-xs);
	font-size: var(--text-xs);
	font-style: italic;
	line-height: var(--line-height-sm);
	color: $color-dark-gray;
}

#pulsating-dot {
	align-self: center;
	margin: var(--space-xs);
}

#progress-ring {
	padding: var(--space-xs);
}

.card-action {
	display: flex;
}

p {
	margin: 0;
}
</style>