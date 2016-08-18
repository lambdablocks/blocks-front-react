'use strict'

const join = require('path').join

module.exports = {
	                    entry: [
		                    join(__dirname, 'src/index.js')
	],

	                    output: {
		                    filename: 'app.js',
		                    path: join(__dirname, 'dist')
	},

	                    module: {
		                    loaders: [
			                    {
				                                        test: /\.js$/,
				                                        loader: 'babel-loader',
				                                        exclude: /node_modules/
			                    }
		]
	}
}

