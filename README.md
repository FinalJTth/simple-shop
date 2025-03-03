# Vite + Deno + React + TypeScript

[![](https://img.shields.io/crates/v/deno.svg)](https://crates.io/crates/deno)
[![Twitter badge][]][Twitter link] [![Discord badge][]][Discord link]
[![YouTube badge][]][YouTube link]

<img align="right" src="https://deno.land/logo.svg" height="150px" alt="the deno mascot dinosaur standing in the rain">

[Deno](https://deno.com)
([/ˈdiːnoʊ/](https://ipa-reader.com/?text=%CB%88di%CB%90no%CA%8A), pronounced
`dee-no`) is a JavaScript, TypeScript, and WebAssembly runtime with secure
defaults and a great developer experience. It's built on [V8](https://v8.dev/),
[Rust](https://www.rust-lang.org/), and [Tokio](https://tokio.rs/).

Learn more about the Deno runtime
[in the documentation](https://docs.deno.com/runtime/manual).

## Deno Installation

Install the Deno runtime on your system using one of the commands below. Note
that there are a number of ways to install Deno - a comprehensive list of
installation options can be found
[here](https://docs.deno.com/runtime/manual/getting_started/installation).

Shell (Mac, Linux):

```sh
curl -fsSL https://deno.land/install.sh | sh
```

PowerShell (Windows):

```powershell
irm https://deno.land/install.ps1 | iex
```

[Homebrew](https://formulae.brew.sh/formula/deno) (Mac):

```sh
brew install deno
```

[Chocolatey](https://chocolatey.org/packages/deno) (Windows):

```powershell
choco install deno
```

[WinGet](https://winstall.app/apps/DenoLand.Deno) (Windows):

```powershell
winget install --id=DenoLand.Deno
```

### Build and install from source

Complete instructions for building Deno from source can be found in the manual
[here](https://docs.deno.com/runtime/manual/references/contributing/building_from_source).

## Running

You need to have Deno v2.0.0 or later installed to run this repo.

Start a dev server:

```
$ deno task dev
```

## Deploy

Build production assets:

```
$ deno task build
```

## Test

Test discount functionality (the function is inside /src/stores/discount.ts):

```
$ deno task test
```
