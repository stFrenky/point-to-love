<script setup lang="ts">
</script>
<template>
  <div class="tl-profile-info">
    <div class="tl-profile-info__container">
      <TLTitleBg text="Профиль" />
      <TLProfileForm />
      <TLRecommendedDoctor />
    </div>
  </div>
</template>

<style lang="scss">
.tl-profile-info {
  padding-top: 45px;

  &__container {
    box-sizing: border-box;
    max-width: 940px;
    padding: 0 20px 42px 20px;
    margin: 0 auto;
  }

  &__recommended {
    margin-top: 50px;
  }
}
</style>
