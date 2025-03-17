### Contributing

<br/><br/>

## Process

1. Check out the <a href="https://github.com/zind-ai/web/issues">issues</a> and pick one that you like
2. Fork the repo and create your branch from `main`
3. Once you are happy with the work you've done, create a `Pull Request`

<br/>

## Coding practices

1. <b>Formatting</b>: make sure your IDE adheres to the root `prettier` config file
2. <b>Linting</b>: `husky` should run automatically run linting when commit or push code. If not, run `pnpm lint` before your commits
3. <b>Other</b>: be consistent with the rest of the project in terms of `naming conventions` etc

<br/>

## Set up

#### Requirements

- Node v20+
- pnpm (package manager)

<br/>

#### Steps

<p>1. Fork repo</p>
<p>2. Clone forked repo</p>

```
git clone git@github.com:[username]/[forked-repo-name].git
```

<p>3. Branch off the forked repo `main`</p>
<p>4. Install packages</p>

```
// cd to the root of the monorepo
pnpm install
```

<p>5. Build</p>

```
pnpm build
```

<p>6. Add env values (if working on `apps/assistant`)</p>

1. `cd` into `apps/assistant`
2. Rename `.env.local.example` to `.env.local`
3. Add the required env values

<p>7. Run the apps</p>

```
pnpm assistant:dev
```

```
pnpm website:dev
```
