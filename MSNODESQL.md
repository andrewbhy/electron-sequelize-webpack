

# Node-Gyp set up

This guide assumes that you are on a windows machine 

Pre-requisites :

1. Python ( 2.7 recommended)
2. C++ ( install via visual studio community 2015 edition or stand alone installer found on node-gyp reference )


NPM config :

tell npm to use 2015 version of C++ libraries
```
    npm config set msvs_version 2015
```

Install node-gyp :

```
    npm install -g node-gyp
```

also, there is a batch file that does this under script folder ( setup-node-gyp.bat )


# building Electron compatible binaries 

msnodesqlv8 already has the build scripts, however they seem to be intended for internal use ( within the scope of the project )

I have re-created the process in a single batch file :


scripts/build-msnodesql.bat
which can be run via npm script


```
    npm run build-msnodesqlv8
```

Script only builds x64 binaries, if you need x86 feel free to customize the script