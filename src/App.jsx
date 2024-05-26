// import React from "react";
// import Header from "./Header";
// import Card from "./Card";

// const App = () => {
//   return (
//     <div>
//       <Header />
//       <Card />
//     </div>
//   );
// };

// export default App;

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./Header";
import Card from "./Card";

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/page/:page" element={<Card />} />
          <Route path="/" element={<Navigate to="/page/1" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
