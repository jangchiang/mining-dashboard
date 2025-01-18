// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'c-mining-board',
      script: 'server.js', // Entry point of your app
      env: {
        NODE_ENV: 'production',
        PORT: 3004, // Adjust to your desired port
      },
      autorestart: true, // Restart app on crashes
      watch: false, // Disable file watching
      max_memory_restart: '1G', // Restart if memory exceeds 1GB
    },
  ],
};
