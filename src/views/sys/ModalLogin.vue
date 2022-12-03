<template>
  <Modal
    v-bind="$attrs"
    v-model:visible="visible"
    title="Hi stranger!"
    centered
    :cancel-button-props="{ hidden: 'hidden' }"
    :ok-button-props="{ hidden: 'hidden' }"
  >
    <Tabs v-model:active-key="activeTab">
      <TabPane key="1" tab="Login">
        <LoginForm @go-register="setActiveTab('2')" />
      </TabPane>
      <TabPane key="2" tab="Register"> <RegisterForm /></TabPane>
    </Tabs>
  </Modal>
</template>
<script lang="ts" setup>
  import { Modal, TabPane, Tabs } from 'ant-design-vue';
  import { ref } from 'vue';

  import LoginForm from './LoginForm.vue';
  import RegisterForm from './RegisterForm.vue';

  const visible = ref<boolean>(false);
  const activeTab = ref<string>('1');

  const setVisible = (isVisible = false) => {
    visible.value = isVisible;
  };
  const setActiveTab = (tab: string) => {
    activeTab.value = tab;
  };

  defineExpose({ setVisible });
</script>
