import React from 'react';
import {
    Container,
    Header,
    FilterButton,
    Logo,
    DirectButton
} from './styles';

import FilterIcon from '../../assets/icons/filter.svg';
import DirectIcon from '../../assets/icons/direct.svg';

export default () => {
    return( 
        <Container>
            <Header>
                <FilterButton>
                    <FilterIcon width="32" height="32" fill="white" />
                </FilterButton>
                <Logo>SONHADOR</Logo>
                <DirectButton>
                    <DirectIcon width="32" height="32" fill="white" />
                </DirectButton>
            </Header>
        </Container>
    );
}
