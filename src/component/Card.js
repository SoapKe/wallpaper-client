import { Card, Icon } from 'antd';
import React from 'react';

// const electron = window.require('electron');
// const ipcRenderer = electron.ipcRenderer;
// const download = require('../lib/download')

/*
<Meta
    title="random"
    description="test"
/>
*/
const { Meta } = Card;

export default class ShowCard extends React.Component{ 
    constructor(props){
        super(props);
        this.state={
            color:"#000000"
        }
        //this.color = "#eb2f96";
    }
    
    onChangeColor(color){
        if(color === "#000000") {
            this.setState({
                color:"#eb2f96"
            })           
        } else {
            this.setState({
                color:"#000000"
            })
        }

        console.log("rrrr");
    }

    // download = (url) => {
    //     const tempFileName = `temp${Date.now()}.jpg`;
    //     const tempFilePath = path.join(tempDir, tempFileName);
    //     const writeFileTo = fs.createWriteStream(tempFilePath);
    //     const getImageFile = request.get(url);
    
    //     getImageFile.pipe(writeFileTo);

    //theme="twoTone" twoToneColor={this.state.color} onClick={()=>{this.onChangeColor(this.state.color)}}
        
    // }
    render(){
        const { item } = this.props;
        console.log("item"+item)
        var picUrl;
        var numLikes;
        var author = "Jianing";
        var numCollects;
        var wid;
        if (item.hasOwnProperty("_doc")){
            picUrl = item._doc.url;
            numLikes = item._doc.likes;
            numCollects = item._doc.collects;
            wid = item._doc._id
        } else if (item.hasOwnProperty("urls")){
            picUrl = item.urls.full;
        } else if(item.hasOwnProperty("url")){
            picUrl = item.url;
            numLikes = item.likes;
            numCollects = item.collects;
            wid = item._id
        } 
        console.log("hello"+picUrl)
        
        return (
            <div>
            <Card
                style={{ width: 300 }}
                cover={<img alt="example" src={picUrl} widht="300" height="180" />}
                actions={
                [<Icon type="heart" />,
                <Icon type="folder-add" />,
                <Icon type="setting"/>]
            }
            >
            <Meta
                title={"Author:  "+author}
                description={numLikes+"  Likes     "+numCollects+"  Collects"}
            />
            </Card>

            </div>
        );
    }
}