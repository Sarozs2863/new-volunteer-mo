// 将一些常用方法挂载到全局
import Vue from 'vue';
import * as filter from './filter';

Object.keys(filter).forEach(k => Vue.filter(k, filter[k]));

Vue.prototype.$formatDate = Vue.filter('formatDate');
Vue.prototype.$hidePhone = Vue.filter('hidePhone');
