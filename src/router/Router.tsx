import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Deck } from "../views/Deck/Deck";
import { Layout } from "../components/Layout/Layout";
import { DeckProvider } from "../contexts/DeckContext/DeckContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <DeckProvider>
        <Deck />
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
