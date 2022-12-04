<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import { Layout, DropdownButton, Menu, MenuItem, Modal } from 'ant-design-vue';
  import {
    UserOutlined,
    LogoutOutlined,
    LoginOutlined,
    UserAddOutlined,
    ExclamationCircleOutlined,
  } from '@ant-design/icons-vue';
  import type { MenuInfo } from 'ant-design-vue/lib/menu/src/interface';

  import ModalLogin from './views/sys/ModalLogin.vue';
  import { computed, createVNode, ref } from 'vue';
  import { useUserStore } from './stores/user';
  import { LOGIN_STATE } from './const/const';
  import type { ILoginState } from './const/type';
  import { useRedirectBook } from './hooks/common/useRedirectBook';

  const modalRef = ref();

  const userStore = useUserStore();
  const { goListBook } = useRedirectBook();

  const buttonTitle = computed<string>(() => {
    if (userStore.isAuthorized)
      return `${userStore.getUserInfo.type}: ${userStore.getUserInfo.firstName} ${userStore.getUserInfo.lastName}`;
    return 'Nobody';
  });

  const handleMenuClick = (menu: MenuInfo) => {
    const menuUser = menu as Omit<MenuInfo, 'key'> & { key: ILoginState };
    if (menuUser.key === LOGIN_STATE.LOGIN) showModalLogin(true);
    if (menuUser.key === LOGIN_STATE.REGISTER) showModalLogin(true, LOGIN_STATE.REGISTER);
    if (menuUser.key === LOGIN_STATE.LOGOUT) showLogoutConfirm();
  };

  const showModalLogin = (isVisible: boolean, state?: ILoginState) => {
    modalRef.value.setVisible(isVisible, state);
  };

  const showLogoutConfirm = () => {
    Modal.confirm({
      title: 'Confirm to logout?',
      icon: createVNode(ExclamationCircleOutlined),
      content: 'We are gonna miss u 🥺',
      onOk() {
        userStore.logout();
        goListBook();
      },
      okText: 'See ya!',
      cancelText: 'if you insist',
      width: 300,
    });
  };
</script>

<template>
  <Layout>
    <Layout.Header>
      <DropdownButton type="primary">
        {{ buttonTitle }}
        <template #overlay>
          <Menu @click="handleMenuClick">
            <MenuItem v-if="userStore.isAuthorized" :key="LOGIN_STATE.LOGOUT">
              <LogoutOutlined />
              Log out
            </MenuItem>
            <MenuItem v-if="!userStore.isAuthorized" :key="LOGIN_STATE.LOGIN">
              <LoginOutlined />
              Log in
            </MenuItem>
            <MenuItem v-if="!userStore.isAuthorized" :key="LOGIN_STATE.REGISTER">
              <UserAddOutlined />
              Register
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
