# Workers test-drive
This is just a demo comparing single vs multi thread (via workers) versions of the "same" page in terms of performance.

![screenshot](https://cloud.githubusercontent.com/assets/8743976/11826069/991b1edc-a348-11e5-9f04-47c6674c5375.png)

You can play with it here: https://dbautistav.github.io/workers [(assure you to check the disclaimer first)](https://github.com/dbautistav/workers#disclaimer).

## Single thread version
This version loads a ["large file" (~49.7 MB)](https://github.com/dbautistav/workers/blob/gh-pages/data/1511.data) ([Ecobici users data at Mexico City for november 2015](https://www.ecobici.df.gob.mx)) from main thread and plots it.
The red square is animated via JS while the numbered cube is CSS animated therefore the first one is affected when the file is loaded but the other one no.

## Multi-thread version
Just like single thread version but the main thread "creates" a service worker for loading the data and also registers a web worker to enable caching and offline capabilities.
Later the loaded data is transferred from worker to main thread and plotted.
Since data load is done at service worker thread this does not affect JS animation (red square).
Web worker effects are specially noted when refreshing the page or visiting the site without network connection after first full load (visible chart).

# Disclaimer
**WARNING**: displaying the demo could hang your tab, browser or even your entire device (since the earlier is _really heavy_ due to associated data: ~52 MB (~13 MB gzipped)).
I recommend to save every work in progress at every single application which you were working on your device before checking the demo otherwise you may lose unsaved data.
I also discourage use mobile data to access this demo and look for a Wi-Fi connection instead.

# LICENSE
This demo is [**Free Software**](https://github.com/dbautistav/workers/blob/gh-pages/LICENSE).
