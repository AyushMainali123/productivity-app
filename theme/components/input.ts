import { ComponentStyleConfig } from '@chakra-ui/react'

const InputStyle: ComponentStyleConfig = {
  // style object for base or default style
    baseStyle: {},
      // styles for different sizes ("sm", "md", "lg")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {
      outline: {
          field: {                
              background: "black.secondary"
            }
        }
  },
  // default values for 'size', 'variant' and 'colorScheme'
  defaultProps: {
    size: 'md',
    variant: 'outline',
    colorScheme: '',
  },
}

export default InputStyle