# What is this for?

I needed to build an electron app using localdb ( microsoft sql server ), so that I can use Microsoft SyncFramework to synchronize the data with the main server.

There were some challenges getting things to work together, so I created a repo to "document" my findings and work so that I may revisit them in the future.


# Webpack + Electron + Sequelize + LocalDB = uggggh!!

There are a number of issues that complicates this setup


## 1. Namedpipe Connection ( msnodesqlv8 )

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

2. Install the missing module, Tedious

    If I remeber correctly, tedious was not required when using other dialects when I was not bundling with webpack.

    However, it seems that it cannot be omitted and had to be downloaded anymore.

    I could study sequelize module and figure out what is going on in the background....

    


## 3. Electron + mssqlnodev8

Since mssqlnodev8 is a "native" module, it has to be rebuilt to the version that is compatible with the version of electron we are using.

I have docuemnted how to do this here :


[rebuild msnodesqlv8 for electron](MSNODESQL.md)