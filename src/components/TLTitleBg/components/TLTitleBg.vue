<script setup lang="ts">
interface Props {
  text: string;
  image?: boolean;
}

defineProps<Props>();
</script>

<template>
  <div class="tl-title-box">
    {{ text }}
  </div>
</template>

<style lang="scss">
.tl-title-box {
  padding: 26px 25px;
  background-color: #F7F7F7;
  margin-bottom: 30px;
  font-family: 'GothamPro-bold', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 140%;
  border-radius: 10px;
  display: flex;
  justify-content: center;

  @media ( max-width: 768px) {
    padding: 26px 7px;
  }
}
</style>
