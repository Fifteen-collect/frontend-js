import React, {useMemo} from "react";
import {Link, useLocation} from "react-router-dom";
import useRoute from "Hooks/App/useRoute";
import clsx from "clsx";

const styles = {
  container: {
    wrapper: 'container-fluid',
    list: clsx(
      'row',
      'text-primary',
      'shadow-top'
    ),
    col: clsx(
      'col-4',
      'd-flex',
      'pt-2',
      'pb-2',
      'justify-content-center',
      'border-top'
    )
  },
  nav: {
    list: clsx(
      'nav',
      'd-flex',
      'shadow-top',
    ),
    item: clsx(
      'flex-fill',
      'nav-item',
      'd-flex',
      'justify-content-center',
      'border-top'
    ),
    link: 'nav-link',
  },
  border: {
    color: {
      white: 'border-white',
      primary: 'border-primary',
    }
  },
  svg: {
    width: {
      default: '2rem',
      big: '2.5rem',
    }
  }
}

export default () => {
  const location = useLocation();
  const route = useRoute();
  const positions = [1, 2, 0];

  const bars = [
    <Link to={route.settings.path} key={0} className={clsx(
      styles.container.col,
      location.pathname === route.settings.path ? styles.border.color.primary : styles.border.color.white
    )}>
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="cog"
        className="svg-inline--fa fa-cog fa-w-16"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        style={{
          pointerEvents: "none",
          width: styles.svg.width.default,
        }}
      >
        <path
          fill="currentColor"
          d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"
        />
      </svg>
    </Link>,
    <Link to={route.game.path} key={1} className={clsx(
      styles.container.col,
      location.pathname === route.game.path ? styles.border.color.primary : styles.border.color.white
    )}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="gamepad"
        className="svg-inline--fa fa-gamepad fa-w-20"
        role="img"
        viewBox="0 0 640 512"
        style={{
          pointerEvents: "none",
          width: styles.svg.width.big,
        }}
      >
        <path
          fill="currentColor"
          d="M480.07 96H160a160 160 0 1 0 114.24 272h91.52A160 160 0 1 0 480.07 96zM248 268a12 12 0 0 1-12 12h-52v52a12 12 0 0 1-12 12h-24a12 12 0 0 1-12-12v-52H84a12 12 0 0 1-12-12v-24a12 12 0 0 1 12-12h52v-52a12 12 0 0 1 12-12h24a12 12 0 0 1 12 12v52h52a12 12 0 0 1 12 12zm216 76a40 40 0 1 1 40-40 40 40 0 0 1-40 40zm64-96a40 40 0 1 1 40-40 40 40 0 0 1-40 40z"
        />
      </svg>
    </Link>,
    <Link to={route.statistic.path} key={2} className={clsx(
      styles.container.col,
      location.pathname === route.statistic.path ? styles.border.color.primary : styles.border.color.white
    )}>
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="far"
        data-icon="star"
        className="svg-inline--fa fa-star fa-w-18"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
        style={{
          pointerEvents: "none",
          width: styles.svg.width.default,
        }}
      >
        <path
          fill="currentColor"
          d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"
        />
      </svg>
    </Link>];

  return useMemo(() => <div className={styles.container.wrapper}>
    <div className={styles.container.list}>
      {positions.map(i => bars[i])}
    </div>
  </div>, [location])
}
