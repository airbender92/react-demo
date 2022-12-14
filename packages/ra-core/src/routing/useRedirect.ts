import { useCallback } from "react";
import { useNavigate, To } from "react-router-dom";
import { parsePath} from 'history'

import {Identifier, RaRecord }from '../types'
import { useBasename } from "./useBasename";
import { useCreatePath } from "./useCreatePath";

type RedirectToFunction = (
  resource?: string,
  id?: Identifier,
  data?: Partial<RaRecord>,
  state?: object
) => To;

export type RedirectionSideEffect = string | false | RedirectToFunction;

export const useRedirect = () => {
  const navigate = useNavigate();
  const basename = useBasename();
  const createPath = useCreatePath();

  return useCallback((
    redirectTo: RedirectionSideEffect,
    resource: string = '',
    id?: Identifier,
    data?: Partial<RaRecord>,
    state: object = {}
  ) => {
    if (!redirectTo) {
      return;
    } else if (typeof redirectTo === 'function') {
      const target: To = redirectTo(resource, id, data);
      const absoluteTarget =
        typeof target === 'string'
          ? `${basename}/${target}`
          : {
            pathname: `${basename}/${target.pathname}`,
            ...target,
          };
      navigate(
        typeof absoluteTarget === 'string'
          ? parsePath(absoluteTarget)
          : absoluteTarget,
        {
          state: { _scrollToTop: true, ...state },
        }
      );
      return;
    } else if (
      typeof redirectTo === 'string' &&
      redirectTo.startsWith('http') && window
    ) {
      // redirection to an absolute url
      // history doesn't handle that case, so we handle it by hand
      window.location.href = redirectTo;
      return;
    } else {
      // redirection to an internal link
      navigate(createPath({ resource, id, type: redirectTo }), {
        state: { _scrollToTop: true, ...state },
      });
      return;
    }
  }, [navigate, basename, createPath])
}