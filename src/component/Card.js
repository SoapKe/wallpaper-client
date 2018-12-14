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
            color1:"#000000",
            color2:"#000000"
        }
        //this.color = "#eb2f96";
    }


    handleLike(wid){
        var action
        if(this.state.color1 === "#000000") {
            this.setState({
                color1:"#eb2f96"
            })
            action = 1
        } else if(this.state.color1 === "#eb2f96"){
            this.setState({
                color1:"#000000"
            })
            action = -1
            console.log("wojianle!!!"+action)
        } else{
            return
        }
        axios({
            url: 'http://localhost:8000/addLike',
            method: 'post',
            data: {
                wid:  wid,
                action: action 
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
        var action
        if(this.state.color2 === "#000000") {
            this.setState({
                color2:"#eb2f96"
            })
            action = 1
        } else if(this.state.color2 === "#eb2f96") {
            this.setState({
                color2:"#000000"
            })
            action = -1
            console.log("wojianle!!!"+action)
        } else{
            return
        }
        axios({
            url: 'http://localhost:8000/addCollect',
            method: 'post',
            data: {
                wid:  wid,
                action: action
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


    componentDidMount(){
        const { item } = this.props;
        if (item.hasOwnProperty("urls")){
            this.setState({
                color1:"#ffffff",
                color2:"#ffffff"
            })
        } else if(item.hasOwnProperty("url")){
            if(item.isLiked === true){
                this.setState({
                    color1:"#eb2f96"
                })
            } else{
                this.setState({
                    color1:"#000000"
                })
            }
            if(item.isCollected === true){
                this.setState({
                    color2:"#eb2f96"
                })
            } else{
                this.setState({
                    color2:"#000000"
                })
            }
        }

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
        var isLiked;
        
       if (item.hasOwnProperty("urls")){
            picUrl = item.urls.full;
        } else if(item.hasOwnProperty("url")){
            picUrl = item.url;
            numLikes = item.likes;
            numCollects = item.collects;
            wid = item._id;
        }

        return (
            <div id = {"pic_"+id} name = {wid}>
                <Card
                    style={{ width: 300 }}
                    cover={<img alt="example" src={picUrl} widht="300" height="180" />}
                    actions={
                        [<Icon type="heart" id = {"like_"+ id} theme="twoTone" twoToneColor={this.state.color1} onClick={()=>{this.handleLike(wid)}}/>,
                            <Icon type="folder-add" id = {"collect_"+ id} theme="twoTone" twoToneColor={this.state.color2} onClick={()=>this.handleCollect(wid)}/>,
                            <Icon type="setting" theme="twoTone" twoToneColor="#000000" onClick={() => {ipcRenderer.send("download-image", picUrl)}}/>]
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