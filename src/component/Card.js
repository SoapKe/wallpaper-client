import { Card, Icon } from 'antd';
import React from 'react';
import axios from 'axios';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

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

    handleLike(wid){
        axios({
            url: 'http://35.243.234.68:8000/addLike',
            method: 'post',
            data: {
                wid:  wid
            },
            transformRequest: [function (data) {
                // Do whatever you want to transform the data
                let ret = ''
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }],
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(response => {
                console.log("success");
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleCollect(wid){
        axios({
            url: 'http://35.243.234.68:8000/addCollect',
            method: 'post',
            data: {
                wid:  wid
            },
            transformRequest: [function (data) {
                // Do whatever you want to transform the data
                let ret = ''
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }],
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(response => {
                console.log("success");
            })
            .catch(error => {
                console.log(error);
            });
    }



    // download = (url) => {
    //     const tempFileName = `temp${Date.now()}.jpg`;
    //     const tempFilePath = path.join(tempDir, tempFileName);
    //     const writeFileTo = fs.createWriteStream(tempFilePath);
    //     const getImageFile = request.get(url);

    //     getImageFile.pipe(writeFileTo);

    // theme="twoTone" twoToneColor={this.state.color} onClick={()=>{this.onChangeColor(this.state.color)}}


    render(){
        const { item } = this.props;
        const { id } = this.props;
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

        return (
            <div id = {"pic_"+id} name = {wid}>
                <Card
                    style={{ width: 300 }}
                    cover={<img alt="example" src={picUrl} width="300" height="180" />}
                    actions={
                        [   <Icon type="heart" id = {"like_"+ id} onClick={()=>this.handleLike(wid)}/>,
                            <Icon type="folder-add" id = {"collect_"+ id} onClick={()=>this.handleCollect(wid)}/>,
                            <Icon type="setting" onClick={() => {ipcRenderer.send("download-image", picUrl)}}/>
                        ]
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