<script setup lang="ts">
</script>
<template>
  <router-link to="/">
    <div class="tl-payment-back">
      <img
        src="@/assets/icons/arrow.svg"
        alt="arrow"
      >
    </div>
  </router-link>
</template>

<style lang="scss">
  .tl-payment-back {
    width: 49px;
    height: 49px;
    left: 45px;
    top: 102px;
    background: #EEEEEE;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
</style>
