import Vue from 'vue'
import {
  Container,
  Header,
  Aside,
  Main,
  Footer, 
  Row,
  Col,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Button,
  Alert,
  Table,
  TableColumn,
  Form,
  FormItem,
  Breadcrumb,
  BreadcrumbItem,
  Dialog,
  Input,
  Select,
  Option,
  // Notification,
  Pagination,

  Loading,
  MessageBox,
  Message,
} from 'element-ui'

// 应用插件

Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Row)
Vue.use(Col)
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Button)
Vue.use(Alert)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Dialog)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
// Vue.use(Notification)
Vue.use(Pagination)

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
// Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;