module.exports = {
    resolve: {
        stream: require.resolve("stream-browserify"),
        crypto: false,
        assert: false,
        http: false,
        https: false,
        url: false,
        os: false,
    },
};
