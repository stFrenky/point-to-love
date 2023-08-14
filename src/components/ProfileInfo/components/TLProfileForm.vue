<script setup lang="ts">
import {
  reactive, ref, unref, watch,
} from 'vue';
import { storeToRefs } from 'pinia';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import advancedFormat from 'dayjs/plugin/advancedFormat';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { FormInstance, FormRules } from 'element-plus';
import { useUserStore } from '@/stores/user';

dayjs.extend(advancedFormat);
const userStore = useUserStore();
const {
  editStatus, profileInfoData,
} = storeToRefs(userStore);
const { editProfileInfo, getProfileInfo, getEmployees } = userStore;
const formSize = ref('default');
const formattedDate = ref('');
const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  first_name: [
    { required: true, message: 'Обязательно к заполнению', trigger: 'blur' },
  ],
  last_name: [
    { required: true, message: 'Обязательно к заполнению', trigger: 'blur' },
  ],
  birth_datetime: [
    { required: true, message: 'Обязательно к заполнению', trigger: 'blur' },
  ],
});

const formatDate = (date: any) => {
  const formatted = dayjs(date).format('DD.MM.YYYY');
  formattedDate.value = formatted;
};
const convertToDate = () => {
  const date = dayjs(formattedDate.value, 'DD.MM.YYYY').format();
  profileInfoData.value.birth_datetime = date;
};
formatDate(profileInfoData.value.birth_datetime);
watch(formattedDate, convertToDate);
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  await formEl.validate((valid, fields) => {
    if (valid) {
      editProfileInfo(unref(profileInfoData));
    } else {
      console.log('error submit!', fields);
    }
  });
};

const cancelForm = () => {
  getProfileInfo();
  editStatus.value = true;
};
getEmployees();
</script>
<template>
  <div class="tl-profile-form">
    <el-form
      ref="ruleFormRef"
      :model="profileInfoData"
      :rules="rules"
      class="tl-profile-form__wrap"
      :size="formSize"
    >
      <div class="tl-profile-form__left">
        <el-form-item prop="first_name">
          <el-input
            v-model="profileInfoData.first_name"
            type="text"
            placeholder="Имя*"
            :disabled="editStatus"
            clearable
          />
        </el-form-item>
        <el-form-item prop="last_name">
          <el-input
            v-model="profileInfoData.last_name"
            type="text"
            placeholder="Фамилия*"
            :disabled="editStatus"
            clearable
          />
        </el-form-item>
        <el-form-item prop="email">
          <el-input
            v-model="profileInfoData.email"
            type="text"
            placeholder="Email"
            :disabled="editStatus"
            clearable
          />
        </el-form-item>
        <el-form-item prop="phone">
          <el-input
            v-model="profileInfoData.phone"
            v-mask="'+7##########'"
            type="tel"
            placeholder="+7 999 999 99 99"
            :disabled="editStatus"
            clearable
          />
        </el-form-item>
      </div>
      <div class="tl-profile-form__right">
        <el-form-item prop="country">
          <el-input
            v-model="profileInfoData.country"
            type="text"
            placeholder="Город"
            :disabled="editStatus"
            clearable
          />
        </el-form-item>
        <el-form-item prop="birth_datetime">
          <!-- <el-config-provider :locale="ru">
            <el-date-picker
              v-model="profileInfoData.birth_datetime"
              type="date"
              class="tl-input"
              placeholder="ДД.ММ.ГГГГ*"
              format="DD.MM.YYYY"
              :disabled="editStatus"
            />
          <el-date-picker
            v-model="profileInfoData.birth_datetime"
            type="date"
            class="tl-input"
            placeholder="ДД.ММ.ГГГГ*"
            format="DD.MM.YYYY"
            :disabled="editStatus"
          />
          </el-config-provider> -->
          <el-input
            v-model="formattedDate "
            type="dateBirthDate"
            v-mask="'##.##.####'"
            placeholder="ДД.ММ.ГГГГ"
            :disabled="editStatus"
          />
        </el-form-item>
        <div class="tl-profile-form__warning">
          <div class="tl-profile-form__warning-img-box">
            <img
              class="tl-profile-form__warning-img"
              src="@/assets/icons/warning.svg"
              alt="warning"
            >
          </div>
          <div class="tl-profile-form__warning-text">
            Если Вы не достигли возраста 16 лет, то необходимо скачать <a
              class="link"
              href="Информированное_согласие_родителя_ViPsy.pdf"
              target="_blank"
            > БЛАНК СОГЛАСИЯ</a>,
            который заполняется одним из родителей,
            и вместе с копией паспорта родителя перед началом сессии отправить его в чат психологу.
          </div>
        </div>
      </div>
    </el-form>
    <div class="tl-profile-form__btns">
      <!-- :disabled="!btnDisabled" -->
      <TLBtn
        :text="editStatus ? 'Редактировать' : 'Сохранить'"
        @click="editStatus ? editStatus = false : submitForm(ruleFormRef)"
      />
      <TLBtn
        v-if="!editStatus"
        text="Отменить"
        form-btn-reg="true"
        @click="cancelForm()"
      />
    </div>
  </div>
</template>

<style lang="scss">
.tl-profile-form {
  display: flex;
  flex-direction: column;
  gap: 50px 0;
  .el-date-editor {
    height: 42px;
  }
  .el-input {
    &__wrapper {
      height: 42px;
    }
  }
  &__wrap {
    display: flex;
    gap: 0 33px;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }
  &__left {
    @media (max-width: 768px) {
      margin-bottom: 33px;
    }
  }
  &__left, &__right {
    display: flex;
    flex-direction: column;
    gap: 33px;
    width: 100%;
  }

  &__warning {
    display: flex;
    gap: 0 5px;
  }

  &__warning-text {
    font-size: 15px;
    line-height: 140%;

    span {
      text-transform: uppercase;
      text-decoration: underline;
      color: #9A1E2D;
    }
  }
  &__btns {
    display: flex;
    justify-content: center;
    gap: 16px;
    .tl-btn {
      margin-left: 0;
    }
  }
}
</style>
