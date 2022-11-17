import * as React from 'react';

import { CoreAdminContext, CoreAdminContextProps } from './CoreAdminContext'
import { CoreAdminUI, CoreAdminUIProps } from './CoreAdminUI'

export const CoreAdmin = (props: CoreAdminProps) => {
  const { 
    authProvider,
    basename,
    catchAll,
    children,
    dashboard,
    dataProvider,
    disableTelemetry,
    history,
    i18nProvider,
    queryClient,
    layout,
    loading,
    loginPage,
    menu,
    ready,
    requireAuth,
    store,
    title = 'React Admin'
  } = props;
  return (
    <CoreAdminContext
      authProvider={authProvider}
      basename={ basename}
      dataProvider={dataProvider}
      i18nProvider={i18nProvider}
      queryClient={queryClient}
      history={history}
      store={store}
    >
      <CoreAdminUI
        layout={layout}
        dashboard={dashboard}
        disableTelemetry={disableTelemetry}
        menu={menu}
        catchAll={catchAll}
        title={title}
        loading={loading}
        loginPage={loginPage}
        requireAuth={requireAuth}
        ready={ready}
      >
        {children}
      </CoreAdminUI>
    </CoreAdminContext>
  )
}

export type CoreAdminProps = CoreAdminContextProps & CoreAdminUIProps