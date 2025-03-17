### Contributing

<a href="https://github.com/zind-ai/web/issues">Report a bug</a> |
<a href="https://github.com/zind-ai/web/discussions">Discussions</a> |
<a href="https://discord.gg/nqAEPaTD8g">Discord</a>

<br/><br/>

## Process (work on an issue)

1. Check out the <a href="https://github.com/zind-ai/web/issues">issues</a>

- Pick one that you like
- Ask to work on the issue via a comment, a maintainer will assign it to you

2. Fork the repo and create your branch from `main`
3. Once you are happy with the work you've done, create a `pull request`
4. A maintainer will review your `pull request` and will

- merge it in
- or give you feedback

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
