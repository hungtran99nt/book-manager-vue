<template>
  <Modal
    v-bind="$attrs"
    v-model:visible="visible"
    title="Hi stranger!"
    centered
    :cancel-button-props="{ hidden: 'hidden' }"
    :ok-button-props="{ hidden: 'hidden' }"
    destroy-on-close
  >
    <Tabs v-model:active-key="currentState">
      <TabPane :key="LOGIN_STATE.LOGIN" tab="Login">
        <LoginForm
          ref="formLoginRef"
          @go-register="setActiveTab(LOGIN_STATE.REGISTER)"
          @login-success="handleLoginSuccess"
        />
      </TabPane>
      <TabPane :key="LOGIN_STATE.REGISTER" tab="Register">
        <RegisterForm @register-success="handleRegisterSuccess" />
      </TabPane>
    </Tabs>
  </Modal>
</template>
<script lang="ts" setup>
  import type { IRegisterUser } from '@/api/auth';
  import { LOGIN_STATE } from '@/const/const';
  import type { ILoginState } from '@/const/type';
  import { Modal, TabPane, Tabs } from 'ant-design-vue';
  import { ref } from 'vue';

  import LoginForm from './LoginForm.vue';
  import RegisterForm from './RegisterForm.vue';

  const formLoginRef = ref();
  const visible = ref<boolean>(false);
  const currentState = ref<ILoginState>(LOGIN_STATE.LOGIN);

  const setVisible = (isVisible: boolean, state = LOGIN_STATE.LOGIN) => {
    visible.value = isVisible;
    setActiveTab(state);
  };
  const setActiveTab = (state: ILoginState) => {
    currentState.value = state;
  };

  const handleLoginSuccess = () => {
    setVisible(false);
  };

  const handleRegisterSuccess = (data?: IRegisterUser) => {
    setActiveTab(LOGIN_STATE.LOGIN);
    console.log(data, 'handleRegisterSuccess');

    formLoginRef.value.setFormLogin(data);
  };

  defineExpose({ setVisible });
</script>
