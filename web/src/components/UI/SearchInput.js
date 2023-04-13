import { HStack, Input, Heading, VStack, Box, Button } from '@chakra-ui/react'

const SearchInput = (props) => {
  return (
    <Box py="4" px="6">
      <VStack alignItems="start" justifyContent="flex-start">
        <Heading fontSize="lg" color="gray.600">
          {props.name}
        </Heading>

        {props.multi && props.multi > 1 ? (
          <HStack>
            {Array.from(Array(parseInt(props.multi)), (_, i) => (
              <Input
                variant="unstyled"
                key={i}
                name={props.label.split('|')[i]}
                ref={props.refs[i]}
                placeholder={props.placeholder.split('|')[i]}
                defaultValue={props.defaultValues?.split('|')[i]}
                onClick={props.onClick}
                maxW="10"
                color={props.textColor}
                _placeholder={{ color: 'gray.400' }}
              />
            ))}
          </HStack>
        ) : (
          <HStack key={props.defaultValue}>
            <Input
              variant="unstyled"
              id={props.label}
              name={props.label}
              type={props.type}
              placeholder={props.placeholder}
              defaultValue={props.defaultValue}
              ref={props.inputRef}
              onChange={props?.onSearch}
              onClick={props.onClick}
              color={props.textColor}
              _placeholder={{ color: 'gray.400' }}
            />
            {props.label == 'time' && (
              <Button
                color={props.textColor}
                display={props.isOpen ? 'block' : 'none'}
                variant="link"
                onClick={props.onClose}
              >
                x
              </Button>
            )}
          </HStack>
        )}
      </VStack>
    </Box>
  )
}

export default SearchInput
