import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { DeckView} from "../views/DeckView/DeckView";
import { Layout } from "../components/Layout/Layout";
import { DeckProvider } from "../contexts/DeckContext/DeckContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <DeckProvider>
        <DeckView />
      </DeckProvider>
    ),
  },
]);

export const Router = () => {
  return (
    <Layout>
      <RouterProvider {...{ router }} />
    </Layout>
  );
};
