<template>
  <div class="var-keyboard" :class="{'is-active': props.modelValue}" :style="getStyle" @mouseover="onOver">
    <div class="var-keyboard_block">
      <div class="var-keyboard_text" v-if="props.label">{{ props.label }}</div>
    </div>
  </div>
</template>

<script lang="ts">export default { name: 'Keyboard' };</script>

<script lang="ts" setup>
import { computed } from 'vue';

interface Props {
  color?: string;
  label?: string;
  modelValue?: boolean;
  activeColor?: string;
}

const props = withDefaults(defineProps<Props>(), { modelValue: false });

const getStyle = computed(() => {
  const { color, activeColor } = props;
  const classes: { [k: string]: string } = {};
  if (color) classes['--color-block'] = color;
  if (activeColor) classes['--color-block-active'] = activeColor;
  return classes;
});

const emits = defineEmits(['change', 'update:modelValue']);

function onOver() {
  emits('change', true);
  emits('update:modelValue', true);
}

</script>

<style lang="scss" src="./style.scss"/>
