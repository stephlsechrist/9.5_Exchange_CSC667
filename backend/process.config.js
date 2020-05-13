module.exports = {
    apps: [
    //   {
    //     name: "service1",
    //     script: "./service1.js",
    //     watch: true,
    //     instances: 2, // tells you how many clones of this do you want in cluster
    //     exec_mode: "cluster", // mean start this service in a cluster mode; tells pm2 to start auto load balancer
    //     ignore_watch : ["node_modules"],
    //     watch: true,
    //   },
    //   {
    //     name: "service2",
    //     script: "./service2.js",
    //     watch: true,
    //     ignore_watch : ["node_modules"],
    //     watch: true,
    //   },
      {
        name: "gateway",
        script: "./gateway.js",
        watch: true,
        ignore_watch : ["node_modules"],
        watch: true,
      },
    ]
  }