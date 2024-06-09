import {BrowserRouter, Routes, Route} from "react-router-dom";
import Homepage from "./pages/Hompage";
import SinglePost from "./pages/SinglePost";
import CreatePost from "./pages/CreatePost";
import CreateAuthor from "./pages/CreateAuthor";
import Authors from "./pages/Authors";
import AuthorPosts from "./pages/AuthorPosts";
import Login from "./pages/Login";
import Page404 from "./pages/404";
import ProtectedRoutes from "./middlewares/ProtectedRoutes";
import UserProfile from "./pages/UserProfile";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index path="/" element={<Homepage/>}/>
                <Route path="/post/:id" element={<SinglePost />}/>
                <Route path="/authors" element={<Authors />}/>
                <Route path="/create" element={<CreatePost/>}/>
                <Route path="/become-author" element={<CreateAuthor />}/>
                <Route path="/posts/:id" element={<AuthorPosts />}/>
                <Route path="/login" element={<Login />}/>
                <Route element={<ProtectedRoutes />}>
                    <Route path={'/me'} element={<UserProfile />}/>
                </Route>
                <Route path="*" element={<Page404 /> }/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
