module.exports = {


	//This code will be compiled

	entry: "./app/App.js",

	//Then output into this file

	output: {
		filename: "public/bundle.js"
	},

	//This will do want we want
	module: {
		loaders: [
		{	
			test: /\.jsx?$/,
			excluse: /(node_modules|bower_components)/,
			loader: 'bable',
			query: {
				//These are the specific transformations we'll be using.
				presets: ['react', 'es2015']
				}

			}

		]
	}
}