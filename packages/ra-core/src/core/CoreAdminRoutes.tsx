import * as React from 'react';
import { useState, useEffect, Children, ComponentType } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom'

import { WithPermissions, useCheckAuth } from '../auth'
import { useTimeout } from '../util'
import { useScrollToTop, useCreatePath } from '../routing'
import {
  AdminChildren,
  CatchAllComponent,
  LayoutComponent,
  LoadingComponent,
  CoreLayoutProps,
} from '../types';
import { useConfigureAdminRouterFromChildren } from './useConfigureAdminRouterFromChildren';
