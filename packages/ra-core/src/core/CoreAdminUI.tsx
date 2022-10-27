import * as React from 'react';
import { ComponentType, useEffect, isValidElement, createElement } from 'react';
import { Routes, Route } from 'react-router-dom';

// import { CoreAdminRoutes } from './CoreAdminRoutes';
import { Ready } from '../util';
import {
  TitleComponent,
  LoginComponent,
  LayoutComponent,
  CoreLayoutProps,
  AdminChildren,
  CatchAllComponent,
  DashboardComponent,
  LoadingComponent
} from '../types';

export type ChildrenFunction = () => ComponentType[];