import styled from 'styled-components'

const Overlay = styled.View`
    position: absolute;
    width: 100%; /* Full width (cover the whole page) */
    height: 100%; /* Full height (cover the whole page) */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.3); /* Black background with opacity */
    z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
    justify-content: space-around;
`

export default Overlay