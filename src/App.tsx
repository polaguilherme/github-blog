import { Router } from "./Router";
import { UserInfoProvider } from "./contexts/UserInfosContext";

function App() {
  return (
    <>
      <UserInfoProvider>
        <Router />
      </UserInfoProvider>
    </>
  );
}

export default App;
