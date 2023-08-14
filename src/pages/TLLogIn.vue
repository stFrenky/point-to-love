<script setup lang="ts">
import { onMounted } from 'vue';
import { TLHeader } from '@/components/Header';
import { TLAuth } from '@/components/Auth';
import router from '@/app/router';

onMounted(() => {
  if (localStorage.getItem('token')) {
    router.push('/');
  }
});
</script>

<template>
  <TLAuth />
</template>

<style lang="scss">
.test {
  display: flex;
  flex-direction: column;
  gap: 20px 0;
}
</style>
