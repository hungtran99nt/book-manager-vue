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
          <span>This is a wholesome title</span>
        </Col>
        <Col>
          <Button
            v-if="userStore.isAuthorized"
            type="primary"
            @click="goCreateBook"
            :icon="createVNode(PlusCircleOutlined)"
          >
            Add book
          </Button>
        </Col>
      </Row>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <span>
          <Space>
            <Button
              v-if="userStore.isAuthorized"
              @click="() => handleView(record)"
              type="link"
              style="color: chartreuse"
              :icon="createVNode(EyeOutlined)"
            />
            <Popconfirm
              v-if="userStore.isAuthorized"
              placement="topRight"
              :on-confirm="() => handleDelete(record)"
            >
              <template #title>
                <p>Confirm delete</p>
              </template>
              <Button type="link" style="color: crimson" :icon="createVNode(DeleteOutlined)" />
            </Popconfirm>
          </Space>
        </span>
      </template>
    </template>
  </Table>
</template>
<script lang="ts" setup>
  import { computed, createVNode } from 'vue';
  import { usePagination } from 'vue-request';
  import {
    Button,
    Table,
    Space,
    Row,
    Col,
    type PaginationProps,
    type TableProps,
    message,
    Popconfirm,
  } from 'ant-design-vue';

  import { EyeOutlined, PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons-vue';

  import { HTTP, HTTPS } from '@/utils/http/Axios';
  import type { IBook } from '@/api/book';
  import type { IPaging } from '@/api/common';
  import type { ISearchListParams } from '@/api/common';
  import { useRedirectBook } from '@/hooks/common/useRedirectBook';

  import { columns } from './data';
  import { handleError } from '@/hooks/common/useForm';
  import { useUserStore } from '@/stores/user';

  interface IRes extends IPaging {
    content: IBook[];
  }

  const { goCreateBook, goViewBook } = useRedirectBook();
  const userStore = useUserStore();

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
    reload,
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

  const handleView = (record: IBook) => {
    goViewBook(record.id);
  };

  const handleDelete = async (record: IBook) => {
    try {
      loading.value = true;
      await HTTPS.delete(`/books/${record.id}/delete`);
      reload();
      message.success('Delete successful!');
    } catch (error) {
      handleError(error);
    } finally {
      loading.value = false;
    }
  };
</script>
