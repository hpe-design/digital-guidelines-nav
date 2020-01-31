# digital-guidelines-nav

Navigation controls for the HPE Digital Guidelines site

## How to use

Assuming you have published `dg-nav.js` somewhere (see below).
Take a look at `test.html` and copy the `<div id="nav">` element into whatever container you want in your site.
Update the `structure` data to describe the navigational structure you desire.

## How to build

Assuming you have git, nodejs, and yarn installed locally.

- `git clone https://github.com/hpe-design/digital-guidelines-nav.git`

- `cd digital-guidelines-nav`

- `yarn install`

- `yarn build`

- publish `build/dg-nav.js` somewhere
