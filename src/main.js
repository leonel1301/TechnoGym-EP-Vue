import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import Dropdown from "primevue/dropdown";
import PrimeVue from "primevue/config";
import SplitButton from "primevue/splitbutton";
import Toolbar from "primevue/toolbar";
import Card from "primevue/card";
import DataTable from "primevue/datatable";
import Column from "primevue/column";


import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";

import "primevue/resources/themes/bootstrap4-light-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import i18n from "./locales/i18n";

const app = createApp(App);

app.component("pv-button", Button);
app.component("pv-inputText", InputText);
app.component("pv-checkbox", Checkbox); 
app.component("pv-dropdown", Dropdown);
app.component("pv-splitButton", SplitButton);
app.component("pv-toolbar", Toolbar);
app.component("pv-toast", Toast);
app.component("pv-card", Card);
app.component("pv-dataTable", DataTable);
app.component("pv-column", Column);


app.use(ToastService);
app.use(router);
app.use(PrimeVue);
app.use(i18n);
app.mount("#app");