import React from "react";
import withGlobalProviders from "../../../general/withGlobalProvider";
import PageBody from "../../general/PageBody";
import LendingParameterForm from "./forms/LendingParameterForm";
import map from "lodash/map";

function toSelectOption(item) {
  if (!item) return null;
  return { value: item, label: item };
}

function toSelectOptions(items) {
  return map(items, toSelectOption);
}

function Index({ lendingParameter }) {
  let providedValues;

  if (lendingParameter) {
    providedValues = lendingParameter.data.attributes
    providedValues.directLenderMortgageBroker = toSelectOption(providedValues.directLenderMortgageBroker);
    providedValues.propertyTypesFinanced = toSelectOptions(providedValues.propertyTypesFinanced);
    providedValues.recourse = toSelectOptions(providedValues.recourse);
    providedValues.retailWholesale = toSelectOptions(providedValues.retailWholesale);
    providedValues.typeOfFinancing = toSelectOptions(providedValues.typeOfFinancing);
    providedValues.typeOfInstitution = toSelectOptions(providedValues.typeOfInstitution);

    providedValues.lendingStates = toSelectOptions(providedValues.lendingStates)
  }

  return (
    <PageBody>
      <div className="py-10 bg-gray-100 flagged">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">
            <h1 className="text-3xl font-bold leading-tight text-gray-900 text-shadow-sm">
              {lendingParameter ? "Update Settings" : "Account Setup"}
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <main>
              {/* Page header */}
              <div className="mt-8">
                <LendingParameterForm {...{ providedValues }} />
              </div>
            </main>
          </div>
        </main>
      </div>
    </PageBody>
  );
}

export default withGlobalProviders(Index);
