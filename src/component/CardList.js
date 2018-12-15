import { List} from 'antd';
import React from 'react';
import ShowCard from './Card';
// const electron = window.require('electron');
// const ipcRenderer = electron.ipcRenderer;


const CardList = ({pics}) =>{ 
    return (
        <List grid={{ gutter: 8, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 4, }}
        dataSource={pics}
        renderItem={(item,i)=>(
            <List.Item>
                <ShowCard id={i} key = {i} item={item}/>
            </List.Item>
        )}        
        />

/*
        <div>
           {
            pics.map((post,i) => {
                return <ShowCard key={i} item={post}/>
            })
           }
        </div> 
*/
    );
}

export default CardList;