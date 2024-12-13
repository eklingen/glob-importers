import { glob, isDynamicPattern } from 'tinyglobby'

export default function globImporter(source = '') {
  const cwd = this.context

  function expandGlob(result) {
    if (!result) {
      return
    }

    const [match, quote, content] = result

    if (!isDynamicPattern(content)) {
      return
    }

    const pre = result.input.slice(0, result.index)
    const post = result.input.slice(result.index + match.length)
    const filepaths = [...glob.sync(content, { cwd })].sort((a, b) => a.localeCompare(b))
    const contents = filepaths.map(filename => `${pre}${quote}${filename}${quote}${post}`).join('\n').trim()

    return contents
  }

  function expandLine(line, payload) {
    if (!(payload && payload.trim())) {
      return line
    }

    return expandGlob(/(['"])(.*?)\1/.exec(line)) || line
  }

  return source.replace(/^.*\b(import|require)\b(.*)$/gm, expandLine)
}
