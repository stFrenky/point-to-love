<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { usePackageStore } from '@/stores/package';

const packageStore = usePackageStore();
const { getPackage, updatePackage } = packageStore;
const { packages, selectedPackage } = storeToRefs(packageStore);
onMounted(async () => {
  await getPackage();
});
</script>

<template>
  <div class="tl-package-services-info">
    <div class="tl-package-services-info__container">
      <TLTitleBg
        text="Пакетные услуги"
      />

      <div class="tl-package-services-list">
        <TLPackageServicesItem
          v-for="(packageItem, index) in packages"
          :key="index"
          :selected-package="selectedPackage"
          :title="packageItem.verbose_name"
          :alias="packageItem.alias"
          :price="packageItem.price"
          :term="packageItem.period.value"
          :type="packageItem.period.type"
          :package="packageItem.services[0]?.verbose_name"
          :counter="packageItem.services[0]?.quantity"
          @update:selected-package="updatePackage"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.tl-package-services-info {
  padding-top: 45px;

  &__container {
    box-sizing: border-box;
    max-width: 1100px;
    padding: 0 20px 42px 20px;
    margin: 0 auto;
  }
}
.tl-package-services-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
</style>
