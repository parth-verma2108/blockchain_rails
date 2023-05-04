import React, { Fragment, useState } from "react";
import { Switch } from "@headlessui/react";
import { KeyIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import PageBody from "../PageBody";
import ProfileTab from "./edit/ProfileTab";
import PasswordTab from "./edit/PasswordTab";

const user = {
  name: "Debbie Lewis",
  handle: "deblewis",
  email: "debbielewis@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=320&h=320&q=80",
};

const subNavigation = [
  { name: "Profile", icon: UserCircleIcon, current: true },
  // { name: "Account", href: "#", icon: CogIcon, current: false },
  { name: "Password", icon: KeyIcon, current: false },
  // { name: "Notifications", href: "#", icon: BellIcon, current: false },
  // { name: "Billing", href: "#", icon: CreditCardIcon, current: false },
  // { name: "Integrations", href: "#", icon: ViewGridAddIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [selectedSection, setSelectedSection] = useState("Profile");

  return (
    <PageBody>
      <div className="py-10 bg-gray-100 flagged">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              Profile Settings
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-10">
            <div className="bg-white rounded-lg shadow overflow-visible">
              <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
                <aside className="py-6 lg:col-span-3">
                  <nav className="space-y-1">
                    {subNavigation.map((item) => (
                      <span
                        key={item.name}
                        onClick={() => setSelectedSection(item.name)}
                        className={classNames(
                          selectedSection === item.name
                            ? "bg-teal-50 border-teal-500 text-teal-700 hover:bg-teal-50 hover:text-teal-700"
                            : "border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                          "group border-l-4 px-3 py-2 flex items-center text-sm font-medium cursor-pointer"
                        )}
                        aria-current={
                          selectedSection === item.name ? "page" : undefined
                        }
                      >
                        <item.icon
                          className={classNames(
                            selectedSection === item.name
                              ? "text-teal-500 group-hover:text-teal-500"
                              : "text-gray-400 group-hover:text-gray-500",
                            "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        <span className="truncate">{item.name}</span>
                      </span>
                    ))}
                  </nav>
                </aside>
                {selectedSection === "Profile" && <ProfileTab />}
                {selectedSection === "Password" && <PasswordTab />}
              </div>
            </div>
          </div>
        </main>
      </div>
    </PageBody>
  );
}
