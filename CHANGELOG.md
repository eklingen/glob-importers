
# Changelog

v2.1.1 - Fixed a bug where the Sass importer would not correctly resolve paths since the v2.0.1 update.
v2.1.0 - Feature: ESBuild importer now supports any glob pattern, so long as it has at least one `*` character.
v2.0.3 - Fixed an older bug where the globbing dependency was incorrectly marked as `devDependency` instead of `dependency`.
v2.0.2 - Fixed a bug that resulted from the v2.0.1 changes.
v2.0.1 - Replaced `fast-glob` dependency with `tinyglobby`.
v2.0.0 - Sass importer now uses `@use` instead of `@import` for better compatibility with modern Sass. Use v1 if you need `@import`.
v1.0.5 - Reverted change of 1.0.4 since it breaks `@import` statements.
v1.0.4 - Removed sass importer check for `fromImport` as it was causing issues with `@use` statements.
v1.0.3 - Small changes for Windows compatibility
v1.0.2 - Fixed a bug where the ESBuild importer made import() calls instead of import statements.
v1.0.1 - Added missing files in published set (oops)
v1.0.0 - Initial release
