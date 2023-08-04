import {Routes, Route} from "react-router-dom";
import {PageNotFound, Test} from "../pages"

export const AllRoutes = ()=> {
    return (
        <>
            <Routes>
                <Route path="/test" element={<Test />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>

        </>

    )
}


