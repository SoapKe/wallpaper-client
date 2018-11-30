import { Card, List} from 'antd';
import React from 'react';
import ShowCard from './Card';
// const electron = window.require('electron');
// const ipcRenderer = electron.ipcRenderer;


const CardList = ({pics}) =>{ 
    return (
        <List grid={{ gutter: 16, column: 2 }}
        dataSource={pics}
        renderItem={(item,i)=>(
            <List.Item>
                <ShowCard key={i} item={item}/>
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