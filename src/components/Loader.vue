<script setup lang="ts">
import { defineProps } from 'vue';
defineProps({
  backgroundColor: { type: String, default: 'transparent' },
});
</script>
<template>
  <div class="loader-wrapper" :style="{ backgroundColor: backgroundColor }">
    <div class="loader">
      <div class="loader__item loader__item-1"></div>
      <div class="loader__item loader__item-2"></div>
      <div class="loader__item loader__item-3"></div>
      <div class="loader__item loader__item-4"></div>
      <div class="loader__item loader__item-5"></div>
      <div class="loader__item loader__item-6"></div>
      <div class="loader__item loader__item-7"></div>
      <div class="loader__item loader__item-8"></div>
      <div class="loader__item loader__item-9"></div>
      <div class="loader__item loader__item-10"></div>
      <div class="loader__item loader__item-11"></div>
      <div class="loader__item loader__item-12"></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
/////////////////////////
// Adjust these:
/////////////////////////
$items: 12;
$itemWidth: 10;
$itemHeight: 2;
$radius: 12;
$velocity: 1.5;
$colorStart: #ddd;
$colorEnd: #333;
/////////////////////////
// Trigonometry helpers
/////////////////////////
$pi: 3.14159265359;
$_precision: 10;
@function pow($base, $exp) {
  $value: $base;
  @if $exp > 1 {
    @for $i from 2 through $exp {
      $value: $value * $base;
    }
  }
  @if $exp < 1 {
    @for $i from 0 through -$exp {
      $value: $value / $base;
    }
  }
  @return $value;
}
@function fact($num) {
  $fact: 1;
  @if $num > 0 {
    @for $i from 1 through $num {
      $fact: $fact * $i;
    }
  }
  @return $fact;
}
@function _to_unitless_rad($angle) {
  @if unit($angle) == 'deg' {
    $angle: $angle / 180deg * $pi;
  }
  @if unit($angle) == 'rad' {
    $angle: $angle / 1rad;
  }
  @return $angle;
}
@function sin($angle) {
  $a: _to_unitless_rad($angle);
  $sin: $a;
  @for $n from 1 through $_precision {
    $sin: $sin + (pow(-1, $n) / fact(2 * $n + 1)) * pow($a, (2 * $n + 1));
  }
  @return $sin;
}
@function cos($angle) {
  $a: _to_unitless_rad($angle);
  $cos: 1;
  @for $n from 1 through $_precision {
    $cos: $cos + (pow(-1, $n) / fact(2 * $n)) * pow($a, 2 * $n);
  }
  @return $cos;
}
/////////////////////////
// Trigonometry helpers
/////////////////////////
.loader {
  &-wrapper {
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    .loader {
      margin: auto;
    }
  }
  position: relative;
  &__item {
    position: absolute;
    width: $itemWidth + px;
    height: $itemHeight + px;
    background: transparent;
    border-radius: $itemHeight / 2 + px;
  }
  @for $i from 1 through $items {
    &__item-#{$i} {
      $deg: 360deg / $items * $i;
      $offsetX: (cos(360deg / $items * $i) * $radius) - ($itemWidth / 2);
      $offsetY: (sin(360deg / $items * $i) * $radius) - ($itemHeight / 2);
      transform: translate($offsetX + px, $offsetY + px) rotate($deg);
      animation: blink
        #{1 /
        $velocity}s
        linear
        #{$i *
        (1 / $velocity) /
        $items}s
        infinite;
    }
  }
}
@keyframes blink {
  0% {
    background: $colorStart;
  }
  100% {
    background: $colorEnd;
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    background: rotate(360deg);
  }
}
</style>
