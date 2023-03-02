export const LoadOverlay = () => {
    //loading indicator to cover entire screen
    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black/75 bg-opacity-50 z-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-500"></div>
        </div>
    )
}