export const PageNotFound = ()=> {
    return(
        <main>
            <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
            <p className="text-xl text-gray-700 mb-4">Oops! The page you're looking for does not exist.</p>
            <a href="/" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Go back to
                homepage</a>
        </main>

    )
}
