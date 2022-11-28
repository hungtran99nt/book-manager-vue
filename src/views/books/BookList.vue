<template>
  <Layout>
    <Layout.Header>Header</Layout.Header>
    <Layout.Content>
      <Table :columns="columns" :data-source="dataSource" :bordered="true" />
    </Layout.Content>
    <Layout.Footer>
      <Space>
        <Button @click="getListBook">Get list of books</Button>
        <Button @click="goCreateBook">Create book</Button>
      </Space>
    </Layout.Footer>
  </Layout>
</template>
<script lang="ts" setup>
  import { Button, Table, Layout, Space } from 'ant-design-vue';
  import axios from 'axios';
  import { useRedirectBook } from '@/hooks/common/useRedirectBook';
  import { onMounted, ref } from 'vue';
  import { columns } from './data';

  const { goCreateBook } = useRedirectBook();

  const dataSource = ref([]);

  async function getListBook() {
    const res = await axios.get('http://localhost:8080/api/v1/books?page=0&pageSize=5');
    dataSource.value = res.data.content;
    console.log(res);
  }

  onMounted(() => {});
</script>
