import type { FormExpose } from 'ant-design-vue/lib/form/Form';
import { unref, type Ref } from 'vue';

export const useForm = <T>(
  formRef: Ref<FormExpose>,
  formModel: Record<string, any>,
  fileRef: Ref,
  fileDataRef: Ref,
) => {
  const validate = async () => {
    console.log('validate');
    const form = unref(formRef);
    if (!form) return;
    const data = await form.validate();
    return data as T;
  };

  const setFieldValue = (data: Partial<T>) => {
    Object.assign(formModel, data);
  };

  const resetFields = () => {
    unref(formRef).resetFields();
  };

  const handleChangeImage = (e: any) => {
    console.log(e);
    const fileData = e.target.files[0];
    fileDataRef.value = fileData;
    const theReader = new FileReader();
    theReader.onloadend = () => {
      fileRef.value = theReader.result;
    };
    theReader.readAsDataURL(fileData);
  };

  return { validate, setFieldValue, resetFields, handleChangeImage };
};
