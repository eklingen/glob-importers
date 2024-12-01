import { join as joinPath, resolve as resolvePath } from 'node:path'

import glob from 'fast-glob'

const PREFIX = 'sass-glob-importer://'

export default function globImporter(rootUrl = '') {
  rootUrl = resolvePath(process.cwd(), rootUrl)
  let index = 0

  return {
    canonicalize: async (url = '') => {
      url = joinPath(rootUrl, url).replace(PREFIX, '')

      return glob.isDynamicPattern(url) ? new URL(url, PREFIX) : null
    },

    load: async (canonicalUrl) => {
      const pathname = canonicalUrl.pathname.endsWith('.scss') ? canonicalUrl.pathname : canonicalUrl.pathname + '.scss'
      const pathnames = [...(await glob(pathname))].sort((a, b) => a.localeCompare(b)).map(path => `@use '${path.replace(PREFIX, 'file:///')}' as glob_${index++}; `)
      const contents = pathnames.join('').trim()

      return { contents, syntax: 'scss' }
    },
  }
}
