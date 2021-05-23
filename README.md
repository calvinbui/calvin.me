# calvin.me

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) [![Netlify Status](https://api.netlify.com/api/v1/badges/f04c8da6-6e11-4813-afa0-320f886be71e/deploy-status)](https://app.netlify.com/sites/calvinme/deploys) [![Maintainability](https://api.codeclimate.com/v1/badges/0eed6116d53f8a7a048c/maintainability)](https://codeclimate.com/github/calvinbui/calvin.me/maintainability)

Calvin's personal website running on Gatsby, React, and Node.js.

## Features

- Posts and pages in Markdown
- Tags and categories
- Night mode
- DOS mode (404)
- Code theme (starring [New Moon](https://taniarascia.github.io/new-moon))
- Sass (starring [Primitive](https://taniarascia.github.io/primitive))

## Development

### Setup
```bash
git clone --single-branch --branch master --depth 1 git@github.com:calvinbui/calvin.me.git
cd calvin.me
yarn install
yarn gatsby telemetry --disable
```

### Developing
```bash
yarn dev
```

## Upgrading

```bash
yarn upgrade-interactive --latest
```

## Contributing

If you see any typos or formatting errors in a post, or any other issue that needs to be addressed, please do not hesitate to open a pull request and fix it!

## License

This project is open source and available under the [MIT License](LICENSE).
