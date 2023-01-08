import { createPinia } from 'pinia';
import { createApp } from 'vue';
import router from '@router';
import App from './App.vue';

async function useRouter(app: any) {
  app.use(router);
  await router.isReady();
  return app;
}

useRouter(createApp(App).use(createPinia())).then(app => {
  app.mount(document.getElementById('App'));
  // =================================================================
  console.log('该作品美术风格致敬兰空VOEZ');
  console.log('有兴趣的朋友请上雷亚或者龙渊官网搜索兰空VOEZ相关信息');
  console.log('手机上的TapTap平台上也有兰空（VOEZ）的游戏渠道');
  // console.log("个人建议购买典藏版（因为普通版的消费对我个人而言确实有些高）TapTap链接：https://www.taptap.com/app/7092");
  console.log('如果有建议或者我侵犯了您的权益可发送邮件至wangliamgcom@gmail.com或者联系QQ：954879629');
});
