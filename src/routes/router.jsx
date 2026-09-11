import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import SignIn from "../pages/forms/SignIn";
import SignUp from "../pages/forms/SignUp";
import CardDetail from "../pages/cards/CardDetail";
import DeckBuilder from "../pages/decks/DeckBuilder";
import DeckDetail from "../pages/decks/DeckDetail";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/form/signin", 
        element: <SignIn />
    },
    {
        path: "/form/signup",
        element: <SignUp />
    },
    {
        path: "/deck",
        element: <DeckBuilder />
    },
    {
        path: "/deck/:id",
        element: <DeckDetail />
    },
    {
        path: "/card/:id",
        element: <CardDetail />
    },
    {
        path: "*",
        element: <NotFound />
    },
]);

export default router;