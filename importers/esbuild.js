import { glob, isDynamicPattern } from 'tinyglobby'

const onResolveHandler = ({ path, namespace, resolveDir, kind }) => {
  if (resolveDir === '' || namespace !== 'file' || (kind !== 'import-statement' && kind !== 'require-call' && kind !== 'dynamic-import' && kind !== 'require-resolve' && kind !== 'import-rule') || !isDynamicPattern(path)) {
    return
  }

  return { path, namespace: 'import-glob', pluginData: { resolveDir } }
}

const onLoadHandler = async args => {
  const filepaths = (await glob(args.path, { cwd: args.pluginData.resolveDir })).sort((a, b) => a.localeCompare(b))
  const contents = filepaths.map(module => `import '${module}';\n`).join('').trim()

  return { contents, resolveDir: args.pluginData.resolveDir }
}

export default function globImporter() {
  return {
    name: 'esbuild:glob-importer-plugin',
    setup: builder => {
      builder.onResolve({ filter: /\.((j|t)sx?)$/ }, args => onResolveHandler(args))
      builder.onLoad({ filter: /\.((j|t)sx?)$/, namespace: 'import-glob' }, args => onLoadHandler(args))
    },
  }
}
