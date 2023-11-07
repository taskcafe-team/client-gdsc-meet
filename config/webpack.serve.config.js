const { webpack } = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const serverInitial = new WebpackDevServer(
	webpack({
		mode: 'production',
		entry: {},
		output: {},
	}),
	{
		compress: true,
		static: './dist',
		historyApiFallback: true,
		port: process.env.PORT || 8080,
		allowedHosts: 'all',
	}
)

serverInitial.start()
