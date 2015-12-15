# Workers Test Drive!
This is just a demo comparing sync vs async (via workers) versions of the "same" page in terms of performance.

![screenshot](https://cloud.githubusercontent.com/assets/8743976/11825186/3767a9f8-a343-11e5-9d5f-eab6eea112b0.png)

You can play with it here: https://dbautistav.github.io/workers

## Sync version
This version loads a ["large file" (~49.7 MB)](https://github.com/dbautistav/workers/blob/gh-pages/data/1511.data) ([Ecobici users data at Mexico City for november 2015](https://www.ecobici.df.gob.mx)) from main thread and plots it.
The red square is animated via JS while the numbered cube is CSS animated therefore the first one is affected when the file is loaded but the other one no.

## Async version
Just like sync version but the main thread "creates" a service worker for loading the data and also registers a web worker to enable catching and offline capabilities.
Later the loaded data is transferred from worker to main thread and plotted.
Effects are specially noted when refreshing the page or visiting the page without network connection after first full load (visible chart).

# LICENSE
This demo is [**Free Software**](https://github.com/dbautistav/workers/blob/gh-pages/LICENSE).
