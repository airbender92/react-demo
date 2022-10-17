import { useCallback, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Path } from 'react-router-dom';
import { useQueryClient } from 'react-query';

import useAuthProvider, { defaultAuthParams } from './useAuthProvider';
// import { useResetStore } from '../store';
