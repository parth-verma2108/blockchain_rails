import React, { useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import Popover from "@material-ui/core/Popover";
import { Transition } from "@headlessui/react";

import {
  BuildingOfficeIcon,
  MinusIcon as MinusIconSolid,
} from "@heroicons/react/20/solid";

import withGlobalProviders from "../../../../general/withGlobalProvider";
import includes from "lodash/includes";

function SelectedListItem({
  id,
  userSavedOrganizations,
  updateSelectedOrganizations,
}) {
  const item = useSelector(
    (state) => state.organizations.items[id],
    shallowEqual
  );

  const [anchorEl, setAnchorEl] = useState(null);

  if (!item) return null;

  const userSaved = includes(userSavedOrganizations, id);

  const handlePopoverOpen = (event) => {
    if (userSaved) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Transition
      appear={true}
      enter="transition-opacity duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      show={true}
    >
      <li key={item.id}>
        <a href="#" className="block hover:bg-gray-50">
          <div className="px-4 py-4 sm:px-6">
            <div className="flex items-center">
              <p className="text-md font-medium text-deep-sea-600 truncate">
                {item.attributes.name}
              </p>
              <div className="ml-2 flex-shrink-0 flex">
                <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </p>
              </div>
            </div>
            <div className="mt-2 sm:flex text-sm sm:justify-between">
              <div className="sm:flex">
                <BuildingOfficeIcon
                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <p>
                  {item.relationships.organizationBranches.data.length}{" "}
                  {item.relationships.organizationBranches.data.length == 1
                    ? "Branch"
                    : "Branches"}
                </p>
                {/* <p className="flex items-center text-sm text-gray-500">
                  <ArrowSmDownIcon
                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  $
                  {(
                    parseInt(item.attributes.minimumLoanAmountCents) / 100
                  ).toLocaleString()}
                </p>
                <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                  <ArrowSmUpIcon
                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  $
                  {(
                    parseInt(item.attributes.maximumLoanAmountCents) / 100
                  ).toLocaleString()}
                </p> */}
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                {/* <BuildingOfficeIcon
                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <p>
                  {item.relationships.organizationBranches.data.length}{" "}
                  {item.relationships.organizationBranches.data.length == 1
                    ? "Branch"
                    : "Branches"}
                </p> */}
                <button
                  aria-owns={open ? "mouse-over-popover" : undefined}
                  aria-haspopup="true"
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                  type="button"
                  className={
                    userSaved
                      ? "ml-3 inline-flex items-center p-1 border border-gray-700 rounded-full shadow-sm text-gray bg-white bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      : "ml-3 inline-flex items-center p-1 border border-red-700 rounded-full shadow-sm text-red bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer"
                  }
                  style={{ marginTop: -25 }}
                  onClick={
                    userSaved
                      ? (e) => {
                          e.stopPropagation();
                        }
                      : () => updateSelectedOrganizations(id, true)
                  }
                >
                  <MinusIconSolid
                    className={
                      userSaved
                        ? "h-5 w-5 text-gray-700"
                        : "h-5 w-5 text-red-700"
                    }
                    aria-hidden="true"
                  />
                </button>
                <Popover
                  id="mouse-over-popover"
                  open={open}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  onClose={handlePopoverClose}
                  disableRestoreFocus
                  useLayerForClickAway={false}
                  style={{ pointerEvents: "none" }}
                >
                  <div className="items-center text-sm text-gray-500 p-2">
                    This lender must be removed from the My Lenders page.
                  </div>
                </Popover>
              </div>
            </div>
          </div>
        </a>
      </li>
    </Transition>
  );
}

export default withGlobalProviders(SelectedListItem);
