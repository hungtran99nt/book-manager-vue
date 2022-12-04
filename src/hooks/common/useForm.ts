import { message } from 'ant-design-vue';
import type { Rule, RuleObject } from 'ant-design-vue/lib/form';
import { unref, type VNodeRef } from 'vue';

export const createRule = (message: string): Rule[] => {
  return [
    {
      required: true,
      message,
      trigger: 'change',
    },
  ];
};

export const validateConfirmPassword = (password: string) => {
  return async (_: RuleObject, value: string) => {
    if (!value) {
      return Promise.reject('Enter confirm password');
    }
    if (value !== password) {
      return Promise.reject('Confirm password not match');
    }
    return Promise.resolve();
  };
};

export const validatePassword = (formRef: VNodeRef, confirmPassword: string) => {
  return async (_: RuleObject) => {
    if (confirmPassword !== '') {
      unref(formRef).validateFields('confirmPassword');
    }
    return Promise.resolve();
  };
};

export function useFormValid<T extends Object>(formRef: VNodeRef) {
  async function validForm() {
    const form = unref(formRef);
    if (!form) return;
    const data = await form.validate();
    return data as T;
  }

  return { validForm };
}

export const handleError = (error: any) => {
  message.error(
    (error as unknown as any).response.data?.message ||
      (error as unknown as any).response.data?.error,
  );
};
