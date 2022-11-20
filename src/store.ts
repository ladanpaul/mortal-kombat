import { reactive, readonly } from 'vue';

interface Fighter {
  img: string;
}

interface State {
  firstFighter: null | { img: string };
  secondFighter: null | { img: string };
}

const state: State = reactive({
  firstFighter: null,
  secondFighter: null,
});

const getFighters = () => {
  return {
    firstFighter: state.firstFighter,
    secondFighter: state.secondFighter,
  };
};

const setFighters = (firstFighter: Fighter, secondFighter: Fighter) => {
  state.firstFighter = firstFighter;
  state.secondFighter = secondFighter;
};

export default {
  state: readonly(state),
  setFighters,
  getFighters,
};
