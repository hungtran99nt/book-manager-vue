<template>
  <div class="page_footer" :style="{ width: 100 }">
    <div class="page_footer__left">
      <slot name="left"></slot>
    </div>
    <slot></slot>
    <div class="page_footer__right">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<style lang="css">
  .page_footer {
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: 100;
    display: flex;
    width: 100%;
    align-items: center;
    padding: 0 24px;
    line-height: 44px;
    background-color: white;
    border-top: 1px solid white;
    box-shadow: 0 -6px 16px -8px rgb(0 0 0 / 8%), 0 -9px 28px 0 rgb(0 0 0 / 5%),
      0 -12px 48px 16px rgb(0 0 0 / 3%);
    transition: width 0.2s;
  }
  .page_footer .page_footer__left {
    flex: 1 1;
  }
</style>
