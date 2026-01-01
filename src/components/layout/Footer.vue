<!--
 * @Author: Rowe inetech@zohomail.com
 * @Date: 2025-12-25 00:13:46
 * @LastEditors: Rowe inetech@zohomail.com
 * @LastEditTime: 2026-01-02 00:49:51
 * @FilePath: \MiSub\src\components\layout\Footer.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import { computed } from 'vue';

const currentYear = computed(() => new Date().getFullYear());
</script>

<template>
  <footer class="w-full text-center p-8 border-t border-gray-200 dark:border-white/10 mt-8">
    <p class="text-xs text-gray-500 dark:text-gray-400">
      Copyright © {{ currentYear }}
      <span class="font-semibold text-indigo-600 dark:text-indigo-400">
        MiSUB
      </span>.
      All Rights Reserved.
    </p>
  </footer>
</template>