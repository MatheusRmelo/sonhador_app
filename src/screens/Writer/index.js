import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import {
    Container,
    PoemList,
    CategoryPhoto,
    PoemInfo,
    ButtonAddPoem,
    ButtonAddPoemText
} from './styles';
import SearchHeader from '../../components/SearchHeader';
import Tabs from '../../components/Tabs';
import PoemItem from '../../components/PoemItem';

import { Heading2, Small } from '../../commonStyles';

import { PoemApi } from '../../PoemApi';


export default () => {
    const [tabs, setTabs] = useState([{name:'RASCUNHOS', active: true},{name:'PUBLICADAS', active: false}]);
    const [poem, setPoem] = useState(PoemApi);
    const [search, setSearch] = useState('');

    const navigation = useNavigation();

    const handleActiveTab = (key) => {
        let newList = [...tabs];
        for(let i in newList){
            if(i==key){
                newList[i].active = true;
            }else{
                newList[i].active = false;
            }
        }
        
        setTabs(newList);
    }
    const handleSearch = (t) => {
        setSearch(t);
        if(t===''){
            setPoem(PoemApi);
            return;
        }
        let newList = PoemApi.filter((item,key)=>(item.title===t));
        setPoem(newList);
    }

    return( 
        <Container>
            <SearchHeader input search={search} setSearch={(t)=>handleSearch(t)} placeholder="Pesquisar suas obras...">
                <Tabs tabs={tabs} setActive={(key)=>handleActiveTab(key)} />
            </SearchHeader>
            {
                poem.length > 0 &&
                <PoemList showsVerticalScrollIndicator={false}>
                    {poem.map((item, key)=>(
                        <PoemItem key={key}>
                            <CategoryPhoto />
                            <PoemInfo>
                                <Heading2 color="white">{item.title}</Heading2>
                                <Small color="white">Pages:{item.pages}</Small>
                            </PoemInfo>
                        </PoemItem>
                    ))}
                </PoemList>
            }
            <ButtonAddPoem onPress={()=>navigation.navigate('WriterTitle')}>
                <ButtonAddPoemText>+</ButtonAddPoemText>
            </ButtonAddPoem>
        </Container>
    );
}
