import { LoadingSpinner } from '~/components'

export default function Loading() {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <LoadingSpinner/>
        </div>
    )
}
