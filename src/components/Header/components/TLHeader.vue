<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
import router from '@/app/router';

interface Props {
    buyContainer?:boolean;
    phone?: boolean;
    menu?: boolean;
    marginReset?: boolean;
    userName?: string;
    loginBtn?: boolean;
    hamburger?: boolean;
}

const userStore = useUserStore();
const { sms } = storeToRefs(userStore);

const logout = () => {
  localStorage.removeItem('token');
  sms.value = false;
  router.push('/login');
  router.go(0);
};
const login = () => {
  sms.value = false;
  router.push('/login');
};
const isAuthenticated = !!localStorage.getItem('token');
const props = defineProps<Props>();
const emit = defineEmits(['update:hamburger']);

const isShowHamburger = ref(false);
</script>

<template>
  <div
    class="tl-header"
    :class="{ buyContainer: buyContainer, marginReset: marginReset, }"
  >
    <div
      class="tl-header__container"
      :class="{ buyContainer: buyContainer }"
    >
      <TLLogo />

      <TLHeaderMenu
        v-if="menu"
        v-model:is-show="isShowHamburger"
      />

      <TLPhone
        v-if="phone"
        phone="8 800 600 99 93"
      />

      <div
        v-if="hamburger && isAuthenticated"
        class="tl-header__hamburger"
        @click="isShowHamburger = true"
      >
        <img
          class="tl-header__hamburger-open"
          src="@/assets/icons/hamburger-open.svg"
          alt="hamburger"
        >
      </div>

      <div
        v-if="isAuthenticated"
        class="tl-header__login-btn-wrap exit"
      >
        <TLBtn
          text="Выход"
          class="tl-header__btn"
          @click="logout"
        />
      </div>
      <div
        class="tl-header__login-btn-wrap"
        v-else
      >
        <TLBtn
          text="Войти"
          class="tl-header__btn "
          @click="login"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.tl-header {
  position: relative;
  margin-bottom: 125px;
  padding: 15px 20px;

  @media (max-width: 1200px) {
    margin-bottom: 25px;
  }

  &__container {
    max-width: 1160px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__login-btn-wrap {
    display: flex;
    gap: 0 10px;
    align-items: center;
    &.exit {
      @media (max-width: 1100px) {
        display: none;
      }
    }
    // @media (max-width: 1100px) {
    //   display: none;
    // }
  }

  &__btn {
    height: 42px;
    margin-left: 10px;
  }

  &__hamburger {
    width: 50px;
    height: 50px;
    border-radius: 50px;
    display: none;
    align-items: center;
    justify-content: center;
    background: #9F2016;

    @media (max-width: 1100px) {
      display: flex;
    }
  }

  &__hamburger-close {
    display: none;
  }
}

.tl-header__container.buyContainer {
  max-width: 900px;
  margin: 0 auto;
  display: flex;

}

.tl-header.buyContainer {
  padding: 15px 35px;
  margin-bottom: 15px;
}

.tl-header.marginReset {
  margin-bottom: 0;
}
</style>
