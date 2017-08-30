# CRA Redux, React Router & Redux Thunk

* Tutorial: [Getting started with create-react-app, Redux, React Router & Redux Thunk](https://medium.com/@notrab/getting-started-with-create-react-app-redux-react-router-redux-thunk-d6a19259f71f)
* Example: [View on Heroku](https://cra-redux-router-thunk.herokuapp.com/)

# flow & flow-typed

- install flow-typed globally to generate flow-type definition for node_modules that we include
- > flow-type install to generate stubs, so that flow doesn't complain about missing module definitions


# Webpack + Electron + Sequelize + LocalDB = uggggh!!

There are a number of players that complicates this setup


## 1. Namedpipe ( msnodesqlv8 )

LocalDB can only be referenced by thier name, and a lot of the MSSQL adpaters for node doesn't know how to deal with namedpipes.

There is one module called msnodesqlv8 which is a "driver" module that supports namedpipe connection, which means that our choice of SQL ORM/connection layer is limited by the libraries that are supported by msnodesqlV8.


## 2. Sequelize + Webpack

Using Sequelize itself is not a problem. However, when combined with webpack things get comlicated.

Webpack is a tool for bundling, and it tries to interpret all the dependencies and compile them into a single bundle for efficiency.

The problem is that sequelize has conditional depencies on other database connectino layers ( postgresql, mysql, etc... ).

Since webpack cannot resolve which one of these are needed, it tries to load every one of them and causes problems.

There are 2 things we can do :

1. Add these modules to external ( ignore list )

which can be solved by adding these moduels to "externals" so that webpack doesn't try to process them.

add these to webpack.config ( V2 )
```
    externals:  {
        'pg' : true,
        'pg-hstore' :true,
        'sqlite3' : true,
        'mysql2' : true
    },
```

2. Install the missing module

The Tedious module cannot be omitted and had to be downloaded.

We will see if we can remove the dependency at a later time.


## 3. Electron + mssqlnodev8

Since mssqlnodev8 is a "native" module, it has to be rebuilt to the version that is compatible with the version of electron we are using.

I have docuemnted how to do this here :


[rebuild msnodesqlv8 for electron](MSNODESQL.md)