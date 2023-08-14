<script setup lang="ts">

</script>

<template>
  <div
    class="tl-phone"
  >
    <a
      class="tl-phone__desktop"
      href="tel:88006009993"
    >
      <img
        class="tl-phone__image"
        src="@/assets/icons/phone.svg"
        alt="phone"
      >
      8 800 600 99 93</a>
    <a
      class="tl-phone__mobile"
      href="tel:88006009993"
    >
      <img
        class="tl-phone__image"
        src="@/assets/icons/phone-mobile.svg"
        alt="phone"
      >
    </a>
  </div>
</template>
<style lang="scss">
.tl-phone {
    font-size: 16px;
    line-height: 15px;
    padding: 18px;
    margin-left: auto;

    @media (max-width: 1100px) {
      margin-left: auto;
    }

    @media (max-width: 500px) {
      padding: 0;
      width: fit-content;
    }

    &__image {
      width: 24px;
      height: 24px;
      margin-right: 10px;

      @media (max-width: 500px) {
        width: 50px;
        height: 50px;
      }

    }

    &__desktop {
      align-items: center;
      display: flex;
      gap: 0 10px;
      white-space: nowrap;
      @media (max-width: 500px) {
          display: none;
      }
    }

    &__mobile {
        display: none;

        @media (max-width: 500px) {
            display: flex;
        }
    }
}
</style>
