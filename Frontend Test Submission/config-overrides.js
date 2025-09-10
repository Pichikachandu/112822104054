module.exports = function override(config, env) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "https": require.resolve("https-browserify"),
    "http": require.resolve("stream-http"),
    "stream": require.resolve("stream-browserify"),
    "util": require.resolve("util/"),
    "url": require.resolve("url/")
  };
  return config;
};
