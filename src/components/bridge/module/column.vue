<template>
  <svg :viewBox="`0 0 ${width} ${height}`" fill="var(--fill, #293a5c)" :style="{
    width: width + 'px',
    height: height + 'px'
  }" >
    <path :d="`M0,0
    l${width},0
    l0 ${thick}
    q-${radius},0 -${radius},${radius}
    l0,${height - thick}
    l-${width - radius * 2},0
    l0,-${height - thick}
    q0,-${radius} -${radius},-${radius}
    Z`"/>
  </svg>
</template>

<script lang="ts">export default { name: 'BridgeColumn' };</script>

<script lang="ts" setup>
interface Props {
  thick?: number;
  width?: number;
  radius?: number;
  height?: number;
}

const { width, radius, thick, height } = withDefaults(defineProps<Props>(), {
  width: 100,
  radius: 40,
  thick: 30,
  height: 200,
});
</script>
