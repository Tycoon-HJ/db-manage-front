<template v-for="item in message_list">
  <div v-if="item.send===userid" style="text-align: right">{{ item.info }}</div>
  <div v-else style="text-align: left">{{ item.info }}</div>
</template>
