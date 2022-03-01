Local:            http://localhost:3000
On Your Network:  http://172.20.6.190:3000

npx create-react-app ReactExample

cd ReactExample
  
npm start

npm i redux --save-dev


npm i react-redux --save-dev

 <!-- npm i redux-thunk --save-dev -->
 <!-- Redux does not understand other types of actions other than a plain object. 

If you want to move asynchronous logic from React to Redux and being able to return functions instead of plain objects you have to use a custom middleware.

redux-thunk is a middleware for Redux. With redux-thunk you can return functions from action creators, not only objects. You can do asynchronous work inside your actions and dispatch other actions in response to AJAX calls. -->

npm i redux-saga --save-dev

mkdir -p src/js/sagas

<!-- redux-saga is a Redux middleware for managing side effects. With redux-saga you can have a separate thread in your application for dealing with impure actions: API calls, storage access, and more. -->
Create action getData() type: "DATA_REQUESTED" - with no payload return

From api-saga.js 

    -function* watcherSaga() : take every action named DATA_REQUESTED and for each action spin a worker saga

    -function* workerSaga(): call a function named getData

        +if the function succeeds, then dispatch (put) a new action named DATA_LOADED alongside with a payload

        +if the function errors out, then dispatch (put) a new action named API_ERRORED, alongside with a payload (the error)
    - function getData(): fetch data from the API
    
    NOTE: Worker sagas take the actual action as a parameter:

    function* workerSaga(action) {
        // omit
    }

In reducers, add a function to handle action type "DATA_LOADED" from saga (because action getData() type: "DATA_REQUESTED" does not return any payload)

Refactor our async action and remove the fetch call. From now on our action creator will just dispatch a plain action. 
Open up src/js/actions/index.js and modify getData to return a plain action named DATA_REQUESTED

takeEvery taking every DATA_REQUESTED action passing inside our app and starting some work in response to that action.

A redux saga could live in a single file containing:

    a worker function
    a watcher function

The watcher is a generator function watching for every action we are interested in. In response to that action, the watcher will call a worker saga, which is another generator function for doing the actual API call.


To add a new Component, We need:

Create a new action for it
    ReactExample/src/js/actions/index.js

        export function getData() {
            return function(dispatch) {
                return fetch("https://jsonplaceholder.typicode.com/posts")
                .then(response => response.json())
                .then(json => {
                    dispatch({ type: "DATA_LOADED", payload: json });
                });
            };
        }

Create new component to receive and display the new data for it
    ReactExample/src/js/components/Posts.js
Update/add the new component on App.js
    ReactExample/src/js/components/App.js

        <div>
            <h2>API posts</h2>
            <Post />
        </div>

Add it or its middleware into the store
    ReactExample/src/js/store/index.js

        import { forbiddenWordsMiddleware } from "../middleware";
        import thunk from "redux-thunk";

Add the new action into reducer/dispath
    ReactExample/src/js/reducers/index.js   

        const initialState = {
            articles: [],
            remoteArticles: []   // The new one
        };
        function rootReducer(state = initialState, action) {
            ...
            if (action.type === "DATA_LOADED") {
                return Object.assign({}, state, {
                remoteArticles: state.remoteArticles.concat(action.payload)
                });
            }
            return state;
        }  
        export default rootReducer;

mapStateToProps in the component itself
    export class Post extends Component {
        constructor(props) {
            super(props);
        }
        componentDidMount() {
            this.props.getData();
        }
        //render(){ ...mapping...}
        function mapStateToProps(state) {
        return {
            articles: state.remoteArticles.slice(0, 10)
        };
    }

    export default connect( mapStateToProps, { getData })(Post);

In the project directory, you can run:
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.


### `link`

# https://www.valentinog.com/blog/redux/
# https://github.com/valentinogagliardi/ReactExample/tree/your-first-redux-saga/src


