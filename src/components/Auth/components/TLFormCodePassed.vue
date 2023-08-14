<template>
  <div class="tl-code-passed">
    <div class="tl-code-passed__img-wrap">
      <img
        src="@/assets/icons/check-mark.svg"
        alt="checked"
      >
    </div>
    <p class="tl-code-passed__text">
      Код успешно отправлен
    </p>
  </div>
</template>

<style lang="scss">
.tl-code-passed {
    position: absolute;
    padding: 15px 20px;
    align-items: center;
    background: $main;
    color: white;
    font-size: 20px;
    line-height: 120%;
    width: 300px;
    height: 90px;
    display: flex;
    gap: 25px;
    border-radius: 5px;
    top: 0;
    right: -300px;

  @media (max-width: 1200px) {
    position: static;
    right: 0;
    top: -125px;
    width: 100%;
    margin-bottom: 30px;
  }

  &__img-wrap {
    width: 62px;
    height: 62px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
  }

  &__text {
    width: 150px
  }
}

</style>
