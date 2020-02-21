import _get from 'lodash/get';

import { breakpoints } from 'style/theme';
import WrapPage from './wrap-page';

export const wrapPageElement = WrapPage;

export const shouldUpdateScroll = ({ routerProps }) => {
  const { origin, enableModal } = _get(routerProps, 'location.state') || {};
  const canHaveModal =
    typeof window !== 'undefined' &&
    window.innerWidth >= breakpoints.md;
  return !((enableModal || origin === 'modal') && canHaveModal);
};

export const onInitialClientRender = () => {
  window.___HMS_INITIAL_RENDER_COMPLETE = true;
};
