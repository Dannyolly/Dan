<script setup lang='ts'>
import {defineProps, toRefs, ref, watchEffect, onMounted} from 'vue';
import {useState} from '@/hooks/useState';
interface HomeProps {}
const props = defineProps<HomeProps>()
const { } = toRefs(props)
const {} = useState({})
</script>
<template>
  <div class='home-container'> 
          <div className='home-post-container' id='scrollableDiv'
          style={{width:'100%',height:'100%',display:'flex',overflow:'scroll',flexDirection:'column'}}
          > 
              <div>
                <MiddleTopHeader/>
                <Publish onUploadNewPost={onUploadNewPost} />
                <div style={{width:'100%',height:1,backgroundColor:"#F4F4F4"}}/>
              </div>
              {
                postArr===undefined?
                <div style={{...middleStyle,width:'100%',height:'40%'}}>
                  <Spin size='large' indicator={antIcon} />
                </div>
                :
                <InfiniteScroll
                  hasMore={true}
                  dataLength={postArr.length}
                  next={getMorePost}
                  
                  loader={<Spin size='large' indicator={antIcon} />}
                  scrollableTarget='scrollableDiv'
                  /* scrollThreshold={0.5} */
                >
                  {
                    postArr.map((item,index)=>{
                      /* console.log(`postId${ item.id}`); */
                      return(
                        <UserPost key={item.id} postInfo={item} />
                      )
                    })
                  }
                </InfiniteScroll>
              }
          </div>
</template>

<style lang="less" scoped>
.home-post-container::-webkit-scrollbar{
    display: none;
}

.infinite-scroll-component::-webkit-scrollbar{
    display: none;
}
// PC
@media screen and (min-width:1300px) {
    .home-container{
        max-width: 650px;
        min-width: 550px;
        width: 40%;
        height: calc(100%-53px);
        border-right-width: 1px;
        border-right-color: #CDCDCD;
        overflow: scroll;
    }
}

// PC
@media screen and (min-width:1100px) and (max-width:1299px) {
    
    .home-container{
        max-width: 600px;
        
        width: 80%;
        height: calc(100%-53px);
        border-right-width: 1px;
        border-right-color: #CDCDCD;
        overflow: scroll;
    }
}



// ipad
@media screen and (min-width:600px) and (max-width:1099px) {
    .home-container{
        max-width: 600px;
        
        width: 80%;
        height: calc(100%-53px);
        border-right-width: 1px;
        border-right-color: #CDCDCD;
        overflow: scroll;
    }
}

// phone
@media screen and (min-width:0px) and (max-width:599px) {
    .home-container{
        width: 100%;
        /* overflow: scroll; */
        /* padding-top: 53px; */

    }
    
}


.home-container::-webkit-scrollbar {
    display: none;
}
</style>