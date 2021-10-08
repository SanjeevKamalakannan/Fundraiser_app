export default (state, action) => {
    switch (action.type) {
      case 'REMOVE_ARTICLE':
        return {
          ...state,
          articles: state.articles.filter(article => {
            return article.id !== action.payload;
          })
        }
      case 'ADD_ARTICLE':
        return {
          ...state,
          articles: [action.payload, ...state.articles]
        }
      case 'EDIT_ARTICLE':
        const updateArticle = action.payload;
  
        const updateArticles = state.articles.map(article => {
          if (article.id === updateArticle.id) {
            return updateArticle;
          }
          return article;
        })
        return {
          ...state,
          articles: updateArticles
        }
  
      default:
        return state;
    }
  }