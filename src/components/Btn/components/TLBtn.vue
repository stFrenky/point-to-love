<script setup lang="ts">
interface Props {
  text: string | number | undefined;
  // price: number | undefined;
  formBtn?: boolean;
  formBtnReg?: boolean;
  cancel?: boolean;
  formBtnSend?: boolean;
  certificateBtnPayment?: boolean;
  image?: boolean;
  doctorRec?: boolean;
  isActive?: boolean;
  disabled?: boolean;
}

defineProps<Props>();
</script>
<template>
  <button
    class="tl-btn"
    :class="{logIn: formBtn, reg: formBtnReg, sendCode: formBtnSend, certificateBtnPayment: certificateBtnPayment, doctorRec: doctorRec, cancel: cancel}"
    type="button"
    :disabled="disabled"
  >
    <p
      class="tl-btn__text"
      :class="{doctorRec: doctorRec}"
    >
      {{ text }}
    </p>

    <img
      v-if="image"
      src="@/assets/icons/edit.svg"
      alt="edit"
    >
  </button>
</template>

<style lang="scss">
  .tl-btn {
    display: flex;
    padding: 16px 22px;
    border-radius: 40px;
    background-color: $main;
    color: white;
    max-width: 210px;
    border: none;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    cursor: pointer;
    width: 100%;
    font-family: 'GothamPro-bold',sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 14px;
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    img {
      margin-left: 20px;

      @media (max-width: 768px) {
        margin-left: 0;
      }
    }

    &__text.doctorRec {
      @media (max-width: 768px) {
        display: none;
      }
    }
  }

  .tl-btn.logIn {
    max-width: 270px;

    @media (max-width: 425px) {
        max-width: 100%;
    }
  }
  .tl-btn.sendCode {
    max-width: 270px;
    margin: 0 auto;

    @media (max-width: 425px) {
      max-width: 100%;
    }
  }

  .tl-btn.reg {
    max-width: 270px;
    color: $main;
    background-color: white;
    border: 2px solid $main;

    @media (max-width: 425px) {
      max-width: 100%;
    }
  }
  .tl-btn.cancel {
    color: $main;
    background-color: white;
    border: 2px solid $main;
  }
  .tl-btn.doctorRec {
    height: 52px;

    @media (max-width: 768px) {
      width: 52px;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .tl-btn.certificateBtnPayment {
    background: #9F2016;
    border-radius: 4px;
    width: 100%;
    max-width: 100%;
    font-size: 15px;
    line-height: 150%;
  }
</style>
