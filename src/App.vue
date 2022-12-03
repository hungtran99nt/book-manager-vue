<script setup lang="ts">
  import { RouterView } from 'vue-router';

  import { Layout, DropdownButton, Menu, MenuItem } from 'ant-design-vue';
  import { UserOutlined, LogoutOutlined, LoginOutlined } from '@ant-design/icons-vue';
</script>

<template>
  <Layout>
    <Layout.Header>
      <DropdownButton type="primary">
        Hello
        <template #overlay>
          <Menu @click="() => {}">
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
    </Layout.Header>
    <Layout.Content>
      <RouterView />
    </Layout.Content>
  </Layout>
</template>
