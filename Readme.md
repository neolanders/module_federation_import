# Using module federation code through npm, build style import

This repo attempts to write code that does the following:
- "host" package (/module_fed_package/packages/host) is an webpack based package that use module federation to load code from
a remote, at runtime
- "nav" package (/module_fed_package/packages/nav) contains a header component that is exposed via module federation for runtime consumption.  It is be used by the host
- "legacyApp" application (/legacyApp) does a standard yarn or npm local import of host.

## Motivation
The goal of the exercise is to try to include module federation code indirectly in a legacy application that doesn't know about module federation.  And maybe doesn't even use webpack (this one does, but another bundler like rollup could be used alternatively in the legacy application).  The package ("host") that is imported into the legacy application is built to run webpack module federation, and has all the knowledge of the remote. 

## Warning
As written, this code *does not* run. It is posted to share with others to see if they can uncover mistakes made by me, or to confirm that this model will not work.

## Credit
The basic module federation code is based on https://github.com/module-federation/module-federation-examples, and the Practical Module Federation book.  Any mistakes in this repo are mine, not those of the original authors (which does not promoted the static import approach attempted here)

## Installation & reproduction steps
1. Clone the repo
2. Navigate to module_fed_package.  Run "yarn"
3. Navigate to module_fed_package/packages/nav.  Run "yarn start".
4. In another shell, navigate to module_fed_package/packages/host.  Run "yarn build:dev"
5. In yet another shell, navigate to legacyApp. Run "yarn"
6. In the same shell, run "yarn start"

## Results
After the final reproduction steps, an error like this should be seen in the browser:

Compiled with problems:

ERROR in ./node_modules/host/src/App.jsx 5:45-68

Module not found: Error: Can't resolve 'my-nav/Header' in 'path\legacyApp\node_modules\host\src'
