import dayjs from 'dayjs';
import type { ColumnsType } from 'ant-design-vue/lib/table';
import type { DefaultRecordType } from 'ant-design-vue/lib/vc-table/interface';

import type { IBook } from '@/api/book';

export const columns: ColumnsType<DefaultRecordType> = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Author',
    dataIndex: 'author',
    key: 'author',
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Published date',
    dataIndex: 'publishOn',
    key: 'publishOn',
    align: 'center',
    customCell: (data: IBook) => {
      const dateFormat = dayjs(data.publishOn).format('DD/MM/YYYY');
      return { innerHTML: dateFormat };
    },
  },
  {
    title: 'Total page',
    dataIndex: 'totalPage',
    key: 'totalPage',
    align: 'right',
  },
  {
    title: 'Actions',
    key: 'action',
    width: 160,
    fixed: 'right',
    align: 'center',
  },
];
