<template>
  <div class="default">
    <TLHeader
      phone
      menu
      margin-reset
      login-btn
      hamburger
    />
    <div class="main">
      <router-view />
    </div>
    <TLFooter />
  </div>
</template>
