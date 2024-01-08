<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
        <div v-for="item in message_list">
          <div style="text-align: right">{{ item.send }}:{{ item.info }}</div>
        </div>
      </a-layout-content>
      <a-input placeholder="请输入要聊天的人" v-model:value="receivePeople"/>
      <a-textarea placeholder="请输入内容" v-model:value="inputMsg" :rows="4"/>
      <a-button type="primary" @click="sendMessage">发送消息</a-button>
    </a-layout>
  </a-layout>
</template>
<script>
import websock from "vue-websocket";
import store from '@/store'

export default {
  data() {
    return {
      flag: false,
      message_list: [],
      receivePeople: '',
      inputMsg: '',
      websock: websock,
      store: store,
      userid: '',
    }
  },
  created() {
    this.initWebSocket();
    // 加载用户信息
    this.userid = store.getters.userInfo.username

  },
  destroyed() {
    this.websock.close() //离开路由之后断开websocket连接
  },
  methods: {
    sendMessage() {
      let that = this;
      let username = store.getters.userInfo.username
      let id = store.getters.userInfo.id
      let send = {
        send: username,
        receive: that.receivePeople,
        info: that.inputMsg,
        type: 3,
        id: id,
      }
      that.message_list.push(send)
      that.websock.send(JSON.stringify(send))
    },
    initWebSocket() { //初始化weosocket
      this.websock = new WebSocket("ws://localhost:5678/chat");
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen() { //连接建立之后暂时先不发生东西
      let that = this
      let username = store.getters.userInfo.username
      let id = store.getters.userInfo.id
      let send = {
        send: username,
        receive: username,
        info: "我上线了！",
        type: 1,
        id: id,
      }
      that.websocketsend(JSON.stringify(send))
    },
    websocketonerror() {//连接建立失败重连
      this.initWebSocket();
    },
    websocketonmessage(e) { //数据接收
      let redata = JSON.parse(e.data);
      this.message_list.push(redata)
    },
    websocketsend(Data) {//数据发送
      this.websock.send(Data);
    },
    websocketclose(e) {  //关闭
      console.log('断开连接', e);
    },
  },
}
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color .3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, .2);
  margin: 16px;
}
</style>
