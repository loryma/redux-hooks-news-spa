## SPA built with react with home page, login, profile and news page

Website is deployed at https://redux-hooks.netlify.com/

Login details:
Login: max@test.com
Password: 12345

State in the application is preserved using state container with `redux` npm package

Async actions, such as checking user login details, fetching user profile data and news is done with `redux-thunk`

`axios` is used for network requests

Navigation with `react-router-dom`

News and Profile page are lazy loaded with React's lazy and Suspence

State in functional component is preserved with React's useState hook. Side effects are executed in useEffect hook. useMemo hook is used for memoizing number of articles on news page

Higher order component 'withError' is used for displaying errors
