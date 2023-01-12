<template>
  <div class="view-home">
    <div class="view-home_keyboard-box">
      <template v-for="(item, key) in pianoMapArr" :key="`box-${key}`">
        <div class="view-home_keyboard">
          <template v-for="keys in item" :key="`keyboard-${keys}`">
            <keyboard
              :label="pianoMap[keys].label"
              :active-color="pianoMap[keys].activeColor"
              @change="activePiano(pianoMap[keys].value)"
              @mousedown="activePiano(pianoMap[keys].value)"
              :model-value="data.active.includes(pianoMap[keys].value)"
            />
          </template>
        </div>
      </template>
    </div>
    <div class="view-home_nav" :class="{'is-show': data.navShow}" @click="onNavHide">
      <img class="view-home_nav-img" :src="keyboardGuide" alt="keyboardGuide"/>
    </div>
  </div>
  <div class="view-home_background">
    <train ref="trainRef"/>
    <bridge ref="bridgeRef" speed="2s"/>
  </div>
</template>

<script lang="ts">export default { name: 'Home' };</script>

<script lang="ts" setup>
import Keyboard from '@module/keyboard';
import Train from '@module/train';
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import keyboardGuide from '@images/keyboardGuide.png';
import AudioPiano from './src/AudioPiano';
import pianoMap from './src/config';
import Bridge from '@module/bridge/src/index.vue';

const pianoMapArr = [['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']];

interface State {
  shortcuts: [];
  active: number[];
  navShow: boolean;
  audioPiano: AudioPiano;
}

const data = reactive<State>({
  active: [],
  navShow: true,
  shortcuts: [],
  audioPiano: new AudioPiano({ type: 'sine' }),
});

const trainRef = ref<any>();

function activePiano(value: number) {
  data.active.push(value);
  setTimeout(() => {
    data.active.splice(data.active.indexOf(value), 1);
  }, 200);
  data.audioPiano.sendSound(value);
}

function handleKeyDown(event: KeyboardEvent) {
  const item = pianoMap[event.key];
  if (item) activePiano(pianoMap[event.key].value);
  onTrainClick(event.key === '1');
}

function onNavHide() {
  data.navShow = false;
  trainRef.value?.active();
}

function onTrainClick(state: boolean) {
  if (state) {
    trainRef.value?.active();
  } else {
    trainRef.value?.end();
  }
}

onMounted(() => {
  window.document.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.document.removeEventListener('keydown', handleKeyDown);
});
</script>

<style lang="scss" src="./src/style.scss"/>

