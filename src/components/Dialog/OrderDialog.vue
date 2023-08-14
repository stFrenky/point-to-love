<script lang="ts" setup>
import {
  computed, ref, unref, watch,
} from 'vue';
import { storeToRefs } from 'pinia';
import axios from 'axios';
import { useUserStore } from '@/stores/user';
import { usePackageStore } from '@/stores/package';
import router from '@/app/router';

const packageStore = usePackageStore();
const { promoSetup, buyWithPromocode } = packageStore;
const { selectedPackage, promoData } = storeToRefs(packageStore);
const token = localStorage.getItem('token');

const userStore = useUserStore();
const { profileInfoData } = storeToRefs(userStore);

interface Props {
  title: string | undefined;
  price: number | undefined;
  alias: string | undefined;
  isShow: boolean;
  modelValue: boolean | false;
}

const selectedPolit = ref(false);
const selectedCheck = ref();
const promocode = ref('');
const statusPromocode = ref(false);
const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (newValue) => emit('update:modelValue', newValue),
});
const sendBuy = async () => {
  if (!promoData.value.alias) {
    try {
      const buyres = await axios.post('/api/client/v1/buy/anonymous', {
        phone: unref(profileInfoData).phone,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        alias: selectedPackage.value.alias,
        token: unref(token),
        first_name: unref(profileInfoData).first_name,
        last_name: unref(profileInfoData).last_name,
        email: unref(profileInfoData).email,
        redirect_merchant_url: window.location.href,
        success_redirect_url: window.location.href,
        policy_check: true,
        receipt_check: true,
        create_service_request: false,

      });
      window.location.href = buyres.data.data._url;
      setTimeout(() => {
        router.push('/my-packages');
      }, 500);
    } catch (error) {
      console.log(error);
    }
  } else {
    const dataPromocodeRequest = ref({
      phone: unref(profileInfoData).phone,
      code: unref(promocode),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      alias: promoData.value.alias,
      first_name: unref(profileInfoData).first_name,
      last_name: unref(profileInfoData).last_name,
      email: unref(profileInfoData).email,
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = promoData.value.alias.replace(/^[^_]*_/, '');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (result === selectedPackage.value.alias) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      buyWithPromocode(dataPromocodeRequest.value);
    }
  }
};
const sendPromocode = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  promoSetup(unref(promocode), unref(selectedPackage).alias);
};
watch(dialogVisible, () => {
  statusPromocode.value = false;
  promocode.value = '';
  selectedPolit.value = false;
  promoData.value = { alias: '', price: '' };
});
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :show-close="false"
    class="orderDialog"
  >
    <template #header="{ close }">
      <div class="dialog__container">
        <div class="title">
          Оформить заказ
        </div>
        <img
          src="@/assets/icons/close-popup.svg"
          alt="close"
          class="c-pointer"
          @click="close"
        >
      </div>
    </template>
    <div class="tl-package-services-popup__inner">
      <div class="tl-package-services-popup__package-title">
        {{ title }}
      </div>
      <form
        action="#"
        class="tl-package-services-popup__form"
      >
        <div class="tl-package-services-popup__package-price">
          <span
            class="defaultPrice"
            :class="{ 'old': promoData.price }"
          >{{ price }} &#8381;</span>
          <span
            v-if="promoData.price"
            class="promoPrice"
          >{{ promoData.price }} &#8381;</span>
        </div>
        <div class="tl-package-services-popup__input-list">
          <TLInput
            v-model="profileInfoData.first_name"
            type="text"
            profile-input
            placeholder="Имя"
          />
          <TLInput
            v-model="profileInfoData.last_name"
            type="text"
            profile-input
            placeholder="Фамилия"
          />
          <TLInput
            v-model="profileInfoData.phone"
            v-mask="'+7##########'"
            type="tel"
            profile-input
            placeholder="+7 999 999 99 99"
          />
        </div>
        <div class="tl-package-services-popup__promo-code">
          <div
            class="btnOpen"
            @click="statusPromocode = !statusPromocode"
          >
            Есть промо - код?
          </div>
          <template v-if="statusPromocode">
            <TLInput
              v-model="promocode"
              class="inputPromocode"
              certificate-input
              type="tel"
              payment-info
            />
            <div
              class="inputPromocode__btn"
              @click="sendPromocode"
            >
              Применить
            </div>
          </template>
        </div>
        <div class="tl-package-services-popup__check">
          <TLCheckbox
            v-model="selectedCheck"
            id-for="check"
            popup-checkbox
          >
            Мне нужен чек
          </TLCheckbox>
          <TLInput
            v-if="selectedCheck"
            v-model="profileInfoData.email"
            type="text"
            profile-input
            placeholder="Email"
          />
        </div>
      </form>
      <TLCheckbox
        v-model="selectedPolit"
        id-for="polit"
        class="polit"
      >
        Нажимая на кнопку “Оплатить”,
        я соглашаюсь на обработку моих персональных данных, в соответствии
        с Федеральным законом от 27.07.2006 года №152-ФЗ «О персональных данных»,
        на условиях и для целей, определенных
        в <a
          href="PrivacyPolicyVipsy.pdf"
          target="_blank"
        >
          Политикой конфиденциальности
        </a>
        и
        <a
          href="UserAgreementOffer.pdf"
          target="_blank"
        >
          Офертой
        </a>
      </TLCheckbox>
      <div />
    </div>
    <template #footer>
      <TLBtn
        :disabled="!selectedPolit"
        text="Заказать"
        class="tl-package-services-popup__btn"
        @click="sendBuy"
      />
    </template>
  </el-dialog>
