<template>
  <div class="var-bridge" ref="bridgeRef" :style="`--speed: ${props.speed};--column-width: -${props.columnWidth}px`">
    <template v-for="key in data.vFor" :key="key">
      <slot name="column">
        <bridge-column :width="props.columnWidth" :height="props.columnHeight" :radius="props.columnRadius"/>
      </slot>
    </template>
  </div>
</template>

<script lang="ts">export default { name: 'Bridge' };</script>

<script lang="ts" setup>
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import { BridgeColumn } from '@module/bridge';

interface Props {
  speed?: string;
  columnWidth?: number;
  columnRadius?: number;
  columnHeight?: number;
}

const props = withDefaults(defineProps<Props>(), {
  speed: '.2s',
  columnWidth: 90,
  columnRadius: 30,
  columnHeight: 210,
});

const bridgeRef = ref<any>();
const data = reactive({
  vFor: 0,
});

function reColumn() {
  const count = Math.ceil(bridgeRef.value?.clientWidth / props.columnWidth);
  data.vFor = count + 1;
}

onMounted(() => {
  reColumn();
  window.addEventListener('resize', reColumn);
});
onUnmounted(() => window.removeEventListener('resize', reColumn));

defineExpose({ reColumn });
</script>

<style lang="scss" src="./style.scss"/>
