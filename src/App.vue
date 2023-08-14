<script setup lang="ts">
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const { setToken } = userStore;

const { getProfileInfo } = userStore;
// function onloadFunction() {
//   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-ignore
//   if (!window.smartCaptcha) {
//     return;
//   }

//   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//   // @ts-ignore
//   window.smartCaptcha.render('captcha-container', {
//     sitekey: 'ysc1_5ec85GLhCDUjDBupbmi6DGkZUd7O8cmxbrDO2rWS6ca5962b',
//     invisible: false, // Сделать капчу невидимой
//     callback: setToken,
//   });
// }

// onloadFunction();
getProfileInfo();
</script>

<template>
  <defaultLayout />
</template>
