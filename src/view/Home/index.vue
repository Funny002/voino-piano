<template>
  <div class="view-home">
    <div class="view-home_keyboard-box">
      <template v-for="(item, key) in pianoMapArr" :key="`box-${key}`">
        <!--          <div class="view-home_keyboard" :style="{paddingLeft: `${40 * key}px`, paddingRight :`${40 * (2 - key)}px`}">-->
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
    <div class="view-home_nav" :class="{'is-show': data.navShow}" @click="data.navShow = false">
      <img class="view-home_nav-img" :src="keyboardGuide" alt="keyboardGuide"/>
    </div>
  </div>
</template>

<script lang="ts">export default { name: 'Home' };</script>

<script lang="ts" setup>
import { onMounted, onUnmounted, reactive } from 'vue';
import keyboardGuide from '@images/keyboardGuide.png';
import AudioPiano from './src/AudioPiano';
import Keyboard from '@module/keyboard';
import pianoMap from './src/config';

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
}

onMounted(() => {
  window.document.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.document.removeEventListener('keydown', handleKeyDown);
});
</script>

<style lang="scss" src="./src/style.scss"/>

