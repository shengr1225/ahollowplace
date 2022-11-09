const DEFAULT_WIDTH = 'w-full'

const Modal = (props) => {
  return (
    <div className={'overflow-y-scroll z-50 ' + (props.isOpen ? '' : 'hidden')}>
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-800 opacity-50"></div>
      <div
        className={`flex-row bg-white fixed mx-auto h-auto left-0 -top-0 rounded-lg shadow-lg p-8 max-w-lg ${
          props.width ? 'w-' + props.width : DEFAULT_WIDTH
        }`}
        style={{
          transform: 'translate(calc(50vw - 50%), calc(50vh - 50%))',
        }}
      >
        <div className="absolute right-0 top-0 m-2">
          <button
            onClick={() => {
              props.onClose()
            }}
            className="p-2 font-bold hover:bg-gray-300 w-10 h-10 leading-4 rounded-md transition-colors duration-300"
          >
            x
          </button>
        </div>
        <div className="break-all text-center">
          <div className="text-2xl pb-2 text-gray-700">{props.title}</div>
          <div className="mt-4">{props.children}</div>
        </div>
      </div>
    </div>
  )
}

export default Modal
