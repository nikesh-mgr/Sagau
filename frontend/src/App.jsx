import { useEffect } from "react";

import useAuthStore from "./store/authStore";

const App = () => {
  const loadUser = useAuthStore((state) => state.loadUser);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return null;
};

export default App;
