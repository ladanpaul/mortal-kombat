<script setup lang="ts">
import { ref, inject, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useMagicKeys } from '@vueuse/core';

const { q, w, e, r, t, y } = useMagicKeys();
const fighters: any = ref(null);
const isFighting = ref(false);
const store: any = inject('store');
const router = useRouter();

const changeCode = (idx: number) => {
  if (codes.value[idx].selectedIndex === codes.value[idx].items.length - 1) {
    codes.value[idx].selectedIndex = 0;
    return;
  }
  codes.value[idx].selectedIndex += 1;
};

const codes = ref([
  {
    items: ['a', 'b', 'c'],
    selectedIndex: 0,
  },
  {
    items: ['a', 'b', 'c'],
    selectedIndex: 0,
  },
  {
    items: ['a', 'b', 'c'],
    selectedIndex: 0,
  },
  {
    items: ['a', 'b', 'c'],
    selectedIndex: 0,
  },
  {
    items: ['a', 'b', 'c'],
    selectedIndex: 0,
  },
  {
    items: ['a', 'b', 'c'],
    selectedIndex: 0,
  },
]);

watch(q, (v) => {
  if (v) {
    changeCode(0);
  }
});
watch(w, (v) => {
  if (v) {
    changeCode(1);
  }
});
watch(e, (v) => {
  if (v) {
    changeCode(2);
  }
});
watch(r, (v) => {
  if (v) {
    changeCode(3);
  }
});
watch(t, (v) => {
  if (v) {
    changeCode(4);
  }
});
watch(y, (v) => {
  if (v) {
    changeCode(5);
  }
});

onMounted(() => {
  fighters.value = store.getFighters();
  if (!fighters.value.firstFighter) {
    router.push({ name: 'SelectPlayer' });
  }
  setTimeout(() => {
    isFighting.value = true;
  }, 4000);
});
</script>
<template>
  <div v-show="!isFighting" class="wrapper flex flex-col items-center">
    <div class="title flex flex-col items-center">
      <h1>BATTLE</h1>
      <h3 class="sub">1</h3>
    </div>
    <div v-if="fighters" class="flex justify-center relative section">
      <div class="first-player">
        <img :src="fighters.firstFighter?.img" alt="player" class="player" />
      </div>
      <img src="../assets/vs.png" alt="vs-icon" class="vs flex" />
      <div class="second-player">
        <img :src="fighters.secondFighter?.img" alt="player" class="player" />
      </div>
    </div>
    <div class="flex">
      <div
        v-for="(code, idx) in codes"
        :key="idx"
        class="codes flex items-center justify-center ml-2"
      >
        {{ code.items[code.selectedIndex] }}
      </div>
    </div>
  </div>
  <div v-show="isFighting" class="flex fighter-zone">
    <img
      src="../assets/fight-zone.png"
      alt="bg"
      class="fighter-zone__bg m-auto"
    />
    <div v-if="fighters" class="flex justify-center relative section">
      <div class="first-player fighting">
        <img :src="fighters.firstFighter?.img" alt="player" class="player" />
      </div>
      <div class="second-player fighting">
        <img :src="fighters.secondFighter?.img" alt="player" class="player" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.wrapper {
  color: lightgray;
  text-transform: uppercase;
  min-height: 100vh;
  padding: 40px 40px 60px 40px;
}

.section {
  margin-top: auto;
  width: 100%;
  height: 100%;
}

.vs {
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-top: -100px;
}

.first-player {
  width: 350px;
  margin: 0 20px 40px 0;

  .player {
    width: 100%;
  }
  &.fighting {
    margin: auto;
  }
}

.second-player {
  width: 350px;
  margin: 0 0 40px 20px;

  .player {
    width: 100%;
    transform: scaleX(-1);
  }
  &.fighting {
    margin: auto;
  }
}

.codes {
  border: 2px solid #ccc;
  width: 50px;
  height: 50px;
  margin-left: 4px;
  font-size: 22px;

  &:first-child {
    margin-left: 0;
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

.title {
  color: #ccc;
  font-size: 24px;

  .sub {
    font-size: 36px;
  }
}

.fighter-zone {
  width: 100vw;
  height: 100vh;

  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 90%;
  }
}
</style>
