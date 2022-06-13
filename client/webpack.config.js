module.exports = {
    resolve: {
        fallback: {
            fs: require.resolve('fs'),
            tls: require.resolve('tls'),
            net: require.resolve('net'),
            path: require.resolve('path-browserify'),
            zlib: require.resolve('browserify-zlib'),
            http: require.resolve('stream-http'), 
            https: require.resolve('https-browserify'), 
            stream: require.resolve("stream-browserify"),
            crypto: require.resolve("crypto-browserify"),
        }
    }
};
