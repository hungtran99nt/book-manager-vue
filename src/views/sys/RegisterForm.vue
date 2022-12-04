<template>
  <Form class="p-2" ref="formRef" :model="formModel" :rules="formRules" :layout="'vertical'">
    <Row :gutter="24">
      <Col :span="12">
        <Form.Item name="firstName" required label="First name">
          <Input
            v-model:value="formModel.firstName"
            size="large"
            :placeholder="'Enter first name'"
            class="fix-auto-fill"
          />
        </Form.Item>
      </Col>
      <Col :span="12">
        <Form.Item name="lastName" required label="Last name">
          <Input
            v-model:value="formModel.lastName"
            size="large"
            :placeholder="'Enter last name'"
            autocomplete="off"
          />
        </Form.Item>
      </Col>
    </Row>
    <Row :gutter="24">
      <Col :span="12">
        <Form.Item name="gender" label="Gender">
          <Select
            v-model:value="formModel.gender"
            :options="genderOptions"
            :placeholder="'Choose gender'"
          />
        </Form.Item>
      </Col>
      <Col :span="12">
        <Form.Item name="dob" label="Birthday">
          <DatePicker
            v-model:value="formModel.dob"
            :placeholder="'Pick date of birth'"
            :format="'DD/MM/YYYY'"
          />
        </Form.Item>
      </Col>
    </Row>
    <Form.Item name="username" required label="Username">
      <Input
        v-model:value="formModel.username"
        size="large"
        :placeholder="'Enter username'"
        class="fix-auto-fill"
      />
    </Form.Item>
    <Row :gutter="24">
      <Col :span="12">
        <Form.Item name="password">
          <Input.Password
            v-model:value="formModel.password"
            size="large"
            visibilityToggle
            :placeholder="'Enter password'"
            autocomplete="off"
          />
        </Form.Item>
      </Col>
      <Col :span="12">
        <Form.Item name="confirmPassword">
          <Input.Password
            v-model:value="formModel.confirmPassword"
            size="large"
            visibilityToggle
            :placeholder="'Confirm password'"
            autocomplete="off"
          />
        </Form.Item>
      </Col>
    </Row>
    <Row>
      <Button block type="primary" @click="handleRegister" :loading="loading"> Register </Button>
    </Row>
  </Form>
</template>
<script lang="ts" setup>
  import { computed, reactive, ref } from 'vue';
  import { Button, Col, Form, Input, Row, Select, DatePicker, message } from 'ant-design-vue';
  import type { Rule } from 'ant-design-vue/lib/form';

  import { genderOptions } from '@/const/options';
  import type { IRegisterUser } from '@/api/auth';
  import {
    createRule,
    validateConfirmPassword,
    useFormValid,
    validatePassword,
  } from '../../hooks/common/useForm';
  import { HTTP } from '@/utils/http/Axios';
  import { cloneDeep } from 'lodash';

  const emit = defineEmits(['register-success']);

  const formModel: IRegisterUser = reactive({
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    type: 'Admin',
  });
  const formRef = ref();
  const loading = ref<boolean>(false);

  const formRules = computed<{ [K in keyof IRegisterUser]: Rule | Rule[] }>(() => ({
    username: createRule('Username is required'),
    password: [
      ...createRule('Password is required'),
      { validator: validatePassword(formRef, formModel.confirmPassword), trigger: 'change' },
    ],
    firstName: createRule('First name is required'),
    lastName: createRule('Last name is required'),
    confirmPassword: [
      { validator: validateConfirmPassword(formModel.password), trigger: 'change' },
    ],
  }));

  const { validForm } = useFormValid<IRegisterUser>(formRef);

  const handleRegister = async () => {
    try {
      loading.value = true;
      const form = await validForm();
      if (!form) return;
      await HTTP.post('/signup', form);
      message.success('Registration success, please login to enjoy!');
      emit('register-success', cloneDeep(form));
    } catch (error) {
      // eslint-disable-next-line
      message.error((error as unknown as any).response.data.message);
    } finally {
      loading.value = false;
    }
  };
</script>
