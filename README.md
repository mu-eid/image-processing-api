# Image Processing API

This repository contains the source code for the first project of Udacity's _Advanced Web Development course_.

## How to use this code?

On terminal follow this series of commands:

-   Clone this repo.

    ```
    $ git clone https://github.com/mu-eid/image-processing-api.git
    ```

-   Enter the cloned repo directory.

    ```
    $ cd image-processing-api
    ```

-   Install dependencies.
    ```
    $ npm install
    ```
-   Start the server.
    ```
    $ npm start
    ```
-   Visit the provided address in your browser.
    ```
    http://127.0.0.1:7001/about
    ```

## Endpoints

-   resize/

use this endpoint to request resizing of an image.

```
/resize?image=[name]&width=[number]&height=[number]
```

Example:

```
http://127.0.0.1:7001/resize?image=fjord&width=300&height=200
```

## List of Images

use these image file names to try and test the API.

-   fjord
-   encenadaport
-   icelandwaterfall
-   santamonica
-   palmtunnel

## Other npm scripts

-   Start the dev server via:

    ```
    $ npm serve
    ```

-   Format the source code via:
    ```
    $ npm run fmt
    ```
-   Lint the source code via:
    ```
    $ npm run lint
    ```
-   Clear produced artifacts (build/, images/out) via:
    ```
    $ npm run clear
    ```
