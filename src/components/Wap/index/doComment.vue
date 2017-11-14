<template>
  <div>
    <div></div>
    <div>
      <textarea name="" id="" cols="30" rows="10"></textarea>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {ADD_COMMENT} from '../../../vuex/types'

  export default {
    data(){
      return{
        commentContent:''
      }
    },
    props:{
      isShow:{
        type:Boolean,
        default:false
      },
      args:{
        type:Object
      }
    },
    methods:{
      releaseComment(index,id,userName,parentId){
        let obj = {
          type:'牙医圈',
          beCommentedId:id,
          commentContent:this.commentContent,
          parentId:parentId ? parentId : null,
        }
        this.$store.dispatch(ADD_COMMENT, obj).then(res=>{
          if(res.callStatus === 'SUCCEED'){
            this.$set(this.yayiCircleData[index],'subCommentList',this.yayiCircleData[index].subCommentList.push(res.data))
          }
        })
      },
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">

</style>
