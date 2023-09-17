import { XCircleIcon } from '@heroicons/react/20/solid'
export const ErrorAlert = ({error}) => {
  return (
    <div className="rounded-md bg-red-50 m-5 pt-4 pb-3 px-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">Error Occurred!</h3>
          <div className="mt-2 text-sm text-red-700">
            <p>
              {error}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}