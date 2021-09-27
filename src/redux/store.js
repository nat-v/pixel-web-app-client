import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { Auth } from './reducers/authReducer';
import { Errors } from './reducers/errorReducer';
import { Editor } from './reducers/editorReducer';
import { Image } from './reducers/imageReducer';
import { Gallery } from './reducers/galleryReducer';
import { Post } from './reducers/postReducer';
import { Profile } from './reducers/profileReducer';
import { Category } from './reducers/categoryReducer';
import { Comment } from './reducers/commentReducer';
import { User } from './reducers/userReducer';

const middleWare = [thunk, logger];

const store = createStore(
    combineReducers({
        errors: Errors,
        auth: Auth,
        editor: Editor,
        image: Image,
        gallery: Gallery,
        post: Post,
        profile: Profile,
        category: Category,
        comment: Comment,
        user: User
    }), compose(
        applyMiddleware(...middleWare),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ));

export default store;