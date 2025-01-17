// module.exports = {
// 			webpack(config) {
// 				config.module.rules.push({
// 					test: /\.svg$/,
// 					use: ['@svgr/webpack', 'url-loader']
// 				});

// 				return config;
// 			}
//         };

module.exports = {
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			issuer: {
				test: /\.(js|ts)x?$/,
			},
			use: ['@svgr/webpack'],
		});

		return config;
	},
};
