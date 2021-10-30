module.exports = {
  apps: [
    {
      name: "chat-rocket",
      script: "./dist/server.js",
      instances: "3",
      exec_mode: "cluster",
      increment_var: "PORT",
      env: {
        PORT: 9000,
        NODE_ENV: "production"
      },
      merge_logs: true,
      error_file: "./logs/error.log",
      out_file: "./logs/out.log"
    }
  ]
}
