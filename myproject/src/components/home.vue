<template>
  <div>
    <p class="capP">今日精选<span class="capS" @click="changeRecomm()">试试手气</span></p>
    <ul v-for="(data,index) in recommendationData" :key='index'>
      <li v-for="(info,index) in data" :key='index'>{{info.name}}</li>
    </ul>
  </div>
</template>

<script>
import api from '../api/storage'
export default {
  name: 'Home',
  data () {
    return {
      msg: 'home',
      recommendationId: 10,
      recommendationData: {}
    }
  },
  methods: {
    changeRecomm() {
      this.recommendationId = api.getRandomNum(1, 28);
    }
  },
  watch: {
    recommendationId: {
      handler: function(val) {
        let _this = this;
        _this.$axios.get('/recommend', {
            params: {
                r: 'area/share',
                areaid: val
            }
        })
        .then(function(res) {
          _this.recommendationData = {};
          res.data.module_info.forEach((value) => {
            _this.recommendationData[value.skip_type] = [];
            let arr = [];
            value.module_data.forEach((v) => {
              arr.push({mark: v.mark, img: v.images});
            });
            let obj = {
              type: value.skip_type,
              name: value.name,
              data: arr
            };
            _this.recommendationData[value.skip_type].push(obj);
          });
          if (JSON.stringify(_this.recommendationData) === '{}') {
            _this.changeRecomm();
          }
        })
        .catch(function(err) {
            console.log(err);
        });
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
</style>
