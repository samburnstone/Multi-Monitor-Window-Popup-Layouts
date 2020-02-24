# Multi Window Experiment

This project explores the feasibility of creating multi-window browser applications appropriate for intensive use-cases such as financial dashboards.

## Running the project

This simple project demonstrates what's currently possible with multi-windowed applications in various browsers. It's worth noting that this is an active area of development in Chromium (see "Project Fugu"), so expect frequent changes to occur.

Requirements:

- Use **at least** Chrome 80
- Enable `Experimental Web Platform features` in `chrome://flags`
- Ensure you have `yarn` installed
- Install dependencies using `yarn install`

Run `yarn start` and open `localhost:8080`

## Deploying to Github Pages

There's almost certainly a better way to do this, but for now deployment is done as follows:

1. Checkout `gh-pages-deploy` branch
2. Merge in `master`
3. Run `yarn gh-publish`
4. That should be it
