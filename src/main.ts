import "./assets/styles/bootstrap.min.css";
import "./assets/styles/global.css";

import "animate.css";
import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "fa-icons";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(router);
app.mount("#app");
