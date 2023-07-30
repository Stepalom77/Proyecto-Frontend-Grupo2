import React, {useState, createContext} from 'react';

export const MyContext = createContext();

const MyProvider = (props) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [ isLogin, setIsLogin] = useState(false);
    
    return (
      <MyContext.Provider value={{ currentUser, setCurrentUser, isLogin, setIsLogin }}>
        {props.children}
      </MyContext.Provider>
    );
  };

  export default MyProvider;
  