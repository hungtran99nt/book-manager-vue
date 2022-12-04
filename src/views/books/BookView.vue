<template>
  <div>View</div>
  <h1>{{ params.id }}</h1>
</template>
<script lang="ts" setup>
  import { useRoute } from 'vue-router';

  defineProps({});

  defineEmits([]);

  const { params } = useRoute() as unknown as { params: { id: number } };

  defineExpose({});
</script>
