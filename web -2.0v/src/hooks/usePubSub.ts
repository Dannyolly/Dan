import pubsub from 'pubsub-js'
interface PubSub {
    publish : (message:string,data:any)=>void;

    subscribe:( message:string , cb :(message:string,data:any)=>void )=>void

    clearAllSubscriptions:()=>void

    clearSubscriptions:(message:string)=>void

    unsubscribe :(message:string)=>void;
}

export const usePubSub = ():PubSub => pubsub


