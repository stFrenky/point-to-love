<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const { setToken } = userStore;

onMounted(async () => {
  setTimeout(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!window.smartCaptcha) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.smartCaptcha.render('captcha-container', {
      sitekey: 'ysc1_5ec85GLhCDUjDBupbmi6DGkZUd7O8cmxbrDO2rWS6ca5962b',
      invisible: true, // Сделать капчу невидимой
      callback: setToken,
    });
  }, 750);
});
</script>

<template>
  <div class="tl-auth">
    <div class="tl-auth__container">
      <TLAuthForm />

      <!-- <div class="tl-auth__alternative-login">
        <p class="tl-auth__alternative-login-text">
          или войти через
        </p>
        <a
          href="https://my.vipsy.online/api/social_auth/login/google-oauth2"
          target="_blank"
        >
          <img
            src="@/assets/icons/google.png"
            alt="Google"
          >
        </a>
      </div> -->
    </div>
  </div>
  <div id="captcha-container" />
</template>

<style lang="scss">
  .tl-auth {
    padding: 0 20px;
    margin: auto 0;

    &__container {
      position: relative;
      max-width: 570px;
      margin: 0 auto;
    }

    &__alternative-login {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;
    }

    &__alternative-login-text {
      font-size: 20px;
      line-height: 150%;
      text-align: center;
    }
  }
</style>
