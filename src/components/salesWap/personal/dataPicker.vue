<template>
  <mt-datetime-picker class="needclick" ref="birthDatePicker" @touchmove.stop.prevent
                      :startDate="date"
                      :endDate="new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())"
                      type="date" year-format="{value} 年"
                      :visibleItemCount="5"
                      month-format="{value} 月"
                      date-format="{value} 日" @confirm="saveBirthDate"></mt-datetime-picker>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        date: new Date(new Date().getFullYear() - 1, 1, 1)
      }
    },
    methods: {
      saveBirthDate(e) {
        let d = new Date(e)
        let month = (d.getMonth() + 1).toString().padStart(2, '0'),
          date = d.getDate().toString().padStart(2, '0')
        let newDate = `${d.getFullYear()}-${month}-${date}`
        this.$emit('datechange', newDate)
      },
      setStartDate(date) {
        this.date = date
      },
      open() {
//        document.body.style.overflow = 'hidden'
//        document.body.style.position = 'fixed'
        this.$refs.birthDatePicker.open()
      },
      close() {
//        document.body.style.overflow = ''
//        document.body.style.position = ''
        this.$refs.birthDatePicker.close()
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">

</style>
