import { tsParenthesizedType } from "@babel/types";
import { Ref } from "vue";

class TimeSlice {
    index = 1;

    arrLen = 0;

    arr: Ref<any[]> | undefined  | null = undefined

    timer:NodeJS.Timer | undefined | null;

    handleCountForEachTime:number = 0;

    task:((arr:( Ref<any[]>),left:number,right:number) => void ) | null ;

    startTime:number = 0 ;

    callBack: (()=>void);

    constructor( task:(arr: ( Ref<any[]>) ,left:number,right:number)=>void , handleCountForEachTime:number ,  arr: Ref<any[]> ,arrLen:number, cb: (()=>void)  ) {
        this.task  = task;
        this.handleCountForEachTime  =handleCountForEachTime
        this.arr = arr
        this.arrLen = arrLen
        this.callBack  = cb
    }

    start() {
        this.startTime = Date.now()
        this.doTask()
    }

    doTask(){
        this.timer  = setInterval(()=>{
            let left = this.index;
            let pre = Date.now();
            let right = Math.min( this.index + this.handleCountForEachTime , this.arrLen )
            if(this.task){
                this.task(this.arr as unknown as Ref<any[]>,this.index,right )
            }
            this.index = right
            if(this.index  === this.arrLen && this.timer){
                clearInterval( this.timer )
                this.clear()
                this.callBack()
                //console.log(`done ----`,Date.now()-  this.startTime + 'ms');
            }
            //requestAnimationFrame(()=>console.log(`${left} --- ${right} have done --- ${Date.now()-pre}ms`))
            
        },16.6)
    }

    clear(){
        this.arr = null;
        this.timer = null;
        this.task = null;
        
    }
}

export {
    TimeSlice
}


