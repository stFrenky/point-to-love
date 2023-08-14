<script setup lang="ts">
import { computed } from 'vue';
import router from '@/app/router';

interface Props {
  isShow: boolean;
}
const links = [
  {
    name: 'Главная',
    url: '/',
  },
  {
    name: 'Мои пакеты',
    url: 'my-packages',
  },
  {
    name: 'Общение со специалистом',
    url: 'chat-specialist',
  },
  {
    name: 'Профиль',
    url: 'profile',
  },
];

const isAuthenticated = !!localStorage.getItem('token');

const props = defineProps<Props>();
const emit = defineEmits(['update:isShow']);
const mIsShow = computed({
  get() {
    return props.isShow;
  },
  set(value) {
    emit('update:isShow', value);
  },
});
const logout = () => {
  localStorage.removeItem('token');
  router.push('/login');
  router.go(0);
};
</script>

<template>
  <div class="header tl-menu">
    <nav
      v-if="isAuthenticated"
      class="tl-menu__desktop"
    >
      <div
        v-for="(link, index) in links"
        :key="index"
        class="tl-menu__item"
      >
        <router-link :to="link.url">
          {{ link.name }}
        </router-link>
      </div>
    </nav>
    <nav
      v-if="mIsShow"
      class="tl-menu__mobile"
    >
      <div
        class="tl-menu__hamburger-close"
        @click="mIsShow = false"
      >
        <img
          class="tl-header__hamburger"
          src="@/assets/icons/hamburger-close.svg"
          alt="hamburger"
        >
      </div>
      <div
        v-if="isAuthenticated"
        class="tl-menu__mobile-list"
      >
        <div
          v-for="(link, index) in links"
          :key="index"
          class="tl-menu__item"
          @click="mIsShow = false"
        >
          <router-link :to="link.url">
            {{ link.name }}
          </router-link>
        </div>
        <TLBtn
          text="Выход"
          class="tl-header__btn"
          @click="logout"
        />
      </div>
    </nav>
  </div>
</template>
<style lang="scss">
.tl-menu {
  align-items: center;
  display: flex;
  justify-content: center;

  &__desktop {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    gap: 0 15px;
    width: 100%;

    @media (max-width: 1100px) {
      display: none;
    }
  }

  &__mobile {
    position: fixed;
    top: 0;
    right: 0;
    max-width: 414px;
    background-color: #fff;
    padding: 15px 20px;
    width: 100%;
    z-index: 1;
    align-items: flex-end;
    justify-content: flex-start;
    flex-direction: column;
    height: 100vh;
    display: none;

    @media (max-width: 1100px) {
      display: flex;
    }
    .tl-header__btn {
      margin-top: auto;
    }
  }

  &__mobile.active {
    display: flex;
  }

  &__mobile-list {
    padding: 30px 0;
    align-items: center;
    flex-direction: column;
    gap: 40px 0;
    display: flex;
    width: 100%;
    justify-content: flex-start;
    height: 100%;

    .tl-menu__item {
      font-weight: 400;
      font-size: 32px;
      line-height: 140%;
      text-align: center;
      color: #000000;
      white-space: normal;
    }
  }

  &__item {
    font-size: 16px;
    line-height: 15px;
    color: #000000;
    white-space: nowrap;
    .router-link-active {
      font-weight: 600;
    }
  }
}
</style>