</template>

<style lang="scss">
.tl-package-services-popup {
  top: 0;
  right: 0;
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.31);
  padding: 0 20px;
  z-index: 20;
  &__container {
    background: #fff;
    position: relative;
    max-width: 640px;
    width: 100%;
    min-height: 690px;
    padding: 20px 20px 40px 20px;
    border-radius: 10px;

    @media (max-width: 768px) {
      padding: 10px 10px 40px 10px;
    }

    img {
      position: absolute;
      top: 45px;
      right: 45px;

      @media (max-width: 768px) {
        top: 35px;
        right: 35px;
      }
    }
  }

  &__title {
    justify-content: flex-start;
    position: relative;
  }

  &__inner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 400px;
    margin: 0 auto;
  }

  .tl-package-services-popup__form {
    max-width: 300px;
    width: 100%;
  }
  .polit {
    margin-bottom: 45px;
  }
  &__package-title {
    font-family: 'GothamPro-bold', sans-serif;
    font-size: 32px;
    line-height: 140%;
    text-transform: uppercase;
    color: #000000;
    text-align: center;
    margin-bottom: 15px;

    @media (max-width: 600px) {
      font-size: 18px;
    }
  }

  &__package-price {
    font-family: 'GothamPro-Medium', sans-serif;
    font-size: 32px;
    line-height: 18px;
    color: #9A1E2D;
    margin-bottom: 40px;
    text-align: center;
    .defaultPrice {
      &.old {
        font-size: 26px;
        color: black;
        text-decoration: line-through;
      }
    }
    .promoPrice {
      margin-left: 16px;
    }
  }

  &__input-list {
    display: flex;
    flex-direction: column;
    gap: 15px 0;
    margin-bottom: 15px;
  }

  &__promo-code {
    font-family: 'GothamPro-Medium', sans-serif;
    margin-bottom: 60px;
    .btnOpen {
      font-size: 16px;
      line-height: 18px;
      color: #9A1E2D;
      text-decoration: underline;
      cursor: pointer;
    }
    .inputPromocode {
      margin-top: 6px;
      &__btn {
        cursor: pointer;
        font-weight: 400;
        font-size: 16px;
        line-height: 18px;
        color: #000000;
        margin-top: 10px;
      }
    }
  }

  &__check {
    font-family: 'GothamPro-Medium', sans-serif;

    font-size: 15px;
    line-height: 18px;
    color: #000000;
    margin-bottom: 80px;
  }

  &__btn {
    margin: 0 auto;
    width: 170px;
    height: 46px;
  }
}
</style>
