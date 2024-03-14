export default (phase, { defaultConfig }) => {
  const nextConfig = {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback.fs = false
      }
      config.module.rules.push({
        test: /\.worker\.js$/,
        loader: 'worker-loader',
        options: { inline: true },
        /*options: {
          name: 'static/[hash].worker.js',
          publicPath: '/_next/',
        },*/
      })
      return config
    },
    transpilePackages: [
      'antd',
      '@ant-design',
      'rc-util',
      'rc-pagination',
      'rc-picker',
      'rc-notification',
      'rc-tooltip',
      'rc-tree',
      'rc-table',
    ],
    output: 'standalone',
  }
  return nextConfig
}
