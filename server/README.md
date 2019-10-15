# Project Skeleton Server

## Running

Launch server with `npm run start`. By default the application is available at <http://localhost:3001>. Alternately, to enable hot reloading of changes to the server, you can use `npm run watch`. In general, though, you should launch the client and server concurrently from the "top-level" package.

## Setup

You should install the dependencies from the "top-level" package as described in its README or via `npm install` in this directory.

## Development

### Testing with Jest

The server is configured for testing with the Jest test runner. Tests can be run with:

```
npm test
```

### Linting with ESLint

The server is configured with the [AirBnB ESLint rules](https://github.com/airbnb/javascript). You can run the linter with `npm run lint` or `npx eslint .`. Include the `--fix` option to `eslint` to automatically fix many formatting errors, e.g. `npm run lint -- --fix`, although note that the "fix" option can introduce errors so we recommended committing beforehand.

For reference, the ESLint rules were installed with:

```
npx install-peerdeps --dev eslint-config-airbnb-base
npm install --save-dev eslint-config-prettier
```

and `.eslintrc.json` configured with:

```
{
  "extends": ["airbnb-base", "prettier",
  "env": {
    "jest": true
  }
}
```

### Managing Secrets

The skeleton uses the [dotenv](https://www.npmjs.com/package/dotenv) package to load the variables in the .env file into the environment when starting the server. You can place secrets, e.g. API keys or database passwords, into that file. Those secrets should not be committed into your version control system. To prevent you from doing so, the .env file is included in the .gitignore file (so that it will be ignored by Git). If your secrets as needed by your tests (as they are here in the example), you will need to [add them to your repository in Travis-CI](https://docs.travis-ci.com/user/environment-variables/).
