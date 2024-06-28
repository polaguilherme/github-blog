import { Router } from "./Router";
import { UserInfoProvider } from "./contexts/UserInfosContext";
import { DefaultLayout } from "./layout/DefaultLayout";

function App() {
  return (
    <>
      <UserInfoProvider>
        <DefaultLayout>
          <Router />
        </DefaultLayout>
      </UserInfoProvider>
    </>
  );
}

export default App;
