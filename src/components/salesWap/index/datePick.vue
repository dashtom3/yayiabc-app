<template>
  <mt-popup v-model="popupVisible" @touchmove.stop.prevent position="bottom" class="datePicker-container mint-datetime needclick">
    <!--:modal="false"-->
    <mt-picker class="select" :visibleItemCount="7" :slots="slots" value-key="aname" @change="onValuesChange" show-toolbar>
      <span class="mint-datetime-action mint-datetime-cancel" @click="close">{{ cancelText}}</span>
      <span class="mint-datetime-action mint-datetime-confirm" @click="confirm">{{ confirmText }}</span>
    </mt-picker>
  </mt-popup>
</template>

<script type="text/ecmascript-6">

const slots = [
  {
    flex: 1,
    values: [],
    textAlign: 'right'
  },
  {
    divider: true,
    content: '-',
    flex: 1,
    className: 'pipe'
  },

  {
    flex: 1,
    values: [],
    textAlign: 'left'
  }]

export default {
  data() {
    return {
      slots: slots,
      popupVisible: false
    }
  }
  ,
  props: {
    confirmText: {
      default:
      '确定',
      type:
      String
    }
    ,
    cancelText: {
      default:
      '取消',
      type:
      String
    }
  }
  ,
  methods: {
    initPicker() {
      let nowYear = new Date().getFullYear()
      //初始化年份
      this.slots[0].values = [...new Array(3).keys()].map((item, index) => `${nowYear - index}年`)
      //初始化月份
      this.slots[2].values = [...new Array(12).keys()].map(item => `${(item + 1 + '').padStart(2, 0)}月`)
    }
    ,
    onValuesChange(picker, values) {
      this.date = values
    }
    ,
    open() {
      this.popupVisible = true
      //        document.body.style.overflowY = 'hidden'
      //        document.documentElement.style.overflowY = 'hidden'
      //        document.documentElement.style.position = 'fixed'
    }
    ,
    close() {
      this.popupVisible = false
      //        document.body.style.overflowY = ''
      //        document.documentElement.style.overflowY = ''
      //        document.documentElement.style.position = ''
    }
    ,
    confirm() {
      let date = this.date.join('').match(/\d+/g)
      this.$emit('dateChange', date)
      this.close()
    }
  }
  ,
  mounted() {
    this.initPicker()
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
@import "../../../common/sass/factory";

.datePicker-container {
  width: 100%;
  .mint-datetime-action {
    display: inline-block;
    width: 50%;
    text-align: center;
    line-height: 40px;
    font-size: 16px;
    color: $themeColorHover;
  }
  .picker-slot-wrapper,
  .picker-item {
    backface-visibility: hidden;
  }
  .picker-toolbar {
    border-bottom: solid 1px #eaeaea;
  }
  
  .pipe {
    justify-content: center;
  }
}
</style>
