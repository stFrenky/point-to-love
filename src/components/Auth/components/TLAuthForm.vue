<script setup lang="ts">
import {
  computed, onMounted, ref, unref,
} from 'vue';
import { storeToRefs } from 'pinia';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { IMaskComponent } from 'vue-imask';
import TLFormCodePassed from './TLFormCodePassed.vue';
import { useUserStore } from '@/stores/user';

const checked = ref('phone');
const userStore = useUserStore();
const {
  tel, email, token, sms,
} = storeToRefs(userStore);

const { sendPhone, checkOtp } = userStore;
const code = ref('');
const countdown = ref(3);
const formattedTel = computed(() => tel.value?.replace(/[\s]/g, ''));

const getSmartToken = async () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.smartCaptcha.execute();
  setTimeout(async () => {
    if (unref(formattedTel) !== null && token.value !== null) {
      await sendPhone(unref(formattedTel) as string, unref(token) as string);
    }
  }, 1000);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.smartCaptcha.reset();
};

const enter = () => {
  checkOtp(unref(formattedTel) as string, unref(code) as string);
};
</script>
<template>
  <form
    class="tl-form"
    action="#"
  >
    <div class="tl-form__auth-variant">
      <TLRadio
        id="phone"
        v-model="checked"
        label="Телефон"
        name="tl-auth-variant"
        type="phone"
      />
      <!-- <TLRadio
        id="email"
        v-model="checked"
        type="email"
        label="E-mail"
        name="tl-auth-variant"
      /> -->
    </div>

    <div class="tl-form__input-wrap">
      <div
        v-if="checked === 'phone'"
        class="tl-form__input-tel-wrap"
      >
        <IMaskComponent
          v-model="tel"
          placeholder="+7 999 999 99 99"
          type="tel"
          class="tl-form__input-tel"
          :mask="'+{7} 000 000 00 00'"
        />
      </div>

      <TLInput
        v-if="checked === 'email'"
        v-model="email"
        type="email"
        placeholder="Введите e-mail"
      />
      <TLInput
        v-if="sms"
        v-model="code"
        type="text"
        placeholder="Код из SMS"
      />
      <TLInput
        v-if="checked === 'email'"
        type="password"
        placeholder="Пароль"
      />
    </div>

    <TLBtn
      v-if="sms"
      text="Отправить повторно"
      @click="getSmartToken()"
    />

    <div
      class="tl-form__btn-wrap"
    >
      <TLBtn
        v-if="checked === 'email'"
        form-btn
        text="Вход"
      />

      <TLBtn
        v-if="checked === 'phone'"
        form-btn-send
        :text="sms ? 'Вход' : 'Отправить код'"
        @click="sms ? enter() : getSmartToken()"
      />
      <TLBtn
        v-if="checked === 'email'"
        form-btn-reg
        text="Регистрация"
      />
    </div>
  </form>
</template>

<style lang="scss">
.tl-form {
  display: flex;
  flex-direction: column;

  &__auth-variant {
    display: flex;
    justify-content: space-between;
    padding: 0 80px;
    margin-bottom: 75px;
    gap: 100px;

    @media (max-width: 768px) {
      padding: 0;
      gap: 20px;
      flex-direction: column;
    }
  }

  &__input-wrap {
    display: flex;
    flex-direction: column;
    gap: 50px 0;
    margin-bottom: 25px;
  }

  &__btn-wrap {
    display: flex;
    gap: 0 30px;
    margin-top: 60px;
    margin-bottom: 30px;

    @media (max-width: 425px) {
      flex-direction: column;
      gap: 20px 0;
      margin-top: 100px;

    }
  }

  &__input-tel {
    width: 100%;
    height: 46px;
    border: none;
    appearance: none;
    outline: none;
    font-size: 24px;
    line-height: 150%;
  }

  &__input-tel-wrap {
    border-bottom: 2px solid #2E2E2E;
    position: relative;
  }
}

.tl-input.certificateTel {
  padding-left: 25px;
}

</style>
