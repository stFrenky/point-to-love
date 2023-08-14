<script setup lang="ts">
import { storeToRefs } from 'pinia';
import type { SelectedPackage } from '@/stores/types/PackagesTypes';
import { usePackageStore } from '@/stores/package';

const packageStore = usePackageStore();

const { showOrderDialog } = storeToRefs(packageStore);

interface Props {
  title: string;
  package?: string;
  counter?: number;
  alias: string;
  term: number;
  price: number;
  type: string;
  selectedPackage: SelectedPackage | null;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:selectedPackage']);

const buy = () => {
  showOrderDialog.value = true;
  emit('update:selectedPackage', {
    title: props.title,
    price: props.price,
    alias: props.alias,
  });
};

</script>
<template>
  <div class="tl-package-services-item">
    <div class="tl-package-services-item__title">
      {{ title }}
    </div>
    <div class="tl-package-services-item__package-box">
      <div class="tl-package-services-item__package">
        {{ package }}
      </div>
      <div class="tl-package-services-item__package-counter">
        {{ counter }}
      </div>
    </div>
    <div class="tl-package-services-item__package-term">
      Срок активации услуги - {{ term }} {{ type }}
    </div>
    <div class="tl-package-services-item__package-price">
      Стоимость услуги - {{ price }}
    </div>
    <TLBtn
      text="Купить"
      class="tl-package-services-item__btn"
      @click="buy"
    />
  </div>
</template>

<style lang="scss">
.tl-package-services-item {
  max-width: 520px;
  width: 100%;
  padding: 30px 30px 20px 30px;
  border: 1px solid #CACACA;
  border-radius: 10px;
  display: flex;
  flex-direction: column;

  @media (max-width: 1100px) {
    max-width: 600px;
  }

  &__title {
    font-family: 'GothamPro-bold', sans-serif;
    font-size: 26px;
    line-height: 140%;
    text-align: center;
    color: #000000;
    margin-bottom: 18px;
    min-height: 72px;
  }

  &__package-box {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #CACACA;
    padding-bottom: 15px;
    margin-bottom: 15px;
  }

  &__package {
    font-family: 'GothamPro-Medium', sans-serif;
    font-size: 14px;
    line-height: 18px;
    color: #151112;
    min-height: 36px;

    @media (max-width: 768px) {
      font-size: 13px;
    }
  }

  &__package-counter {
    font-family: 'GothamPro-Medium', sans-serif;
    font-size: 20px;
    line-height: 18px;
    color: #9F2016;
  }

  &__package-term, &__package-price {
    font-family: 'GothamPro-Medium', sans-serif;
    font-size: 14px;
    line-height: 18px;
    color: #9A1E2D;
    margin-bottom: 5px;

    @media (max-width: 768px) {
      font-size: 13px;
    }
  }

  &__package-price {
    margin-bottom: 20px;
  }

  &__btn {
    margin: auto auto 0;
    width: 170px;
  }
}
</style>
