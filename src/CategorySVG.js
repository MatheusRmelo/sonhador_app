import React from 'react'
import LoveIcon from './assets/categories/love.svg';
import ScienceFicIcon from './assets/categories/science_fiction.svg';

import BookIcon from './assets/categories/book.svg';
import PoemIcon from './assets/categories/poem.svg';
import CordelIcon from './assets/categories/cordel.svg';


export const useCategory = () => {
    return({
        getCategory: (category, width, height, color) => {  
            if(category==='love')  
                return <LoveIcon width={width} height={height} fill={color} />
            if(category==='science fiction')
                return <ScienceFicIcon width={width} height={height} fill={color} />
            if(category==='book')
                return <BookIcon width={width} height={height} fill={color} />
            if(category==='poem')
                return <PoemIcon width={width} height={height} fill={color} />
            if(category==='cordel')
                return <CordelIcon width={width} height={height} fill={color} />
        }
    })
};