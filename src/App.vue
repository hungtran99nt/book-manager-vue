<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import { Layout, DropdownButton, Menu, MenuItem } from 'ant-design-vue';
  import { UserOutlined, LogoutOutlined, LoginOutlined } from '@ant-design/icons-vue';
  import ModalLogin from './views/sys/ModalLogin.vue';
  import { ref } from 'vue';
  import type { MenuInfo } from 'ant-design-vue/lib/menu/src/interface';

  const modalRef = ref();

  const handleClick = (menu: MenuInfo) => {
    if (menu.key === '2') setVisible(true);
  };

  const setVisible = (val: boolean) => {
    modalRef.value.setVisible(val);
  };
</script>

<template>
  <Layout>
    <Layout.Header>
      <DropdownButton type="primary">
        Hello
        <template #overlay>
          <Menu @click="handleClick">
            <MenuItem key="1">
              <LogoutOutlined />
              Log out
            </MenuItem>
            <MenuItem key="2">
              <LoginOutlined />
              Log in
            </MenuItem>
          </Menu>
        </template>
        <template #icon><UserOutlined /></template>
      </DropdownButton>
      <ModalLogin ref="modalRef" />
    </Layout.Header>
    <Layout.Content>
      <RouterView />
    </Layout.Content>
  </Layout>
</template>
