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
  import type { IFile } from '@/api/common';
  import type { IBook } from '@/api/book';

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
      const file = await handleUploadFile();
      const { data } = await HTTPS.post<IBook>('/books/create', {
        ...form,
        imagePath: file?.fileName,
      });
      console.log(data, 'data');
      message.success('Create successful!');
      goListBook();
    } catch (error) {
      handleError(error);
    } finally {
      loading.value = false;
    }
  };

  const handleUploadFile = async (): Promise<IFile | null> => {
    const fileData = unref(formBookRef).getFileData();
    if (fileData) {
      const { data } = await HTTPS.post<IFile>('/file/upload', fileData);
      return data;
    }
    return null;
  };
</script>
