<script setup lang="ts">
import { useFavicon } from '@vueuse/core';
import { computed, onMounted, useCssModule } from 'vue';

import LogoIcon from './logo-icon.svg';
import LogoText from './logo-text.svg';

const props = defineProps<
	(
		| {
				size: 'large';
		  }
		| {
				size: 'small';
				collapsed: boolean;
		  }
	) & {
		releaseChannel?: 'stable' | 'beta' | 'nightly' | 'dev' | 'rc';
	}
>();

const { size } = props;

// Served from editor-ui's public/assets/ at runtime. Must live under /assets/
// because n8n's server only serves that path as static files (everything else
// falls through to the SPA index.html via the history-api handler).
const brandLogoSrc = '/assets/logo-jworkflows.png';

const showLogoText = computed(() => {
	if (size === 'large') return true;
	return !props.collapsed;
});

const $style = useCssModule();
const containerClasses = computed(() => {
	if (size === 'large') {
		return [$style.logoContainer, $style.large];
	}
	return [
		$style.logoContainer,
		$style.sidebar,
		props.collapsed ? $style.sidebarCollapsed : $style.sidebarExpanded,
	];
});

onMounted(() => {
	// Always use the jWorkflows favicon regardless of release channel
	useFavicon('/assets/favicon.png');
});
</script>

<template>
	<div :class="containerClasses" data-test-id="n8n-logo">
		<img v-if="size === 'large'" :class="$style.brandLogo" :src="brandLogoSrc" alt="jWorkflows" />
		<template v-else>
			<LogoIcon :class="$style.logo" />
			<LogoText v-if="showLogoText" :class="$style.logoText" />
		</template>
		<slot />
	</div>
</template>

<style lang="scss" module>
.logoContainer {
	display: flex;
	justify-content: center;
	align-items: center;
}

.logoText {
	margin-left: var(--spacing--5xs);
	path {
		fill: var(--color--text--shade-1);
	}
}

.large {
	margin-bottom: var(--spacing--xl);
}

.brandLogo {
	width: 220px;
	height: auto;
	max-width: 100%;
}

.sidebarExpanded .logo {
	margin-left: var(--spacing--2xs);
}

.sidebarCollapsed .logo {
	width: 40px;
	height: 30px;
	padding: 0 var(--spacing--4xs);
}
</style>
