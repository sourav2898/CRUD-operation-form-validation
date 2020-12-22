import React from 'react';
import Add_Job from './Add_Job';
import { Provider } from 'react-redux';
import store from './store';
import Jobs from './Jobs';

const App = () => {

  return (
    <Provider store={store}>
      <div className="contianer">
        <Add_Job />
        <Jobs />
      </div>
    </Provider>
  )
}

export default App;
