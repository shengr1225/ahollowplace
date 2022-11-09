const SearchInput = (props) => {
  return (
    <label
      name={props.label}
      htmlFor={props.label}
      className={`px-4 lg:px-12 py-4 cursor-pointer text-sm text-gray-600 ${props.className}`}
      onClick={props.onClick}
    >
      <div>
        <div className="font-bold">{props.name}</div>
        {props.multi && props.multi > 1 ? (
          Array.from(Array(parseInt(props.multi)), (_, i) => (
            <input
              key={i}
              name={props.label.split('|')[i]}
              ref={props.refs[i]}
              className={
                'w-1' +
                props.multi +
                ' text-black outline-none border-none bg-transparent placeholder:text-gray-600'
              }
              placeholder={props.placeholder.split('|')[i]}
              defaultValue={props.defaultValues?.split('|')[i]}
            />
          ))
        ) : (
          <div key={props.defaultValue}>
            <input
              id={props.label}
              name={props.label}
              type={props.type}
              className="block outline-none text-black bg-transparent text-md border-none placeholder:text-gray-600"
              placeholder={props.placeholder}
              defaultValue={props.defaultValue}
              ref={props.inputRef}
              onChange={props?.onSearch}
            />
          </div>
        )}
      </div>
    </label>
  )
}

export default SearchInput
