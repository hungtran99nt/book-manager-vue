<template>
  <PageHeader :title="'Create a new book'" />

  <BookForm ref="formBookRef" />

  <PageFooter>
    <template #right>
      <Space>
        <Button type="primary" block @click="handleSubmit" :loading="loading">SAVE</Button>
        <Button block @click="goListBook">BAKC TO LIST</Button>
      </Space>
    </template>
  </PageFooter>
</template>
<script lang="ts" setup>
  import { Button, message, PageHeader, Space } from 'ant-design-vue';

  import BookForm from './BookForm.vue';
  import PageFooter from '../components/PageFooter.vue';
  import { ref, unref } from 'vue';
  import { useRedirectBook } from '@/hooks/common/useRedirectBook';
  import { HTTPS } from '@/utils/http/Axios';

  defineEmits([]);

  const formBookRef = ref();
  const loading = ref<boolean>(false);

  const { goListBook } = useRedirectBook();

  const handleSubmit = async () => {
    try {
      loading.value = true;
      const form = await unref(formBookRef).validate();
      console.log(form);
      const { data } = await HTTPS.post('/books/create', form);
      console.log(data, 'data');
      message.success('Create successful!');
      goListBook();
    } catch (error) {
      // eslint-disable-next-line
      message.error((error as unknown as any).response.data?.message || (error as unknown as any).response.data?.error);
    } finally {
      loading.value = false;
    }
  };

  defineExpose({});
</script>
