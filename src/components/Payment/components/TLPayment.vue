<script setup lang="ts">
</script>

<template>
  <div class="tl-payment">
    <div class="tl-payment__container">
      <TLPaymentInfoForm />
    </div>
    <div class="tl-payment__footer">
      <div class="tl-payment__footer-contacts-box">
        <a
          class="tl-payment__footer-contact"
          href="tel:88003330778"
        >
          8 800 333 0778
        </a>
        <div class="tl-payment__footer-schedule">
          С 09:00 до 21:00 MSK<div />
        </div>
      </div>
      <div class="tl-payment__footer-support">
        <img
          src="@/assets/icons/chat.png"
          alt="chat"
          class="tl-payment__footer-support-img"
        >
        <p class="tl-payment__footer-support-text">
          поддержка
        </p>
      </div>
      <div class="tl-payment__footer-offer ">
        Оферта
      </div>
      <div class="tl-payment__footer-support tl-payment__footer-support-mobile">
        <img
          src="@/assets/icons/chat.png"
          alt="chat"
          class="tl-payment__footer-support-img"
        >
        <p class="tl-payment__footer-support-text">
          поддержка
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.tl-payment {
  &__footer {
    max-width: 900px;
    margin: 0 auto;
    padding: 15px 25px 28px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 950px) {
      max-width: 420px;
      align-items: flex-start;
      flex-wrap: wrap;

    }
  }

  &__footer-contacts-box {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  &__footer-contact {
    font-family: 'GothamPro-Medium', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 150%;
    color: #141519;
  }

  &__footer-schedule {
    font-size: 16px;
    line-height: 150%;

    color: #7E7F83;
  }

  &__footer-support {
    display: flex;
    gap: 10px;
    align-items: center;
    cursor: pointer;

    @media (max-width: 950px) {
      display: none;
      max-width: 420px;
    }
  }

  &__footer-support-mobile {
    margin: 30px auto 0;
    display: none;
    @media (max-width: 950px) {
      display: flex;
      max-width: 420px;
    }
  }

  &__footer-support-text {
    text-transform: uppercase;
  }

  &__footer-support-text, &__footer-offer {
    font-family: 'GothamPro-Medium', sans-serif;
    font-size: 18px;
    line-height: 150%;

    color: #565656;
  }

  &__container {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 25px;
    display: flex;
    gap: 0 10px;

    @media (max-width: 950px) {
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
.
