/**
 * DEBTS:
 *  - should have only one DeckProvider call.
 */

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { DeckView } from "../views/Deck/DeckView/DeckView";
import { Layout } from "../components/Layout/Layout";
import { DeckProvider } from "../contexts/DeckContext/DeckContext";
import { CreateDeckView } from "../views/Deck/CreateDeckView/CreateDeckView";
import { EditDeckView } from "../views/Deck/EditDeckView/EditDeckView";
import { CreateCardView } from "../views/Card/CreateCardView/CreateCardView";
import { CardContextProvider } from "../contexts/CardContext/CardContext";
import { EditCardView } from "../views/Card/EditCardView/EditCardView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "decks",
        element: <DeckView />,
      },
      {
        path: "decks/create",
        element: <CreateDeckView />,
      },
      {
        path: "decks/:deckId",
        element: <EditDeckView />,
      },
      {
        path: "decks/:deckId/cards/create",
        element: <CreateCardView />,
      },
      {
        path: "decks/:deckId/cards/:cardId",
        element: <EditCardView />,
      },
    ],
  },
]);

export const Router = () => {
  return (
    <DeckProvider>
      <CardContextProvider>
        <RouterProvider {...{ router }} />
      </CardContextProvider>
    </DeckProvider>
  );
};
