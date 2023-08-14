<script lang="ts" setup>
import { ref, onMounted, unref } from 'vue';
import { storeToRefs } from 'pinia';
import moment from 'moment';
import axios from 'axios';
import { usePackageStore } from '@/stores/package';
import router from '@/app/router';
import { useUserStore } from '@/stores/user';

const packageStore = usePackageStore();
const userStore = useUserStore();

const { selectedPackage } = storeToRefs(packageStore);
const { profileInfoData } = storeToRefs(userStore);

const statusConsDialog = ref();

interface Data {
  verbose_name: string;
  dt_end: string;
  services: [
    {
      id: number;
      is_video_conference: boolean;
      verbose_name: string;
      quantity: number;
      initial_quantity: number;
    }
  ];
}

interface Props {
  datas: Data[];
  buyAgain: boolean;
}
const currentData = ref({});
const props = defineProps<Props>();
const todaysDate = ref(new Date());
const token = localStorage.getItem('token');
const formattedDate = ref('');

const openConsDialog = () => {
  statusConsDialog.value = true;
};

const handleClick = async (data: object) => {
  currentData.value = data;
  if (props.buyAgain) {
    try {
      const buyres = await axios.post('/api/client/v1/buy/anonymous', {
        phone: unref(profileInfoData).phone,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        alias: data.alias,
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
    openConsDialog();
  }
};

onMounted(() => {
  formattedDate.value = moment(todaysDate.value).format('ddd MMM DD, YYYY [at] HH:mm a');
});
</script>

<template>
  <div
    v-for="(data, index) in datas"
    :key="index"
    class="tl-my-packages-item"
  >
    <div class="tl-my-packages-item__header">
      <div class="tl-my-packages-item__title">
        {{ data.verbose_name }}
      </div>
      <div class="tl-my-packages-item__header-about">
        <div class="tl-my-packages-item__whole">
          Всего
        </div>
        <div class="tl-my-packages-item__only">
          Осталось
        </div>
      </div>
    </div>
    <div
      v-for="(service, key) in data.services"
      :key="key"
      class="tl-my-packages-item__counter-box"
    >
      <div class="tl-my-packages-item__counter-title">
        {{ service.verbose_name }}
      </div>
      <div class="tl-my-packages-item__counter-wrap">
        <div class="tl-my-packages-item__counter-whole">
          {{ service.initial_quantity }}
        </div>
        <div class="tl-my-packages-item__counter-only">
          {{ service.quantity }}
        </div>
      </div>
    </div>
    <div class="tl-my-packages-item__valid-until-box">
      <div class="tl-my-packages-item__valid-until-text">
        Действителен до
      </div>
      <div class="tl-my-packages-item__valid-until-date">
        {{ moment(data.dt_end).format('DD.MM.YYYY') }}
      </div>
    </div>
    <TLBtn
      :text="!buyAgain ? 'Записаться на консультацию' : 'Купить ещё'"
      class="tl-my-packages-item__btn"
      @click="handleClick(data)"
    />
  </div>
  <ConsDialog
    v-model="statusConsDialog"
    :current-data="currentData"
  />
</template>

<style lang="scss">
.tl-my-packages-item {
  max-width: 740px;
  width: 100%;
  border: 2px solid #E6E6E6;
  border-radius: 10px;
  padding: 35px 50px;
  display: flex;
  flex-direction: column;
  gap: 20px 0;

  @media (max-width: 768px) {
    padding: 25px 20px;
  }

  &__header, &__counter-box, &__valid-until-box {
    display: flex;
    justify-content: space-between;
    gap: 0 20px;
    align-items: center;
  }

  &__header, &__counter-box, {
    border-bottom: 1px solid #CACACA;
    padding-bottom: 5px;
  }

  &__header-about, &__counter-wrap {
    margin-left: auto;
    max-width: 200px;
    width: 100%;
    display: grid;
    justify-content: center;
    grid-template-columns: 1fr 1fr;

    &>* {
      display: flex;
      justify-content: center;
    }

    @media (max-width: 768px) {
     max-width: 150px;
    }
  }

  &__title {
    font-family: 'Gotham-bold', sans-serif;
    font-weight: 700;
    font-size: 28px;
    line-height: 140%;
    color: #000000;
  }

  &__header-about {
    font-family: 'GothamPro-Medium', sans-serif;
    font-size: 20px;
    font-weight: 400;
    line-height: 140%;

    @media (max-width: 768px) {
      font-size: 16px;
    }
  }

  &__counter-box, &__valid-until-box {
    font-family: 'GothamPro-Medium', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;

    @media (max-width: 768px) {
      font-size: 12px;
    }
  }

  &__counter-only, &__counter-whole {
    font-size: 20px;
  }

  &__valid-until-box {
    color: #9A1E2D;
  }

  &__counter-box {
    padding-bottom: 20px;
  }

  &__counter-only {
    color: #9A1E2D;
  }

  &__btn {
    max-width: 290px;
    margin: 30px auto 0 0;

    @media (max-width: 500px) {
      margin: 30px auto 0 auto;

    }
  }
}
</style>
