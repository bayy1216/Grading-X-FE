import './App.css'
import Router from "./pages/Router.tsx";
import RQProvider from "./components/common/RQProvider.tsx";

function App() {

  return (
    <>
      <RQProvider>
        <Router />
      </RQProvider>
    </>
  )
}

export default App
