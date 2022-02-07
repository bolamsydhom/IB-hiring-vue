import 'angular';
import '@uirouter/angularjs';

import './app/styles/main.scss';
import './app/app.module.js';
import './app/services/employees.service';
import './app/components/employees-list/employees-list.component';

import './app/pages/home-page/home-page.controller';
import './app/app.routes.js';
import store from './app/store';
import Vue from 'vue';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';

new Vue({
  store,
});
Vue.use(ElementUI, { locale });
