<template>
  <PageHeader :title="'Create a new book'" />

  <BookForm ref="formBookRef" />

  <PageFooter>
    <template #right>
      <Space>
        <Button type="primary" block @click="handleSubmit" :loading="loading">SAVE</Button>
        <Button block @click="goListBook">BACK TO LIST</Button>
      </Space>
    </template>
  </PageFooter>
</template>
<script lang="ts" setup>
  import { ref, unref } from 'vue';
  import { Button, message, PageHeader, Space } from 'ant-design-vue';
  import { useRedirectBook } from '@/hooks/common/useRedirectBook';
  import { HTTPS } from '@/utils/http/Axios';
  import { handleError } from '@/hooks/common/useForm';

  import PageFooter from '../components/PageFooter.vue';
  import BookForm from './BookForm.vue';

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
      handleError(error);
    } finally {
      loading.value = false;
    }
  };

  defineExpose({});
</script>
