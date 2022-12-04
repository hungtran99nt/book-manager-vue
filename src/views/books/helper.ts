import type { IBook } from '@/api/book';
import { createRule } from '@/hooks/common/useForm';
import type { Rule } from 'ant-design-vue/lib/form';

export const formRules: { [K in keyof IBook]: Rule | Rule[] } = {
  title: createRule('Title is required'),
  author: createRule('Author is required'),
  publishOn: createRule('Published date is required'),
};
