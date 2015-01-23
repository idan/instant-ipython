Instant IPython
===============

[IPython Notebook](http://ipython.org/notebook.html) packaged for Heroku.

Data is persisted to S3. Magic!

Usage
-----

### Deploying

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/mietek/instant-ipython)

**Note:**  Building IPython may take up to 15 minutes.  Do not be discouraged by the apparent lack of progress.  If the build times out, try again.


#### Deploying manually

Create a new Heroku app, and build the app:

```
$ git clone https://github.com/mietek/instant-ipython
$ cd instant-ipython
$ heroku create
$ git push heroku master
```

Ensure the app is running on at least one dyno, and view the app:

```
$ heroku ps:scale web=1
$ heroku open
```


### Configuration

#### `IPYTHON_PASSWORD`

Password used to protect the notebook from unauthorised access.

#### `S3_NOTEBOOK_URI`

Location of your S3 notebook bucket e.g. `s3://my-ipython-s3/files/`

#### `AWS_ACCESS_KEY_ID`
#### `AWS_SECRET_ACCESS_KEY`

AWS Credentials as per [this service](http://aws.amazon.com/iam/).

About
-----

Made by [Miëtek Bak](https://mietek.io/).  Published under the [MIT X11 license](https://mietek.io/license/).
