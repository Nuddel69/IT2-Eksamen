import react from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";

import "bulma/css/bulma.min.css";

import Questions from "./components/questions.jsx";

const root = createRoot(document.getElementById("root"));

root.render(<Questions />);
