<template>
  <div class="footer">
    <div class="footer__container">
      <a href="PrivacyPolicyVipsy.pdf" target="_blank">Политика конфиденциальности</a>
      <a href="https://forms.yandex.ru/cloud/62d1229c1061a63cf79d2a0e/" target="_blank">Форма возврата</a>
      <a href="UserAgreementOffer.pdf" target="_blank">Соглашение с пользователем</a>
    </div>
  </div>
</template>
<style lang="scss">
  .footer {
    &__container {
      display: flex;
      justify-content: space-between;
      max-width: 1200px;
      width: 100%;
      padding: 35px 20px;
      margin: 0 auto;
      @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        gap: 12px;
      }
    }
    a {
      font-family: "GothamPro-bold", sans-serif;
      font-weight: 400;
      font-size: 20px;
      line-height: 150%;
      color: #9A1E2D;
      @media (max-width: 768px) {
        font-size: 16px;
      }
    }
  }
</style>
