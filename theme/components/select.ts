import { ComponentStyleConfig } from '@chakra-ui/react'

const SelectStyle: ComponentStyleConfig = {
  // style object for base or default style
    baseStyle: {},
      // styles for different sizes ("sm", "md", "lg")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {
      filled: {
          field: {                
              background: "black.secondary",
              minW: "200px"
            }
        }
  },
  // default values for 'size', 'variant' and 'colorScheme'
  defaultProps: {
    size: 'md',
    variant: 'filled',
    colorScheme: '',
  },
}

export default SelectStyle