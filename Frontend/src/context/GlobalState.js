import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

// Initial State
const initialState = {
  articles: [
      {
          "id" : 1,
          "title" : "sample title",
          "body" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          "author" : "sample author one"
      },
      {
        "id" : 2,
        "title" : "sample title two",
        "body" : "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages ",
        "author" : "sample author two"
      },
      {
        "id" : 3,
        "title" : "sample title three",
        "body" : "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
        "author" : "sample author three"
      },
      {
        "id" : 4,
        "title" : "sample title four",
        "body" : "Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
        "author" : "sample author four"
      },
      {
        "id" : 5,
        "title" : "sample title five",
        "body" : "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. ",
        "author" : "sample author five"
      },
      {
        "id" : 6,
        "title" : "sample title six",
        "body" : "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.",
        "author" : "sample author six"
      },
      {
        "id" : 7,
        "title" : "sample title seven",
        "body" : "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
        "author" : "sample author seven"
      }
  ]
}

// Create Context
export const GlobalContext = createContext(initialState);

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  const removeArticle = (id) => {
    dispatch({
      type: 'REMOVE_ARTICLE',
      payload: id
    })
  }

  const addArticle = (article) => {
    dispatch({
      type: 'ADD_ARTICLE',
      payload: article
    })
  }

  const editArticle = (article) => {
    dispatch({
      type: 'EDIT_ARTICLE',
      payload: article
    })
  }

  return (
    <GlobalContext.Provider value={{
      articles: state.articles,
      addArticle,
      editArticle,
      removeArticle
    }}>
      {children}
    </GlobalContext.Provider>
  )
}