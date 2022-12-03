<template>
  <Table
    class="p-3"
    :loading="loading"
    :columns="columns"
    :data-source="dataSource?.content"
    bordered
    :pagination="pagination"
    :scroll="{ x: 900, y: 364 }"
    @change="handleTableChange"
  >
    <template #title>
      <Row justify="space-between">
        <Col>
          <span>Title</span>
        </Col>
        <Col>
          <Button @click="goCreateBook">Add</Button>
        </Col>
      </Row>
    </template>
    <template #bodyCell="{ column }">
      <template v-if="column.key === 'action'">
        <span>
          <Space>
            <Button>View</Button>
            <Button>Edit</Button>
          </Space>
        </span>
      </template>
    </template>
  </Table>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { usePagination } from 'vue-request';
  import {
    Button,
    Table,
    Space,
    Row,
    Col,
    type PaginationProps,
    type TableProps,
  } from 'ant-design-vue';

  import { HTTP } from '@/utils/http/Axios';
  import type { IBook } from '@/api/book';
  import type { IPaging } from '@/api/common';
  import type { ISearchListParams } from '@/api/common';
  import { useRedirectBook } from '@/hooks/common/useRedirectBook';

  import { columns } from './data';

  const { goCreateBook } = useRedirectBook();

  interface IRes extends IPaging {
    content: IBook[];
  }

  const handleGetList = ({ page, pageSize }: ISearchListParams) => {
    return HTTP.get<IRes>('/api/v1/books', {
      params: {
        page: page ? page - 1 : page,
        pageSize: pageSize,
      },
    });
  };

  const {
    data: dataSource,
    run,
    loading,
    total,
    current,
    pageSize,
  } = usePagination(handleGetList, {
    formatResult: (res) => res.data,
    pagination: {
      currentKey: 'page',
      pageSizeKey: 'pageSize',
      totalKey: 'totalElements',
      totalPageKey: 'totalPages',
    },
  });

  const pagination = computed<PaginationProps>(() => ({
    total: total.value,
    current: current.value,
    pageSize: pageSize.value,
    pageSizeOptions: [5, 10, 20],
    showSizeChanger: true,
    defaultPageSize: 5,
    showTotal: (total) => `Total: ${total}`,
    buildOptionText: (opt) => opt.value,
  }));

  const handleTableChange: TableProps['onChange'] = ({ pageSize, current }) => {
    run({
      page: current,
      pageSize: pageSize,
    });
  };
</script>
