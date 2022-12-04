<template>
  <Form
    ref="formRef"
    :layout="'vertical'"
    :model="formModel"
    :rules="formRules"
    style="background-color: #ececec; padding: 20px"
  >
    <Row :gutter="24">
      <Col :span="12">
        <Card>
          <template #title>
            <span style="font-weight: bold">Book info</span>
          </template>
          <Row :gutter="24">
            <Col :span="12">
              <Form.Item name="title" label="Title">
                <Input
                  :disabled="isViewMode"
                  v-model:value="formModel.title"
                  size="large"
                  :placeholder="'Enter title'"
                  :maxlength="100"
                />
              </Form.Item>
            </Col>
            <Col :span="12">
              <Form.Item name="author" label="Author">
                <Input
                  :disabled="isViewMode"
                  v-model:value="formModel.author"
                  size="large"
                  :placeholder="'Enter author'"
                  :maxlength="50"
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="description" label="Description">
            <Input.TextArea
              :disabled="isViewMode"
              v-model:value="formModel.description"
              size="large"
              :placeholder="'Enter description'"
              :maxlength="500"
            />
          </Form.Item>
          <Row :gutter="24">
            <Col :span="12">
              <Form.Item name="publishOn" label="Published date">
                <DatePicker
                  :disabled="isViewMode"
                  class="w-full"
                  v-model:value="formModel.publishOn"
                  :placeholder="'Pick published date'"
                  :format="'DD/MM/YYYY'"
                />
              </Form.Item>
            </Col>
            <Col :span="12">
              <Form.Item name="totalPage" label="Total pages">
                <InputNumber
                  :disabled="isViewMode"
                  class="w-full"
                  v-model:value="formModel.totalPage"
                  size="large"
                  :placeholder="'Enter total pages'"
                  :max="10000"
                  :min="0"
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="category" label="Category">
            <Select
              :disabled="isViewMode"
              v-model:value="formModel.category"
              :options="categoryOptions"
              :placeholder="'Choose gender'"
            />
          </Form.Item>
        </Card>
      </Col>
      <Col :span="12" style="width: 300px">
        <Card>
          <template #title>
            <span style="font-weight: bold">Cover image</span>
          </template>
          <Input
            :disabled="isViewMode"
            type="file"
            size="large"
            class="mb-2"
            @change="handleChangeImage"
          />
          <Image
            :src="
              fileSrc ||
              'data:image/png;base64,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'
            "
            class="w-25"
          />
        </Card>
      </Col>
    </Row>
  </Form>
</template>
<script lang="ts" setup>
  import type { IBook } from '@/api/book';
  import { API_ENDPOINT, API_NAMESPACE, BASE_API, FILE_API } from '@/const/const';
  import { categoryOptions } from '@/const/options';
  import { FormMode } from '@/const/type';
  import {
    Card,
    Col,
    DatePicker,
    Form,
    Image,
    Input,
    InputNumber,
    Row,
    Select,
  } from 'ant-design-vue';
  import { computed, reactive, ref, type PropType } from 'vue';
  import { formRules } from './helper';
  import { useForm } from './useForm';

  const props = defineProps({
    mode: {
      type: Number as PropType<FormMode>,
      default: FormMode.CREATE,
    },
  });

  defineEmits([]);

  const formModel = reactive<Record<string, any>>({});
  const formRef = ref();

  const fileData = ref();
  const fileSrc = ref();
  const isViewMode = computed(() => props.mode === FormMode.VIEW);

  const { validate, setFieldValue, handleChangeImage } = useForm<IBook>(
    formRef,
    formModel,
    fileSrc,
    fileData,
  );

  const getFileData = () => {
    const data = new FormData();
    if (fileData.value) data.append('file', fileData.value);
    else return null;
    return data;
  };

  const handleDownloadFile = (path: string) => {
    fileSrc.value = `${BASE_API + API_NAMESPACE + FILE_API + API_ENDPOINT.DOWNLOAD}/${path}`;
  };

  defineExpose({ validate, setFieldValue, getFileData, handleDownloadFile });
</script>
