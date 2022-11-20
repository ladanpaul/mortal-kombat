<script setup lang="ts">
import { ref, computed, watch, PropType, onMounted } from 'vue';
import { useMagicKeys } from '@vueuse/core';
import { useFunctions } from '../composition';

const { up, down, left, right, enter } = useMagicKeys();
const { chunkArray } = useFunctions();

const emit = defineEmits(['firstFighter', 'secondFighter', 'start']);
const isStart = ref(false);

enum Emits {
  first = 'firstFighter',
  second = 'secondFighter',
}

const props = defineProps({
  players: {
    type: Array as PropType<Array<{ name: string }>>,
    required: true,
  },
});

const isFirstSelected = ref(false);
const isSecondSelected = ref(false);

const selectedCurrent: any = ref({
  row: 0,
  col: 0,
});

const fighters: any = ref(null);

const getImageUrl = (name: string) => {
  return new URL(`../assets/fighters/${name}.png`, import.meta.url).href;
};

const players: any = computed(() => {
  return props.players.map((player) => ({ img: getImageUrl(player.name) }));
});

watch(enter, (v) => {
  if (v) {
    if (isStart.value) {
      return;
    }
    if (!isFirstSelected.value) {
      isFirstSelected.value = true;
      unSelectFighter();
      selectFighter(0, 0);
    } else {
      isSecondSelected.value = true;
      isStart.value = true;
      emit('start');
    }
  }
});
watch(up, (v) => {
  if (v) {
    if (!selectedCurrent.value.row || isStart.value) {
      return;
    }
    unSelectFighter();
    selectFighter(selectedCurrent.value.row - 1, selectedCurrent.value.col);
  }
});
watch(down, (v) => {
  if (v) {
    if (
      selectedCurrent.value.row >= fighters.value.length - 1 ||
      isStart.value
    ) {
      return;
    }
    unSelectFighter();
    selectFighter(selectedCurrent.value.row + 1, selectedCurrent.value.col);
  }
});
watch(left, (v) => {
  if (v) {
    if (!selectedCurrent.value.col || isStart.value) {
      return;
    }
    unSelectFighter();
    selectFighter(selectedCurrent.value.row, selectedCurrent.value.col - 1);
  }
});
watch(right, (v) => {
  if (v) {
    if (
      selectedCurrent.value.col >=
        fighters.value[selectedCurrent.value.row].length - 1 ||
      isStart.value
    ) {
      return;
    }
    unSelectFighter();
    selectFighter(selectedCurrent.value.row, selectedCurrent.value.col + 1);
  }
});

const selectFighter = (row: number, col: number) => {
  fighters.value[row][col].isSelected = true;
  selectedCurrent.value = { row, col };

  const emitName = !isFirstSelected.value ? Emits.first : Emits.second;
  emit(emitName, fighters.value[row][col]);
};

const unSelectFighter = () => {
  fighters.value[selectedCurrent.value.row][
    selectedCurrent.value.col
  ].isSelected = false;
};

onMounted(() => {
  fighters.value = chunkArray(players.value, 3);

  selectFighter(selectedCurrent.value.row, selectedCurrent.value.col);
});
</script>
<template>
  <div class="players">
    <div v-for="(row, rowIdx) in fighters" :key="rowIdx" class="players">
      <div
        v-for="(col, colIdx) in row"
        :class="['player', { selected: col.isSelected }]"
      >
        <img :src="col.img" alt="fighter" class="fighter" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.players {
  display: flex;
  flex-wrap: wrap;
  width: 495px;
  outline: none;

  .player {
    width: 165px;
    height: 165px;
    border: 2px solid orange;
    font-size: 18px;
    overflow: hidden;
    outline: none;
    background: rgba(#2b2b2b, 0.7);
  }

  .selected {
    border: 4px solid white;

    .fighter {
      transform: scale(1.2);
    }
  }
}

.fighter {
  width: 100%;
  height: 100%;
}
</style>
