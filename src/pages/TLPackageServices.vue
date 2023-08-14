<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { usePackageStore } from '@/stores/package';

const packageStore = usePackageStore();

const { selectedPackage, showOrderDialog } = storeToRefs(packageStore);
</script>

<template>
  <div class="tl-package-services">
    <TLPackageServicesInfo />
    <OrderDialog
      v-model="showOrderDialog"
      :title="selectedPackage?.title"
      :price="selectedPackage?.price"
      :alias="selectedPackage?.alias"
    />
  </div>
</template>

<style lang="scss">
.tl-package-services {
  position: relative;
}
</style>
