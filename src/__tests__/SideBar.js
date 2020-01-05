import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';

import SideBar from '../components/SideBar';
// import NewJob from '../components/dialogs/NewJob';

// it('NewJob Dialog Snapshot', () => {
//     const newJob = renderer.create(
//         <MemoryRouter>
//             <SideBar />
//         </MemoryRouter>
//     );
//     expect(newJob).toMatchSnapshot();
// });

// test('SideBar matches snapshot', () => {
//     let div = document.createElement('div');
//     ReactDOM.render(
//         <MemoryRouter>
//             <SideBar />
//         </MemoryRouter>,
//         div
//     );
//     console.log(div.innerHTML);
// });

test('SideBar matches snapshot 2', () => {
	const {container} = render(
		<MemoryRouter>
			<SideBar />
		</MemoryRouter>,
	);
	expect(container).toMatchInlineSnapshot(`
		<div>
		  <div
		    class="MuiDrawer-root MuiDrawer-docked makeStyles-root-1 makeStyles-root-7"
		  >
		    <div
		      class="MuiPaper-root MuiPaper-elevation0 makeStyles-container-2 makeStyles-container-8"
		      style="width: inherit; position: static; color: white;"
		    >
		      <ul
		        class="MuiList-root MuiList-padding"
		      >
		        <div
		          aria-disabled="false"
		          class="MuiButtonBase-root MuiListItem-root makeStyles-item-4 MuiListItem-gutters MuiListItem-button"
		          role="button"
		          tabindex="0"
		          title="We Got This!!"
		          to=""
		        >
		          <div
		            class="MuiListItemIcon-root makeStyles-itemIconContainer-5"
		          >
		            <svg
		              aria-hidden="true"
		              class="MuiSvgIcon-root"
		              focusable="false"
		              role="presentation"
		              viewBox="0 0 24 24"
		            >
		              <path
		                d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
		              />
		            </svg>
		          </div>
		          <div
		            class="MuiListItemText-root makeStyles-itemText-6 makeStyles-itemText-57"
		          >
		            <span
		              class="MuiTypography-root MuiListItemText-primary MuiTypography-body1"
		            >
		              We Got This!!
		            </span>
		          </div>
		          <span
		            class="MuiTouchRipple-root"
		          />
		        </div>
		      </ul>
		      <ul
		        class="MuiList-root makeStyles-mainItems-3 makeStyles-mainItems-9 MuiList-padding"
		      >
		        <a
		          aria-current="page"
		          aria-disabled="false"
		          class="MuiButtonBase-root MuiListItem-root makeStyles-item-4 MuiListItem-gutters MuiListItem-button active"
		          href="/"
		          role="button"
		          tabindex="0"
		          title="Schedule"
		        >
		          <div
		            class="MuiListItemIcon-root makeStyles-itemIconContainer-5"
		          >
		            <svg
		              aria-hidden="true"
		              class="MuiSvgIcon-root"
		              focusable="false"
		              role="presentation"
		              viewBox="0 0 24 24"
		            >
		              <path
		                d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"
		              />
		            </svg>
		          </div>
		          <div
		            class="MuiListItemText-root makeStyles-itemText-6 makeStyles-itemText-130"
		          >
		            <span
		              class="MuiTypography-root MuiListItemText-primary MuiTypography-body1"
		            >
		              Schedule
		            </span>
		          </div>
		          <span
		            class="MuiTouchRipple-root"
		          />
		        </a>
		        <a
		          aria-disabled="false"
		          class="MuiButtonBase-root MuiListItem-root makeStyles-item-4 MuiListItem-gutters MuiListItem-button"
		          href="/customers"
		          role="button"
		          tabindex="0"
		          title="Customers"
		        >
		          <div
		            class="MuiListItemIcon-root makeStyles-itemIconContainer-5"
		          >
		            <svg
		              aria-hidden="true"
		              class="MuiSvgIcon-root"
		              focusable="false"
		              role="presentation"
		              viewBox="0 0 24 24"
		            >
		              <path
		                d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"
		              />
		            </svg>
		          </div>
		          <div
		            class="MuiListItemText-root makeStyles-itemText-6 makeStyles-itemText-134"
		          >
		            <span
		              class="MuiTypography-root MuiListItemText-primary MuiTypography-body1"
		            >
		              Customers
		            </span>
		          </div>
		          <span
		            class="MuiTouchRipple-root"
		          />
		        </a>
		        <a
		          aria-disabled="false"
		          class="MuiButtonBase-root MuiListItem-root makeStyles-item-4 MuiListItem-gutters MuiListItem-button"
		          href="/techs"
		          role="button"
		          tabindex="0"
		          title="Teams"
		        >
		          <div
		            class="MuiListItemIcon-root makeStyles-itemIconContainer-5"
		          >
		            <svg
		              aria-hidden="true"
		              class="MuiSvgIcon-root"
		              focusable="false"
		              role="presentation"
		              viewBox="0 0 24 24"
		            >
		              <path
		                d=""
		                fill="none"
		              />
		              <path
		                d="M20 0H4v2h16V0zM4 24h16v-2H4v2zM20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 2.75c1.24 0 2.25 1.01 2.25 2.25s-1.01 2.25-2.25 2.25S9.75 10.24 9.75 9 10.76 6.75 12 6.75zM17 17H7v-1.5c0-1.67 3.33-2.5 5-2.5s5 .83 5 2.5V17z"
		              />
		            </svg>
		          </div>
		          <div
		            class="MuiListItemText-root makeStyles-itemText-6 makeStyles-itemText-138"
		          >
		            <span
		              class="MuiTypography-root MuiListItemText-primary MuiTypography-body1"
		            >
		              Teams
		            </span>
		          </div>
		          <span
		            class="MuiTouchRipple-root"
		          />
		        </a>
		      </ul>
		      <ul
		        class="MuiList-root MuiList-padding"
		      >
		        <a
		          aria-disabled="false"
		          class="MuiButtonBase-root MuiListItem-root makeStyles-item-4 MuiListItem-gutters MuiListItem-button"
		          href="/profile"
		          role="button"
		          tabindex="0"
		          title="Settings"
		        >
		          <div
		            class="MuiListItemIcon-root makeStyles-itemIconContainer-5"
		          >
		            <svg
		              aria-hidden="true"
		              class="MuiSvgIcon-root"
		              focusable="false"
		              role="presentation"
		              viewBox="0 0 24 24"
		            >
		              <path
		                d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm7-7H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-1.75 9c0 .23-.02.46-.05.68l1.48 1.16c.13.11.17.3.08.45l-1.4 2.42c-.09.15-.27.21-.43.15l-1.74-.7c-.36.28-.76.51-1.18.69l-.26 1.85c-.03.17-.18.3-.35.3h-2.8c-.17 0-.32-.13-.35-.29l-.26-1.85c-.43-.18-.82-.41-1.18-.69l-1.74.7c-.16.06-.34 0-.43-.15l-1.4-2.42c-.09-.15-.05-.34.08-.45l1.48-1.16c-.03-.23-.05-.46-.05-.69 0-.23.02-.46.05-.68l-1.48-1.16c-.13-.11-.17-.3-.08-.45l1.4-2.42c.09-.15.27-.21.43-.15l1.74.7c.36-.28.76-.51 1.18-.69l.26-1.85c.03-.17.18-.3.35-.3h2.8c.17 0 .32.13.35.29l.26 1.85c.43.18.82.41 1.18.69l1.74-.7c.16-.06.34 0 .43.15l1.4 2.42c.09.15.05.34-.08.45l-1.48 1.16c.03.23.05.46.05.69z"
		              />
		            </svg>
		          </div>
		          <div
		            class="MuiListItemText-root makeStyles-itemText-6 makeStyles-itemText-142"
		          >
		            <span
		              class="MuiTypography-root MuiListItemText-primary MuiTypography-body1"
		            >
		              Settings
		            </span>
		          </div>
		          <span
		            class="MuiTouchRipple-root"
		          />
		        </a>
		      </ul>
		    </div>
		  </div>
		</div>
	`);
});
