
# Glob importers

Plugins to add globbing support to import statements in various environments like Sass, Webpack and ESBuild.
> **TODO**: Add support for detecting import calls as opposed to statements.

## Major changes since v2

Since v2, the Sass importer now uses `@use` instead of `@import` for better compatibility with modern Sass.
Use v1 if you need support for `@import`.

## Usage

### For `sass` / `sass-embedded` (with `.scss` syntax)

Add the plugin to the `plugins` field of your `sass.config.js`:

```javascript
import { sassPlugin as globImporter } from '@eklingen/glob-importers'
plugins: [globImporter()],
```

This will enable the following:

```scss
@import '../../components/**/*';
```

Will get expanded to, for example (depending on the glob and files present):

```scss
@import '../../components/button/button.scss';
@import '../../components/link/link.scss';
@import '../../components/vide/video.scss';
```

### For `esbuild`

Add the plugin to the `plugins` field of your `esbuild.config.js`:

```javascript
import { esbuildPlugin as globImporter } from '@eklingen/glob-importers'
plugins: [globImporter()],
```

This will enable the following:

```javascript
import 'components/**/*.js';
```

Will get expanded to, for example (depending on the glob and files present):

```javascript
import 'components/button/button.js';
import 'components/link/link.js';
import 'components/video/video.js';
```

### For `webpack`

Add an extra prority rule to the rules in `webpack.config.js`:

```javascript
  import { path as resolvePath } from 'node:path';
  const globImporter = join(process.cwd(), 'node_modules/@eklingen/glob-importers/importers/webpack.js'); // This path has to resolve, since webpack loads it dynamically.
  ...
  {
    module: {
      rules: {
        /* NOTE: Change `test`, `include` and `exclude` to taste. Here sourcePath is the scripts root. The plugin tries to resolve the globs on the include paths. */
        { enforce: 'pre', test: /\.((j|t)sx?)$/, include: resolvePath(__dirname, sourcePath), exclude: /node_modules/, loader: globImporter, options: { test: '(import|require)', delimiter: '\n' } },
        ...
      }
    }
  }
```

This will enable the following:

```javascript
import 'components/**/*.js';
```

Will get expanded to, for example (depending on the glob and files present):

```javascript
import 'components/button/button.js';
import 'components/link/link.js';
import 'components/video/video.js';
```

## Dependencies

This package requires ["tinyglobby"](https://www.npmjs.com/package/tinyglobby).

---

Copyright (c) 2024 Elco Klingen. MIT License.
