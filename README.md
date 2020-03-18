# Multi Window Experiment

This project explores the feasibility of creating multi-window browser applications appropriate for intensive use-cases such as financial dashboards.

You can read the accompanying blog post [here](https://blog.scottlogic.com/2020/03/18/Investigating-Multi-Windowed-Apps.html).

## Running the project

This simple project demonstrates what's currently possible with multi-windowed applications in various browsers. It's worth noting that this is an active area of development in Chromium (see "Project Fugu"), so expect frequent changes to occur.

Requirements:

- Use **at least** Chrome 80
- Enable `Experimental Web Platform features` in `chrome://flags`
- Ensure you have `yarn` installed
- Install dependencies using `yarn install`

Run `yarn start` and open `localhost:8080`

## Questions/Issues?

Please feel free to raise an issue if you spot any problems or have any questions.

If you're seeing odd window behaviour, it might worth resetting the local storage (e.g. using Chrome Dev Tools).

## Deploying to Github Pages

A new build is automatically deployed to [Github pages](https://samburnstone.github.io/Multi-Monitor-Window-Popup-Layouts/) on every push to master. It uses Github actions, inspired by [this blog post](https://blog.scottlogic.com/2020/02/24/github-cd.html).
