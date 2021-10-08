import React , {useState , useEffect ,useContext} from 'react'
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import ViewArticle from './ViewArticle';
function Articles() {
    const { articles, removeArticle } = useContext(GlobalContext);
    return (
            <React.Fragment>
                <div className="row">
                {articles.length > 0 ? (
                <>
                {articles.map(article=>(
                <ViewArticle key={article.id} title={article.title} body={article.body} author={article.author} ></ViewArticle>
                    ))}
                </>
                ): (
                    <h4 className="text-center">No Articles</h4>
                )}
                </div>
            </React.Fragment>
    )
}

export default Articles

