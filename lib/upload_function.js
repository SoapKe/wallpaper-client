// const cloudinary = require('cloudinary');
// const Database = require('../../models/wallpaper');
// const mongoose = require('mongoose')

// module.exports = (filePath,Uid) => {
//     var url
//     // cloudinary config
//     cloudinary.config({ 
//         cloud_name: 'candong', 
//         api_key: 823243289597989, 
//         api_secret: '0F1l-otQXSMbnZrj8OQQRZiEEI0'
//     });
//     cloudinary.uploader.upload(filePath, (result) => {
//       url = result.secure_url
//       let newWallpaper = {_id: new mongoose.Types.ObjectId(), url : url}
//       console.log(newWallpaper)
//       Database.wallpaper.create(newWallpaper, function(err, wallpaper){
//       if(err) console.log(err)
//       else{
//         console.log(wallpaper)
//         console.log("enter")
//         console.log(wallpaper._id.toString())
//         console.log(typeof wallpaper._id.toString())
//         console.log("leave")
//           Database.user.findOneAndUpdate({uid: Uid},
//             {$push: {uploadPics: wallpaper._id.toString()}}, function(err, user){
//               if(err) console.log(err)
//               else {
//                 console.log(user)
//               }
//             });
//       } 
//       })
//     })
// }
