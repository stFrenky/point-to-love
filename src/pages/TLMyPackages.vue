<script setup lang="ts">
import { storeToRefs } from 'pinia';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { TabsPaneContext } from 'element-plus';
import { ref, watch } from 'vue';
import { usePackageStore } from '@/stores/package';

const packageStore = usePackageStore();
const {
  myActivePackages,
  myInactivePackages,
} = storeToRefs(packageStore);
const { myPackage } = packageStore;

const activeName = ref('active');

myPackage('active');

watch(activeName, () => {
  if (activeName.value === 'active') {
    myPackage('active');
  } else {
    myPackage('inactive');
  }
});
</script>

<template>
  <div class="tl-my-packages">
    <div class="tl-my-packages-info">
      <div class="tl-my-packages-info__container">
        <TLTitleBg
          text="Мои пакеты"
        />
        <div
          class="tl-my-packages-info__btn-box"
        >
          <el-tabs
            v-model="activeName"
            type="card"
            class="demo-tabs"
          >
            <el-tab-pane
              label="Активные"
              name="active"
            >
              <div v-if="!myActivePackages.length" class="tl-my-packages-info__text">
                У Вас нет активных пакетов услуг. Для заказа услуги необходимо
                <a
                  href="/"
                  class="link"
                >
                  приобрести пакет.
                </a>
              </div>
              <div v-else class="tl-my-packages-info__item-list">
                <TLMyPackagesItem :datas="myActivePackages" />
              </div>
            </el-tab-pane>
            <el-tab-pane
              label="Завершенные"
              name="inactive"
            >
              <div v-if="!myInactivePackages.length" class="tl-my-packages-info__text">
                Здесь будут отображаться Ваши пакеты с истекшим сроком действия или без доступных услуг.
              </div>
              <div v-else class="tl-my-packages-info__item-list">
                <TLMyPackagesItem :datas="myInactivePackages" buy-again />
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.tl-my-packages-info {
  padding-top: 45px;
  .el-tabs {
    width: 100%;
    &__header {
      height: 46px;
      border-bottom: 0;
      margin-bottom: 45px;
      .el-tabs__nav {
        display: flex;
        gap: 30px;
        border: none;
        &-scroll {
          display: flex;
          justify-content: center;
        }
        @media (max-width: 768px) {
          flex-direction: column;
          gap: 16px;
        }
      }
      .el-tabs__item {
        width: 170px;
        height: 100%;
        display: flex;
        padding: 14px 22px;
        border-radius: 40px;
        justify-content: center;
        align-items: center;
        margin-left: auto;
        cursor: pointer;
        border: 2px solid $main !important;
        background: white;
        color: $main;
        font-family: 'GothamPro-bold',sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 15px;
        line-height: 14px;
        &.is-active {
          border: 2px solid $main;
          color: white;
          background-color: $main;
        }
      }
      @media (max-width: 768px) {
        height: inherit;
      }
    }
  }
  &__container {
    max-width: 1086px;
    margin: 0 auto;
    padding: 0 20px;
  }

  &__btn-box {
    display: flex;
    gap: 0 30px;
    margin: 0 auto 45px auto;
  }

  &__btn {
    width: 170px;
    height: 46px;
  }

  &__btn.active {
    color: #fff;
    background: #9A1E2D;
  }

  &__text {
    font-family: 'Gotham-bold', sans-serif;
    font-weight: 700;
    font-size: 24px;
    line-height: 140%;
    color: #000000;
  }

  &__item-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }
}
.tl-my-packages {
  width: 100%;
}
</style>
