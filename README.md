# carapace-crop

Crop for [Carapace](https://github.com/percolate/carapace).

[![Build Status](https://secure.travis-ci.org/christophercliff/carapace-crop.png?branch=master)](https://travis-ci.org/christophercliff/carapace-crop)

## Usage

```js
var Carapace = require('carapace')
var Crop = require('carapace-crop')

Carapace
    .create(imageEl)
    .run([
        Crop.create({ width: 100, height: 100, left: 100, top: 100 })
    ], function(err, canvas){
        canvas // [object HTMLCanvasElement 100x100]
    })
```

## Installation

```
$ npm install carapace-crop
```

## Tests

```
$ grunt test
$ grunt test:server
$ grunt test:browser
```

## License

MIT License, see [LICENSE](https://github.com/christophercliff/carapace-crop/blob/master/LICENSE.md) for details.
