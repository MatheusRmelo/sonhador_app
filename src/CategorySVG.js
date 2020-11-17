import React from 'react'
import LoveIcon from './assets/categories/love.svg';
import ScienceFicIcon from './assets/categories/science_fiction.svg';

export const useCategory = () => {
    return({
        getCategory: (category, width, height, color) => {  
            if(category==='love')  
                return <LoveIcon width={width} height={height} fill={color} />
            if(category==='science fiction')
                return <ScienceFicIcon width={width} height={height} fill={color} />
        }
    })
};