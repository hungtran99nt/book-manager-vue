<template>
  <PageHeader :title="'A book'" />

  <BookForm ref="formBookRef" :mode="formMode" />

  <PageFooter>
    <template #right>
      <Space>
        <Button type="primary" v-if="isViewMode" block @click="handleEdit" :loading="loading">
          EDIT
        </Button>
        <Button type="primary" v-if="!isViewMode" block @click="handleSubmit" :loading="loading">
          SAVE
        </Button>
        <Button block @click="goListBook">BACK TO LIST</Button>
      </Space>
    </template>
  </PageFooter>
</template>
<script lang="ts" setup>
  import { Button, message, PageHeader, Space } from 'ant-design-vue';

  import BookForm from './BookForm.vue';
  import PageFooter from '../components/PageFooter.vue';
  import { computed, onMounted, ref, unref } from 'vue';
  import { useRedirectBook } from '@/hooks/common/useRedirectBook';
  import { HTTPS } from '@/utils/http/Axios';
  import { useRoute } from 'vue-router';
  import { FormMode } from '@/const/type';
  import type { IBook } from '@/api/book';
  import dayjs from 'dayjs';
  import { handleError } from '@/hooks/common/useForm';

  defineEmits([]);

  const formBookRef = ref();
  const loading = ref<boolean>(false);
  const formMode = ref<FormMode>(FormMode.VIEW);

  const isViewMode = computed(() => formMode.value === FormMode.VIEW);

  const { goListBook } = useRedirectBook();

  const { params } = useRoute() as unknown as { params: { id?: number } };

  const handleEdit = () => {
    formMode.value = FormMode.EDIT;
  };

  const handleSubmit = async () => {
    try {
      loading.value = true;
      const form = await unref(formBookRef).validate();
      console.log(form);
      const { data } = await HTTPS.put<IBook>('/books/edit', { ...form, id: params.id });
      console.log(data, 'data');
      message.success('Edit successful!');
      goListBook();
    } catch (error) {
      handleError(error);
    } finally {
      loading.value = false;
    }
  };

  onMounted(async () => {
    try {
      if (!params.id) throw new Error();

      loading.value = true;
      const { data } = await HTTPS.get<IBook>(`/books/${params.id}/detail`);
      console.log(data, 'data');
      unref(formBookRef).setFieldValue({ ...data, publishOn: dayjs(data.publishOn) });
    } catch (error) {
      handleError(error);
    } finally {
      loading.value = false;
    }
  });
</script>
