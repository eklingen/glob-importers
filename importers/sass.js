import { join as joinPath, resolve as resolvePath } from 'node:path'

import glob from 'fast-glob'

const PREFIX = 'sass-glob-importer://'

export default function globImporter(rootUrl = '') {
  rootUrl = resolvePath(process.cwd(), rootUrl)

  return {
    canonicalize: async (url = '', options = { fromImport: false, containgUrl: {} }) => {
      url = joinPath(rootUrl, url).replace(PREFIX, '')

      return options.fromImport && glob.isDynamicPattern(url) ? new URL(url, PREFIX) : null
    },

    load: async (canonicalUrl) => {
      const pathname = canonicalUrl.pathname.endsWith('.scss') ? canonicalUrl.pathname : canonicalUrl.pathname + '.scss'
      const pathnames = [...(await glob(pathname))].sort((a, b) => a.localeCompare(b)).map(path => `@import '${path.replace(PREFIX, 'file:///')}'; `)
      const contents = pathnames.join('').trim()

      return { contents, syntax: 'scss' }
    },
  }
}
