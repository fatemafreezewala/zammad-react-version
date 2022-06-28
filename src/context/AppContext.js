import * as React from 'react';

const AppContext = React.createContext();

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'SAVE_USER':
      return {
        ...prevState,
        user: action.payload,
      };
      case 'SAVE_IFPROFCOMP':
        return {
          ...prevState,
          ifprofcomp: action.payload,
        };
    case 'SAVE_COUNTRIES':
      return {
        ...prevState,
        countries: action.payload,
      };
    case 'SET_CHOSEN_COUNTRY':
      return {
        ...prevState,
        chosenCountry: action.payload,
      };
    case 'SET_CHOSEN_CITY':
      return {
        ...prevState,
        chosenCity: action.payload,
      };
    case 'SET_LANGUAGE':
    return {
      ...prevState,
      lang: action.payload,
    };
    default: {
      return state;
    }
  }
};

const defaultState = {
  user: {},
  countries: [],
  chosenCountry: {},
  chosenCity: {},
  lang:'french',
  ifprofcomp:"0"
};
 
const AppProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(reducer, defaultState);

  const appContext = {
    ...state,
    saveUser: user => {
      dispatch({type: 'SAVE_USER', payload: user});
    },
    saveCountries: countries => {
      dispatch({type: 'SAVE_COUNTRIES', payload: countries});
    },
    setCountry: country => {
      dispatch({type: 'SET_CHOSEN_COUNTRY', payload: country});
    },
    setChosenCity: city => {
      dispatch({type: 'SET_CHOSEN_CITY', payload: city});
    },
    setLanguage: lang => {
      dispatch({type: 'SET_LANGUAGE', payload: lang});
    },
    setIfProfComp:ifprofcomp =>{
      dispatch({type:'SAVE_IFPROFCOMP',payload:ifprofcomp})
    }
  };

  return (
    <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
  );
};

export {AppContext as default, AppProvider};
