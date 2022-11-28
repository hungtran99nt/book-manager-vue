import type { ColumnsType } from 'ant-design-vue/lib/table';
import type { DefaultRecordType } from 'ant-design-vue/lib/vc-table/interface';

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
  },
  {
    title: 'Total page',
    dataIndex: 'totalPage',
    key: 'totalPage',
  },
];
