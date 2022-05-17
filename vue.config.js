const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "微社交";
      return args;
    });
  },
  devServer: {
    proxy: {
      "/api": {
        // 访问的后台地址
        // target: "http://127.0.0.1:8080",
        target: "http://172.16.85.124:8080",
        changeOrigin: true,
        pathRewrite: {
          // 重写地址 你的接口地址是'http://10.10.1.10/login' 你请求得时候地址只需要写'/api/login'
          "/api": "",
        },
      },
    },
    port: 8000,
  },
});
