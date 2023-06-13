<template>
  <div class="header">
    <div class="header-main container">
      <div class="logo">
        <img src="@/assets/logo.svg">
        <span>向死而生</span>
      </div>

      <div class="tool-box">
        <button class="tooggle-theme" @click="handleToggleTheme">
          <i :class="['iconfont', reactiveTheme === 'default' ? 'icon-sun-f' : 'icon-moon']" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useTheme } from '@/composables/theme';

  const theme = useTheme();

  const reactiveTheme = theme.theme;

  const handleToggleTheme = () => {
    theme.toogleTheme();
  }
</script>

<style lang="less" scoped>
  .header {
    height: 60px;
    background: @module-bg-1;
    border-bottom: 1px solid @header-border;

    .container {
      width: 1200px;
      margin: 0 auto;
    }

    &-main {
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .logo {
        height: 24px;

        img {
          width: 180px;
          height: auto;
          object-fit: contain;
          vertical-align: text-bottom;
          filter: @theme-logo-rotate;
        }

        span {
          margin-left: 32px;
          color: @primary-color;
          font-family: web-font;
          font-size: 16px;
        }
      }

      .tooggle-theme {
        .iconfont {
          opacity: .5;
          font-size: 18px;
          font-weight: bold;

          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
</style>
