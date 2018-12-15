# Wallpaper-Workshop

This is the course-based project composed of Tianchen Min (tm2977), Ke Xu (ax2144), Can Dong (cd3032) and Jianing Yu (jy2929).

Wallpaper-Workshop is an app on PC. It contains following functions:

1. Create a wallpaper community among users:
    Users can share, collect and search for wallpapers. 
    Users also can upvote wallpapers uploaded by other users.

2. Give convenient operations for users to set wallpapers: 
    Users can hit just one button to set the wallpaper they like.
    This app can automatically change wallpapers according to the frequency and wallpapers users set.

## Get Started
Note: If you are user, just ignore the following lines and jump to "Usage".

If you are a developer and would like to revise code and build the project by yourselves, you need to follow instructions below:
1. Install brew if you don't have it on your mac:
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
2. Install node with version 8.12.0:
https://github.com/nodejs/node/blob/master/doc/changelogs/CHANGELOG_V8.md

3. Install yarn
```
brew install yarn
```


## Usage
As a user:
Double click "Wallpaper-Workshop.exe" and enjoy!

As a developer:

***1. Start your own server:***
```
cd wallpaperServer
npm install
npm run start
```

***2. Build your client***
```
cd wallpaper-client
npm install
yarn build
```

***3. Start your client***

You have two options here:

First: start app without packaging
```
yarn estart
```
Second: start app after packing
```
yarn dist
```
Then you will find "Wallpaper-Workshop" in folder wallpaper-client/dist/mac

***4. Run test***

Run test script:
```yarn test```


# Functionality
***1. Login***

Type your email address and password and click login.

***2. Register***

Type your email address and password and click register.

***3. Search***

Type the key words of wallpapers you want to search in the textbox and click search button

***4. Upvote for other users wallpapers***

Click heart icon below each wallpaper, the number of likes will add one.

***5. Collect the wallpapers you like***

Click the collect button below each wallpaper, the paper will appear in your collection page

***6. Download collected pictures by one click***

Click download button on collection page

***7. Upload wallpapers***

Click 'upload' on the left sidebar and click the upload button and select the pictures you want to upload the the pictures will appear on home page

***8. Set wallpaper by one click***

Click the setting button below the wallpapers and done!

***9. Automatically change wallpapers***

Set frequency and wallpaper folder and done!











