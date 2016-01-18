# Unofficial FLL 2015 Scoreboard

Web scoreboard for the FLL 2015 (Trash Trek) Robot Game.

This is a private project that is not supported or approved by the organisators of the competition.

Feel free to report bugs and suggestions in the Issues =)

## How to use

[Robots-JU](https://robots-ju.ch/) hosts the latest version at <https://fll-scoreboard-2015.robots-ju.ch/>. No need to install anything !

### Do it yourself

```bash
# Install npm and bower dependencies
npm install
bower install
# Run gulp to craft the application
gulp
# Application is ready in the `site` folder
# Just open `site/index.html` in your browser to start
```

### Technical details

NPM is used the get the dev dependencies for `gulp`.

Bower is used for the third party libraries used by the application:

- [React](https://github.com/facebook/react)
- [The Robots-JU Robot Game scorer 2015](https://github.com/robots-ju/fll-robotgame-scorer-2015)

The gulp tasks concat, uglify and copy everything to the `site` folder.

A `gulp watch` task is available to automatically regenerate files as you edit them.

## Images copyrights

The table overview image and the Trash Trek logo come from the official [Robot Game materials](http://www.firstlegoleague.org/challenge/2015trashtrek).
Table image was edited to have white background around the table.
Logo image was scaled down to a more practical size and weight (I still don't know how the original 219x186 jpeg in so bad quality can weight > 600ko).

## Code license

This code is released under [the MIT license](LICENSE.txt).
The logic behind the scoreboard is hosted at <https://github.com/robots-ju/fll-robotgame-scorer-2015> and is also subject to the MIT.