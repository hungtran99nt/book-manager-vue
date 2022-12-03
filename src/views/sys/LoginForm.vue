<template>
  <Form class="p-4" ref="formRef">
    <Form.Item name="account">
      <Input size="large" :placeholder="'Enter username'" class="fix-auto-fill" />
    </Form.Item>
    <Form.Item name="password">
      <Input.Password
        size="large"
        visibilityToggle
        :placeholder="'Enter password'"
        autocomplete="off"
      />
    </Form.Item>

    <Form.Item>
      <Button type="primary" size="large" block> Login </Button>
    </Form.Item>
    <Row>
      <Button block @click="goRegister"> Register </Button>
    </Row>
  </Form>
</template>
<script lang="ts" setup>
  import { Button, Form, Input, Row } from 'ant-design-vue';

  const emit = defineEmits(['go-register']);

  const goRegister = () => {
    emit('go-register');
  };
</script>
