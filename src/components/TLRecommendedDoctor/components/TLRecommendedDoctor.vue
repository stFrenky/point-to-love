<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const { deleteEmployees, getEmployees } = userStore;
const { profileInfoData } = storeToRefs(userStore);

const openDialog = ref(false);
const openChoseDocModal = () => {
  openDialog.value = true;
};
const deleteDoc = () => {
  deleteEmployees();
};

</script>

<template>
  <TLTitleBg
    text="Ваш приоритетный психолог"
    class="tl-recommended-doctor__title"
  />
  <div class="tl-recommended-doctor__item">
    <div v-if="profileInfoData.preferred_employee.full_name" class="tl-recommended-doctor__name-box">
      <div class="tl-recommended-doctor__name">
        {{ profileInfoData.preferred_employee.full_name }}
      </div>
      <div class="tl-recommended-doctor__specialization">
        Психолог
      </div>
    </div>
    <div v-else class="tl-recommended-doctor__name-box">
      <div class="tl-recommended-doctor__name">У вас пока нет приоритетного психолога</div>
    </div>
    <div class="btns">
      <div
        v-if="profileInfoData.preferred_employee.full_name"
        @click="deleteDoc"
        class="link"
      >
        Удалить
      </div>
      <TLBtn
        text="Изменить"
        image
        doctor-rec
        @click="openChoseDocModal"
      />
    </div>
  </div>
  <DocsDialog v-model="openDialog" />
</template>

<style lang="scss">
.tl-recommended-doctor {
  &__title {
    justify-content: flex-start;
    margin-top: 50px;
  }

  &__item {
    padding: 13px 25px;
    border: 1px solid #9A1E2D;
    border-radius: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .btns {
      display: flex;
      align-items: center;
      gap: 20px;
    }
  }

  &__name-box {
    display: flex;
    flex-direction: column;
    gap: 15px 0;
  }

  &__name {

    font-family: 'Gotham-bold', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 19px;
  }

  &__specialization {
    font-size: 18px;
    line-height: 17px;
  }
}
</style>
