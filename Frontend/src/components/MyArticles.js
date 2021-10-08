import React , {useState , useEffect ,useContext} from 'react'
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
function MyArticles() {
    var user = JSON.parse(localStorage.getItem('user'));
    const { articles, removeArticle } = useContext(GlobalContext);
    const myarticles = articles.filter(article => article.author == user.username)
    return (
            <React.Fragment>
                <div className="row">
                {myarticles.length > 0 ? (
                <>
                {myarticles.map(article=>(
                <div key={article.id} className="col-md-6">
                <div className="card m-4 shadow-sm">
                <div className="card-body">
                    <h3 className="card-title strong pb-3">Article Title : {article.title}</h3>
                    <h6 className="card-subtitle mb-4 text-muted">Article Body : {article.body}</h6>
                    <h6 className="card-text strong">Author : {article.author.toUpperCase()}</h6>
                    <Link to={`/edit/${article.id}`} className="btn btn-primary m-2">Edit</Link>
                    <button onClick={() => removeArticle(article.id)} className="btn btn-danger m-2">Delete</button>
                </div>
                </div>
                </div>
                    ))}
                </>
                ): (
                    <h4 className="text-center">You have not added any articles</h4>
                )}
                </div>
            </React.Fragment>
    )
}

export default MyArticles

