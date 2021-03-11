import React from 'react';
import { Route, } from 'react-router-dom'
import App from './components/App';
import Main from './components/Main';
import Header from './components/header';
import ViewList from './components/viewList';
import Add from './components/add';
import Update from './components/update';

export default (
	<App>
		<Route path="/" exact component={Main} />
		<Route path="/header" component={Header} />
		<Route path="/viewList" component={ViewList} />
		<Route path="/add" component={Add} />
		<Route path="/update" component={Update} />
	</App>
);