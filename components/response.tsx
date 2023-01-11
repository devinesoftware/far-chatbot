export interface ResponseProps {
    response: string
}

export default function Response(props: ResponseProps) {
    return (
        <>
         <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-4">
            <p className="mt-4 text-center text-sm">{props.response}</p>
            </div>
        </div>
        </>
    )
}