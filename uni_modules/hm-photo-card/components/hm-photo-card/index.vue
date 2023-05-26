<template>
  <div class="hm-photo-card">
    <div class="box">
      <div class="titleClass">
        <text class="title">{{ options.title }}</text>
        <image class="titleImg" :src="options.titleImg" />
      </div>
      <div class="row">
        <image class="img" :src="options.img" />
        <image class="img1" :src="options.img1" />
        <image class="img2" :src="options.img2" />
      </div>
      <div class="second">
        <image class="img3" :src="options.img3" />
        <image class="img4" :src="options.img4" />
        <image class="img5" :src="options.img5" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HmPhotoCard',
  props: {
    dataId: {
      type: String,
      default: 'hm-photo-card'
    },
    options: {
      type: Object,
      default: function() {
        return {
          title: '我的 图片',
          titleImg:
            '/static/hm-photo-card/images/img_24027_0_0.png',
          img:
            '/static/hm-photo-card/images/img_24027_0_3.png',
          img1:
            '/static/hm-photo-card/images/img_24027_0_2.png',
          img2:
            '/static/hm-photo-card/images/img_24027_0_4.png',
          img3:
            '/static/hm-photo-card/images/img_24027_0_1.png',
          img4:
            '/static/hm-photo-card/images/img_24027_0_5.png',
          img5:
            '/static/hm-photo-card/images/img_24027_0_6.png'
        };
      }
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style>
@import './index.response.css';
</style>
