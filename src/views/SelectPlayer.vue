<script setup lang="ts">
import { ref, inject } from 'vue';
import Loader from '../components/Loader.vue';
import PlayersTable from '../components/PlayersTable.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const store: any = inject('store');
const isImageLoaded = ref(false);
const firstFighter = ref({ img: '' });
const secondFighter = ref({ img: '' });

const setFirstFighter = (fighter: { img: string }) => {
  firstFighter.value = fighter;
};

const setSecondFighter = (fighter: { img: string }) => {
  secondFighter.value = fighter;
};

const onImageLoad = () => {
  isImageLoaded.value = true;
};

const start = () => {
  store.setFighters(firstFighter.value, secondFighter.value);
  setTimeout(() => {
    router.push({ name: 'fight' });
  }, 2000);
};

const players: Array<{ name: string }> = [
  { name: '1' },
  { name: '2' },
  { name: '3' },
  { name: '4' },
  { name: '5' },
  { name: '6' },
  { name: '7' },
  { name: '8' },
  { name: '9' },
];
</script>
<template>
  <Transition>
    <div
      v-show="isImageLoaded"
      class="wrapper flex flex-col items-center justify-center"
    >
      <img
        src="../assets/bg.jpeg"
        alt="background-image"
        class="background"
        @load="onImageLoad"
      />
      <h1 class="title">Select your fighter</h1>
      <div class="flex relative section">
        <div v-if="firstFighter.img" class="first-player">
          <img :src="firstFighter.img" alt="player" class="player" />
        </div>
        <PlayersTable
          :players="players"
          @firstFighter="setFirstFighter"
          @secondFighter="setSecondFighter"
          @start="start"
        />
        <div v-if="secondFighter.img" class="second-player">
          <img :src="secondFighter.img" alt="player" class="player" />
        </div>
      </div>
      <div class="description">kombat zone: soul chamber</div>
    </div>
  </Transition>
  <Loader v-show="!isImageLoaded" backgroundColor="#2B2B2B" />
</template>
<style lang="scss" scoped>
.wrapper {
  color: lightgray;
  text-transform: uppercase;
  min-height: 100vh;
  padding: 40px;
}

.section {
  margin-top: 40px;
}

.first-player {
  position: absolute;
  right: 100%;
  width: 300px;
  bottom: -20px;
  transform: scale(1.1);

  .player {
    width: 100%;
  }
}

.second-player {
  position: absolute;
  left: 100%;
  width: 300px;
  bottom: -20px;
  transform: scale(1.1);

  .player {
    width: 100%;
    transform: scaleX(-1);
  }
}

.background {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  object-fit: cover;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.title,
.description {
  color: #fafafa;
}

.title {
  font-size: 36px;
}

.description {
  font-size: 24px;
  margin-top: 40px;
}
</style>
