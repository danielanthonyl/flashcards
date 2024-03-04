import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Home } from "../views/Home/Home"
import { Layout } from "../components/Layout/Layout"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    }
])

export const Router = () => {
    return <Layout>
<RouterProvider {...{router}}/>
        </Layout>
}
