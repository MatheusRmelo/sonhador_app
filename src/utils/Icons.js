import React from 'react'
import LoveIcon from '../assets/categories/love.svg';
import ScienceFicIcon from '../assets/categories/science_fiction.svg';

import BookIcon from '../assets/categories/book.svg';
import PoemIcon from '../assets/categories/poem.svg';
import CordelIcon from '../assets/categories/cordel.svg';
import UpArrowIcon from '../assets/icons/up-arrow.svg';
import AddIcon from '../assets/icons/plus.svg';
import NewIcon from '../assets/icons/new.svg';
import TrashIcon from '../assets/icons/trash.svg';
import EditIcon from '../assets/icons/edit.svg';
import ShareIcon from '../assets/icons/share.svg';
import AdsIcon from '../assets/icons/ads.svg';
import GalleryIcon from '../assets/icons/gallery.svg';
import CameraIcon from '../assets/icons/camera.svg';
import RightArrowIcon from '../assets/icons/right-arrow.svg';
import LeftArrowIcon from '../assets/icons/left-arrow.svg';

export default useIcons = () => {
    return({
        getIcons: (icon, width = 24, height = 24, color = 'black') => {  
            if(icon ==='love')  
                return <LoveIcon width={width} height={height} fill={color} />
            if(icon ==='science fiction')
                return <ScienceFicIcon width={width} height={height} fill={color} />
            if(icon ==='book')
                return <BookIcon width={width} height={height} fill={color} />
            if(icon ==='poem')
                return <PoemIcon width={width} height={height} fill={color} />
            if(icon ==='cordel')
                return <CordelIcon width={width} height={height} fill={color} />
            if(icon === 'up')
                return <UpArrowIcon width={width} height={height} fill={color} />
            if(icon === 'add')
                return <AddIcon width={width} height={height} fill={color} />
            if(icon === 'new')
                return <NewIcon width={width} height={height} fill={color} />
            if(icon === 'share')
                return <ShareIcon width={width} height={height} fill={color} />
            if(icon === 'edit')
                return <EditIcon width={width} height={height} fill={color} />
            if(icon === 'trash')
                return <TrashIcon width={width} height={height} fill={color} />
            if(icon === 'ads')
                return <AdsIcon width={width} height={height} fill={color} />
            if(icon === 'gallery')
                return <GalleryIcon width={width} height={height} fill={color} />
            if(icon === 'camera')
                return <CameraIcon width={width} height={height} fill={color} />
            if(icon === 'right')
                return <RightArrowIcon width={width} height={height} fill={color} />
            if(icon === 'left')
                return <LeftArrowIcon width={width} height={height} fill={color} />
            return null;
        }
    })
};