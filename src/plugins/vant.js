// 按需全局引入 vant组件
import Vue from 'vue';
import {
  Button,
  List,
  Cell,
  Tabbar,
  TabbarItem,
  Row,
  Col,
  Icon,
  Image,
  Card,
  Dialog,
  PasswordInput,
  NumberKeyboard,
  Divider,
  Grid,
  Radio,
  GridItem,
  Toast,
  Skeleton,
  Empty,
  Tag
} from 'vant';
Vue.use(Button);
Vue.use(Radio);
Vue.use(Toast);
Vue.use(Dialog);
Vue.use(Cell);
Vue.use(List);
Vue.use(Tabbar).use(TabbarItem);
Vue.use(Row);
Vue.use(Col);
Vue.use(Icon);
Vue.use(Image);
Vue.use(Card);
Vue.use(PasswordInput);
Vue.use(NumberKeyboard);
Vue.use(Divider);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Skeleton);
Vue.use(Empty);
Vue.use(Tag);
