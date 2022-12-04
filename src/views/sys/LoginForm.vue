<template>
  <Form class="p-2" ref="formRef" :model="formModel" :rules="formRules">
    <Form.Item name="username">
      <Input
        v-model:value="formModel.username"
        size="large"
        :placeholder="'Enter username'"
        class="fix-auto-fill"
      />
    </Form.Item>
    <Form.Item name="password">
      <Input.Password
        v-model:value="formModel.password"
        size="large"
        visibilityToggle
        :placeholder="'Enter password'"
        autocomplete="off"
        @keyup.enter="handleLogin"
      />
    </Form.Item>

    <Form.Item>
      <Button type="primary" size="large" block @click="handleLogin"> Login </Button>
    </Form.Item>
    <Row>
      <Button block @click="goRegister"> Register </Button>
    </Row>
  </Form>
</template>
<script lang="ts" setup>
  import { useUserStore } from '@/stores/user';
  import { SmileOutlined } from '@ant-design/icons-vue';
  import { Button, Form, Input, notification, Row } from 'ant-design-vue';
  import type { Rule } from 'ant-design-vue/lib/form';
  import { computed, h, reactive, ref } from 'vue';
  import { createRule, useFormValid } from '../../hooks/common/useForm';

  import type { ILogin } from '@/api/auth';

  const emit = defineEmits(['go-register', 'login-success']);

  const loading = ref<boolean>(false);
  const formRef = ref();
  const formModel: ILogin = reactive({
    username: '',
    password: '',
  });

  const userStore = useUserStore();
  const { validForm } = useFormValid<ILogin>(formRef);

  const formRules = computed<{ [K in keyof ILogin]: Rule | Rule[] }>(() => ({
    username: createRule('Username is required'),
    password: createRule('Password is required'),
  }));

  const setFormLogin = (data: Partial<ILogin>) => {
    console.log(data, 'setFormLogin');

    Object.assign(formModel, data);
  };

  const handleLogin = async () => {
    try {
      loading.value;
      const form = await validForm();
      if (!form) return;
      await userStore.login(form);
      notification.open({
        message: 'Login success!',
        description: `Welcome, ${userStore.getUserInfo.firstName} ${userStore.getUserInfo.lastName}`,
        icon: () => h(SmileOutlined, { style: 'color: #108ee9' }),
      });
      emit('login-success');
    } finally {
      loading.value = false;
    }
  };

  const goRegister = () => {
    emit('go-register');
  };

  defineExpose({ setFormLogin });
</script>
