# calvin.me

Calvin's personal website running on Gatsby, React and Node.js.

## Features

- Posts and pages in Markdown
- Tags and categories
- Night mode
- DOS mode (404)
- Code theme (starring [New Moon](https://taniarascia.github.io/new-moon))
- Sass (starring [Primitive](https://taniarascia.github.io/primitive))

## Development

### Setup
```console
git clone https://gitea/calvinbui/calvin.me.git
cd calvin.me
nvm use
npm install -g yarn
yarn install --immutable
yarn gatsby telemetry --disable
```

### Developing
```console
yarn dev
```

### Upgrading

```console
yarn upgrade-interactive
```

## Deployment

This repo is mirrored by Drone into GitHub. GitHub Actions is responsible for building and deploying into GitHub Pages.

## Contributing

If you see any typos or formatting errors in a post, or any other issue that needs to be addressed, please do not hesitate to open a pull request and fix it!

## License

This project is open source and available under the [MIT License](LICENSE).
