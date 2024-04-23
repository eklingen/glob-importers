import { default as esbuildImporter } from './importers/esbuild.js'
import { default as sassImporter } from './importers/sass.js'
import { default as webpackImporter } from './importers/webpack.js'

export const esbuildPlugin = esbuildImporter
export const sassPlugin = sassImporter
export const webpackPlugin = webpackImporter

export default { esbuildPlugin, sassPlugin, webpackPlugin }
