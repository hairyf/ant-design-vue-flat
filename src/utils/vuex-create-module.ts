import { Store, Module } from 'vuex';
import { State } from '../store';
export default <S, R = State>(options: Module<S, R>) => options as Store<S>;
