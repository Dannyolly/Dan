//import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import User from "@/store/user";
import {ModulesType } from "@/types/vuex";

/* declare module '@vue/runtime-core' {
   declare your own store states
  interface State {
    user:UserState
  }
  interface UserState {
    username:string
  }
   provide typings for `this.$store`

  interface ComponentCustomProperties {
    $store: Store<State>
  }

} */

declare module "vuex" {
  export function useStore<S = ModulesType>(): Store<S>;
}
