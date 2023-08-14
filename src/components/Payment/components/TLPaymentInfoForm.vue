<script setup lang="ts">
import { storeToRefs } from 'pinia';
import {
  onBeforeMount, ref, unref,
} from 'vue';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ElMessage } from 'element-plus';
import axios from 'axios';
import { useUserStore } from '@/stores/user';
import { usePackageStore } from '@/stores/package';
import router from '@/app/router';

const packageStore = usePackageStore();
const userStore = useUserStore();

const selectedPolit = ref();

const { getPackage, buyWithPromocode, promoSetup } = packageStore;
const { packages, promoData } = storeToRefs(packageStore);
const { profileInfoData } = storeToRefs(userStore);
const selectedObject = ref();
const promocode = ref('');

const handleData = (name: any, alias: any, price: any) => {
  const packageWithDesiredAlias = packages.value.find((obj) => obj.alias === alias);
  selectedObject.value = packageWithDesiredAlias;
};
onBeforeMount(() => {
  getPackage();
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get('name') || '';
  const alias = urlParams.get('alias') || '';
  const price = urlParams.get('price') || '';
  handleData(name, alias, price);
});

const sendBuy = async () => {
  if (!promoData.value.alias) {
    try {
      const buyres = await axios.post('/api/client/v1/buy/anonymous', {
        phone: unref(profileInfoData).phone,
        alias: selectedObject.value.alias,
        email: unref(profileInfoData).email,
        first_name: unref(profileInfoData).first_name,
        last_name: unref(profileInfoData).last_name,
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
      ElMessage({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        message: error.response.data,
        type: 'error',
      });
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
    if (result === selectedObject.value.alias) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      buyWithPromocode(dataPromocodeRequest.value);
    }
  }
};

const sendPromocode = () => {
  promoSetup(unref(promocode), selectedObject.value.alias);
};
</script>

<template>
  <div class="tl-payment-info">
    <div class="tl-payment-info__top">
      <TLPaymentBack />
      <div class="tl-payment-info__image">
        <p class="tl-payment-info__text">
          {{ selectedObject.verbose_name }}
        </p>
      </div>
    </div>
    <div class="tl-payment-info__bottom">
      <TLInput
        v-model="profileInfoData.email"
        certificate-input
        type="email"
        label="Ваш e-mail"
        about="Пришлем электронный чек на этот e-mail"
        payment-info
      />
      <div class="tl-payment-info__bottom-wrap-flag">
        <img
          class="tl-payment-info__bottom-wrap-flag-img"
          src="@/assets/icons/flag.svg"
          alt="flag"
        >
        <TLInput
          v-model="profileInfoData.phone"
          v-mask="'+7##########'"
          certificate-tel
          certificate-input
          type="tel"
          label="Ваш телефон*"
          about="Для получения личного кода для входа"
          payment-info
        />
      </div>

      <TLInput
        v-model="profileInfoData.first_name"
        certificate-input
        type="text"
        label="Ваше имя"
        payment-info
      />
      <TLInput
        v-model="profileInfoData.last_name"
        certificate-input
        type="text"
        label="Ваше фамилия"
        payment-info
      />
    </div>
  </div>

  <div class="tl-payment-certificate">
    <div class="tl-payment-certificate__validity-period validity-period">
      <div class="validity-period__title">
        Срок действия
      </div>
      <div class="validity-period__text">
        {{ selectedObject.period.value }} {{ selectedObject.period.type }}
      </div>
    </div>

    <div class="tl-payment-certificate__form">
      <div class="tl-payment-certificate__form-title">
        Консультация появится в личном кабинете после оплаты покупки
      </div>
      <div class="tl-payment-certificate__input-wrap">
        <TLInput
          payment-certificate
          certificate-input
          type="text"
          label="Применить сертификат"
        />
        <div class="input">
          <TLInput
            v-model="promocode"
            payment-certificate
            certificate-input
            type="text"
            label="Применить промокод"
          />
          <div v-if="promocode" @click="sendPromocode" class="link">Применить</div>
        </div>
        <div class="tl-payment-certificate__btn-wrap">
          <TLBtn
            :text="`Оплатить ${!promoData.price ? selectedObject.price : promoData.price} Р`"
            certificate-btn-payment
            :disabled="!selectedPolit"
            @click="sendBuy"
          />
          <TLCheckbox
            v-model="selectedPolit"
            id-for="polit"
            class="tl-payment-certificate__checkbox"
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
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.tl-payment-info {
  max-width: 420px;
  width: 100%;
  background: #F7F7F7;

  &__top {
    padding: 20px;
    display: flex;
    gap: 0 20px;
  }

  &__image {
    background-image: url("@/assets/icons/paymant-info.png");
    width: 234px;
    height: 155px;
    border-radius: 10px;
    display: flex;
    align-items: flex-end;
  }

  &__text {
    font-family: 'GothamPro-bold',sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 17px;
    color: #FFFFFF;
    padding: 0 10px 28px;
  }

  &__bottom {
    display: flex;
    flex-direction: column;
    gap: 55px 0;
    padding: 20px 28px 24px;
  }

  &__bottom-wrap-flag {
    position: relative;
  }

  &__bottom-wrap-flag-img {
    position: absolute;
    z-index: 1;
    top: 5px;
  }
}

.tl-payment-certificate {
  display: flex;
  flex-direction: column;
  gap: 8px;

  &__form {
    display: flex;
    flex-direction: column;
    gap: 90px;
    padding: 20px;
    max-width: 420px;
    width: 100%;
    background: #F7F7F7;
  }

  &__form-title {
    font-family: GothamPro-Medium, sans-serif;
    font-size: 14px;
    line-height: 150%;
  }

  &__input-wrap {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  &__btn-wrap {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__checkbox {
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;

    color: #606060;
    .tl-checkbox__label {
      display: block;
    }
  }
}

.validity-period {
  padding: 27px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #F7F7F7;

  &__title {
    font-size: 15px;
    line-height: 14px;
    color: #7D7D7D;
  }

  &__text {
    font-size: 14px;
    line-height: 13px;
    font-family: "GothamPro-Medium", sans-serif;
  }
}
</style>
