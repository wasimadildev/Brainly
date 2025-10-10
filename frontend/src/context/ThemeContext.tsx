import { createContext , useContext} from "react";

const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {} });

export const useTheme = () => useContext(ThemeContext);