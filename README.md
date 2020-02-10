# Multi Window Experiment

This project explores the feasibility of creating multi-window browser applications appropriate for intensive use-cases such as financial dashboards.

Currently, most applications resort to using a wrapper such as [Electron](https://www.electronjs.org/), however this requires web applications to be run as desktop apps in order to get access to native features.

## Running the project

This simple project demonstrates what's currently possible with multi-windowed applications in various browsers. It's worth noting that this is an active area of development in Chromium (see "Project Fugu"), so expect frequent changes to occur.

Requirements:

- Use **at least** Chrome 80
- Enable `Experimental Web Platform features` in `chrome://flags`
- Ensure you have `yarn` installed
- Install dependencies using `yarn install`

Run `yarn start` and open `localhost:8080`
